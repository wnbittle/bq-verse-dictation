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
    Label,
    useId,
    Input,
    Link,
    Combobox,
    Option,
    Divider,
    makeStyles
} from "@fluentui/react-components";

import Qualities from "../model/Qualities";
import ISettings from "../model/ISettings";
import IQuality from "../model/IQuality";
import { VoiceSelector } from "./VoiceSelector";
import IVoice from "../model/IVoice";
import { ArrowRepeatAllRegular, PersonVoiceRegular, VideoClipRegular } from "@fluentui/react-icons";

const useStyles = makeStyles({
  customSurface: {
    width: "900px",       // Sets your desired custom width
    maxWidth: "95%",    // Prevents overflow on smaller viewport screens
  },
});

export interface ISettingsModalProps {
    settings: ISettings;
    children: React.ReactElement;
    onSettingsChanged: (settings: ISettings) => void;
}

export const SettingsModal = (props: ISettingsModalProps) => {
    const inputId = useId("input");
    const styles = useStyles();

    const [open, setOpen] = React.useState(false);

    const [name, setName] = React.useState<string>(props.settings.name);
    const [voice, setVoice] = React.useState<IVoice>(props.settings.voice);
    const [chunkRepeatCount, setChunkRepeatCount] = React.useState<string>(props.settings.chunkRepeatCount?.toString());
    const [chunkWithReferenceRepeatCount, setChunkWithReferenceRepeatCount] = React.useState<string>(props.settings.chunkWithReferenceRepeatCount?.toString());
    const [videoFPS, setVideoFPS] = React.useState<string>(props.settings.videoFPS?.toString());
    const [quality, setQuality] = React.useState<IQuality>(props.settings.quality);
    const [selectedQualities, setSelectedQualities] = React.useState<string[]>([props.settings.quality.name]);

    React.useEffect(() => {
        setName(props.settings.name);
        setVoice(props.settings.voice);
        setChunkRepeatCount(props.settings.chunkRepeatCount?.toString());
        setChunkWithReferenceRepeatCount(props.settings.chunkWithReferenceRepeatCount?.toString());
        setVideoFPS(props.settings.videoFPS?.toString());
        setQuality(props.settings.quality);
        setSelectedQualities([props.settings.quality.name]);
    }, [props.settings]);

    const onSettingsChanged = () => {
        const fps = parseInt(videoFPS, 10);

        props.onSettingsChanged({
            name: name,
            voice: voice,
            chunkRepeatCount: parseInt(chunkRepeatCount, 10),
            chunkWithReferenceRepeatCount: parseInt(chunkWithReferenceRepeatCount, 10),
            videoFPS: fps,
            quality: quality,
            colors: props.settings.colors
        });
    };

    const onVoiceSelectionChanged = (voice: IVoice) => {
        setVoice(voice);
        const fps = parseInt(videoFPS, 10);

        props.onSettingsChanged({
            name: name,
            voice: voice,
            chunkRepeatCount: parseInt(chunkRepeatCount, 10),
            chunkWithReferenceRepeatCount: parseInt(chunkWithReferenceRepeatCount, 10),
            videoFPS: fps,
            quality: quality,
            colors: props.settings.colors
        });
    };

    return (
        <Dialog modalType="alert" open={open} onOpenChange={(event, data) => setOpen(data.open)}>
            {props.children}
            <DialogSurface className={styles.customSurface}>
                <DialogBody>
                    <DialogTitle>Settings</DialogTitle>
                    <DialogContent>
                        <p>Set the current settings for the material.  See here for voice setting options: <Link href="https://speech.microsoft.com/portal/8a433965d84745b8aba1c7cad835c29c/voicegallery">Voice Gallery</Link></p>
                        <div className="flex flex-row flex-gap-xl">
                            <div className="flex flex-column flex-gap-m flex-1">
                                <Divider className="flex-grow-0">General</Divider>
                                <div className="flex flex-column flex-gap-s">
                                    <Label htmlFor={`${inputId}-name`} size="small">
                                        Material Name
                                    </Label>
                                    <Input id={`${inputId}-name`} value={name} onChange={(e, data) => {
                                        setName(data.value);
                                    }} onBlur={onSettingsChanged} />
                                </div>
                                <Divider className="flex-grow-0 pt-m"><ArrowRepeatAllRegular /> Repeat Settings</Divider>
                                <div className="flex flex-column flex-gap-s">
                                    <Label htmlFor={`${inputId}-rptc`} size="small">
                                        Chunk Repeat Count
                                    </Label>
                                    <Input id={`${inputId}-rptc`} value={chunkRepeatCount} onChange={(e, data) => {
                                        setChunkRepeatCount(data.value);
                                    }} onBlur={onSettingsChanged} />
                                </div>
                                <div className="flex flex-column flex-gap-s">
                                    <Label htmlFor={`${inputId}-rptc-ref`} size="small">
                                        Chunk Repeat Count (with Reference)
                                    </Label>
                                    <Input id={`${inputId}-rptc-ref`} value={chunkWithReferenceRepeatCount} onChange={(e, data) => {
                                        setChunkWithReferenceRepeatCount(data.value);
                                    }} onBlur={onSettingsChanged} />
                                </div>
                                <Divider className="flex-grow-0 pt-m"><VideoClipRegular /> Video Settings</Divider>
                                <div className="flex flex-column flex-gap-s">
                                    <Label htmlFor={`${inputId}-fps`} size="small">
                                        Video Frames / Second
                                    </Label>
                                    <Input id={`${inputId}-fps`} value={videoFPS} onChange={(e, data) => {
                                        setVideoFPS(data.value);
                                    }} onBlur={onSettingsChanged} />
                                </div>
                                <div className="flex flex-column flex-gap-s">
                                    <Label htmlFor={`${inputId}-quality`} size="small">
                                        Quality
                                    </Label>
                                    <Combobox
                                        id={`${inputId}-quality`}
                                        placeholder="Select a chapter"
                                        onOptionSelect={(e, d) => { setQuality(Qualities.find(q => q.name === d.optionValue)!); }}
                                        value={quality.name}
                                        selectedOptions={selectedQualities}>
                                        {Qualities.map((option) => (
                                            <Option key={option.name} value={option.name}>
                                                {option.name}
                                            </Option>
                                        ))}
                                    </Combobox>
                                </div>
                            </div>
                            <div className="flex flex-column flex-gap-m flex-1">
                                <Divider className="flex-grow-0"><PersonVoiceRegular /> Default Voice Settings</Divider>
                                <VoiceSelector 
                                    voice={props.settings.voice} 
                                    onVoiceSelectionChanged={onVoiceSelectionChanged} 
                                />
                            </div>
                        </div>
                        <p>&nbsp;</p>
                    </DialogContent>
                    <DialogActions>
                        <DialogTrigger disableButtonEnhancement>
                            <Button appearance="secondary">Cancel</Button>
                        </DialogTrigger>
                        <DialogTrigger disableButtonEnhancement>
                            <Button appearance="primary" onClick={onSettingsChanged}>Save</Button>
                        </DialogTrigger>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    );
};