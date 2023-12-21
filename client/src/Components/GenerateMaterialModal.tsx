import * as React from "react";
import {
    Dialog,
    DialogTrigger,
    DialogSurface,
    DialogTitle,
    DialogContent,
    DialogBody,
    DialogActions,
    Button,
    ProgressBar,
    PresenceBadge,
    Spinner,
    Badge
} from "@fluentui/react-components";

import ISelectedVerse from "../model/ISelectedVerse";
import ISettings from "../model/ISettings";
import IGenerateRequest from "../model/IGenerateRequest";

export interface ISelectedVerseResult {
    status: 'pending' | 'inprogress' | 'success' | 'failure';
    percentComplete: number;
    verse: ISelectedVerse;
    message?: string;
}

export interface IGenerateMaterialModalProps {
    verses: ISelectedVerse[];
    settings: ISettings;
    children: React.ReactElement;
    onGenerateComplete: (verses: ISelectedVerseResult[]) => void;
}

const convertToStatus = (verse: ISelectedVerse): ISelectedVerseResult => {
    return {
        percentComplete: 0,
        status: 'pending',
        verse: verse
    };
};

export const GenerateMaterialModal = (props: IGenerateMaterialModalProps) => {
    const [open, setOpen] = React.useState(false);
    const [isGenerating, setIsGenerating] = React.useState(false);
    const [percentComplete, setPercentComplete] = React.useState(0.0);

    const [status, setStatus] = React.useState<ISelectedVerseResult[]>(props.verses.map(convertToStatus));

    React.useEffect(() => {
        setStatus(props.verses.map(convertToStatus));
    }, [props.verses]);

    const onGenerateClick = async () => {
        setIsGenerating(true);

        // make a copy of the verse array since this could take a long time
        const verses: ISelectedVerse[] = [...props.verses];
        const batchSize: number = 2;

        for (let i = 0; i < verses.length; i+=batchSize) {
            const promises = [];
            for (let j = 0; j < batchSize; j++) {
                const index = i + j;
                if (index < verses.length) {
                    const v: ISelectedVerse = verses[index];

                    let newStatus = [...status];
                    newStatus[index].percentComplete = 0.0;
                    newStatus[index].status = 'inprogress';
                    setStatus(newStatus);
        
                    promises.push(generateVideo(props.settings, v).then((result) => {
                        let newStatus = [...status];
                        newStatus[index].percentComplete = result.percentComplete;
                        newStatus[index].status = result.status;
                        newStatus[index].message = result.message;
                        setStatus(newStatus);

                        const complete = newStatus.filter(s => s.status === 'failure' || s.status === 'success').length;
                        setPercentComplete((complete * 100.0) / verses.length);
                    }));
                }
            }

            console.log(`Waiting for batch to complete`);
            await Promise.all(promises);

            setPercentComplete(((i + batchSize) * 100.0) / verses.length);
        }

        setIsGenerating(false);
        setPercentComplete(100.0);
        props.onGenerateComplete(status);
    };

    const onCloseClick = () => {
        setIsGenerating(false);
        setPercentComplete(0.0);
        setStatus(props.verses.map(convertToStatus));
    };

    return (
        <Dialog modalType="alert" open={open} onOpenChange={(event, data) => setOpen(data.open)}>
            {props.children}
            <DialogSurface>
                <DialogBody>
                    <DialogTitle>Generate Material <Badge appearance="filled" color="informative" shape='rounded'>{percentComplete.toFixed(0)}%</Badge></DialogTitle>
                    <DialogContent>
                        <p>Are you sure you are ready to generate the material? This can be long process so make sure you are ready.</p>
                        <div className="flex flex-column flex-gap-s">
                            {status.map(v => (
                                <div key={v.verse.id} className="flex flex-row flex-gap-m" style={{ alignItems: 'center' }}>
                                    <div style={{ width: 125, overflow: 'hidden', textOverflow: 'ellipsis' }}>{v.verse.bookName}&nbsp;{v.verse.chapterNumber}:{v.verse.verseNumber}</div>
                                    <ProgressBar style={{ width: 400 }} value={v.percentComplete} />
                                    <div style={{ width: 20 }}>
                                        {v.status === "inprogress" && <Spinner size="extra-tiny" />}
                                        {v.status === "pending" && <PresenceBadge status="away" />}
                                        {v.status === "success" && <PresenceBadge status="available" />}
                                        {v.status === "failure" && <PresenceBadge status="do-not-disturb" title={v.message} />}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p>&nbsp;</p>
                    </DialogContent>
                    <DialogActions>
                        <DialogTrigger disableButtonEnhancement>
                            <Button appearance="secondary" disabled={isGenerating}>Cancel</Button>
                        </DialogTrigger>
                        {percentComplete < 100.0 && <Button appearance="primary" disabled={isGenerating} onClick={onGenerateClick}>Generate</Button>}
                        {!isGenerating && percentComplete >= 100.0 && <DialogTrigger disableButtonEnhancement>
                            <Button appearance="primary" onClick={onCloseClick}>Close</Button>
                        </DialogTrigger>}
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    );
};

const generateVideo = async (settings: ISettings, v: ISelectedVerse): Promise<ISelectedVerseResult> => {
    console.log(`Processing: ${v.id}`);

    const payload: IGenerateRequest = {
        settings: settings,
        verse: v
    };

    try {
        // generate the audio
        console.log(`Generating Audio: ${v.id}`);
        const audioResponse = await fetch('http://localhost:3001/api/GenerateAudio', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!audioResponse.ok) {
            console.error(`Failed to generate video: ${audioResponse.status}: ${audioResponse.statusText}`);
            return {
                percentComplete: 0.0,
                status: 'failure',
                message: `Failed to generate audio: ${audioResponse.status}: ${audioResponse.statusText}`,
                verse: v
            };
        }

        const synthesizedVerse = await audioResponse.json();

        // generate the video
        console.log(`Generating Video: ${v.id}`);
        const videoResponse = await fetch('http://localhost:3001/api/GenerateVideo', {
        // const videoResponse = await fetch('http://localhost:3001/api/Test', {
            method: 'POST',
            body: JSON.stringify(synthesizedVerse),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!videoResponse.ok) {
            console.error(`Failed to generate video: ${audioResponse.status}: ${audioResponse.statusText}`);
            return {
                percentComplete: 0.0,
                status: 'failure',
                message: `Failed to generate video: ${audioResponse.status}: ${audioResponse.statusText}`,
                verse: v
            };
        }

        console.log(`Complete: ${v.id}`);
        return {
            percentComplete: 1.0,
            status: 'success',
            verse: v
        };

    } catch (err) {
        console.error(err);
        return {
            percentComplete: 0.0,
            status: 'failure',
            message: `Failed to generate video: ${err}`,
            verse: v
        };
    }
};