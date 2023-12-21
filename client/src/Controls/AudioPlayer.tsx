import * as React from 'react';
import ISelectedVerse from '../model/ISelectedVerse';
import { Button, Spinner, Tooltip } from '@fluentui/react-components';
import { PauseCircleRegular, PauseFilled, PlayCircleFilled, PlayCircleHintRegular, PlayCircleRegular, StopRegular } from '@fluentui/react-icons';
import ISettings from '../model/ISettings';
import IGenerateRequest from '../model/IGenerateRequest';

export interface IAudioPlayerProps {
    settings: ISettings;
    verse: ISelectedVerse;
}

export const AudioPlayer = (props: IAudioPlayerProps) => {
    const audioElement = React.createRef<HTMLAudioElement>();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [fileName, setFileName] = React.useState<string | null>(null);
    const [playing, setPlaying] = React.useState<boolean>(false);

    React.useEffect(() => {
        setFileName(null);
        setPlaying(false);
    }, [props.verse, props.settings]);

    const onPreviewClick = async () => {
        setLoading(true);

        const payload: IGenerateRequest = {
            settings: props.settings,
            verse: props.verse
        };

        try {
            // call server to generate temp file for playback
            const audioResponse = await fetch('http://localhost:3001/api/PrepareAudioPreview', {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!audioResponse.ok) {
                // throw error
            }

            const data = await audioResponse.json();
            setPlaying(true);
            setFileName(data.src);
        } catch (err) {
            console.error(err);
        }

        setLoading(false);
    };

    const onPlayClick = () => {
        setPlaying(true);
        audioElement.current?.play();
    };

    const onPauseClick = () => {
        setPlaying(false);
        audioElement.current?.pause();
    };

    const onCanPlay = () => {
        if (playing) {
            audioElement.current?.play();
        }
    };

    const onPlaybackEnded = () => {
        setPlaying(false);
    };

    const onStopClick = () => {
        setPlaying(false);
        audioElement.current?.pause();
        audioElement.current!.currentTime = 0;
    };

    return (<>
        {!fileName && !loading && <Tooltip
            withArrow
            content="Preview"
            relationship="label">
            <Button icon={<PlayCircleHintRegular />} onClick={onPreviewClick} appearance='subtle'></Button>
        </Tooltip>}
        {loading && <Spinner size="extra-tiny" />}
        {fileName && <div className='flex-row'>
            <audio
                ref={audioElement}
                src={`http://localhost:3001/api/PreviewAudio?fileName=${fileName}`}
                onEnded={onPlaybackEnded}
                onCanPlay={onCanPlay}
                className='hidden'>
            </audio>
            {!playing && <Tooltip
                withArrow
                content="Play"
                relationship="label">
                <Button icon={<PlayCircleRegular primaryFill='#0e700e' />} onClick={onPlayClick} appearance='subtle'></Button>
            </Tooltip>}
            {playing && <Tooltip
                withArrow
                content="Stop"
                relationship="label">
                <Button icon={<StopRegular primaryFill='#c50f1f' />} onClick={onStopClick} appearance='subtle'></Button>
            </Tooltip>}
            {playing && <Tooltip
                withArrow
                content="Pause"
                relationship="label">
                <Button icon={<PauseCircleRegular />} onClick={onPauseClick} appearance='subtle'></Button>
            </Tooltip>}
        </div>}
    </>);
}