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
    Option
} from "@fluentui/react-components";

import Qualities from "../model/Qualities";
import ISettings from "../model/ISettings";
import IQuality from "../model/IQuality";

export interface ISettingsModalProps {
    settings: ISettings;
    children: React.ReactElement;
    onSettingsChanged: (settings: ISettings) => void;
}

export const SettingsModal = (props: ISettingsModalProps) => {
    const inputId = useId("input");

    const [open, setOpen] = React.useState(false);

    const [name, setName] = React.useState<string>(props.settings.name);
    const [speechVoice, setSpeechVoice] = React.useState<string>(props.settings.speechVoice);
    const [speechStyle, setSpeechStyle] = React.useState<string>(props.settings.speechStyle);
    const [speechRate, setSpeechRate] = React.useState<string>(props.settings.speechRate);
    const [videoFPS, setVideoFPS] = React.useState<string>(props.settings.videoFPS?.toString());
    const [quality, setQuality] = React.useState<IQuality>(props.settings.quality);
    const [selectedQualities, setSelectedQualities] = React.useState<string[]>([props.settings.quality.name]);

    React.useEffect(() => {
        setName(props.settings.name);
        setSpeechVoice(props.settings.speechVoice);
        setSpeechStyle(props.settings.speechStyle);
        setSpeechRate(props.settings.speechRate);
        setVideoFPS(props.settings.videoFPS?.toString());
        setQuality(props.settings.quality);
        setSelectedQualities([props.settings.quality.name])
    }, [props.settings]);

    const onSettingsChanged = () => {
        const fps = parseInt(videoFPS, 10);

        props.onSettingsChanged({
            name: name,
            speechVoice: speechVoice,
            speechStyle: speechStyle,
            speechRate: speechRate,
            videoFPS: fps,
            quality: quality,
            colors: props.settings.colors
        });
    };

    return (
        <Dialog modalType="alert" open={open} onOpenChange={(event, data) => setOpen(data.open)}>
            {props.children}
            <DialogSurface>
                <DialogBody>
                    <DialogTitle>Settings</DialogTitle>
                    <DialogContent>
                        <p>Set the current settings for the material.  See here for voice setting options: <Link href="https://speech.microsoft.com/portal/8a433965d84745b8aba1c7cad835c29c/voicegallery">Voice Gallery</Link></p>
                        <div className="flex flex-column flex-gap-l">
                            <div className="flex flex-column flex-gap-s">
                                <Label htmlFor={`${inputId}-name`} size="small">
                                    Name
                                </Label>
                                <Input id={`${inputId}-name`} value={name} onChange={(e, data) => {
                                    setName(data.value);
                                }} onBlur={onSettingsChanged} />
                            </div>
                            <div className="flex flex-column flex-gap-s">
                                <Label htmlFor={`${inputId}-speechvoice`} size="small">
                                    Speech Voice
                                </Label>
                                <Input id={`${inputId}-speechvoice`} value={speechVoice} onChange={(e, data) => {
                                    setSpeechVoice(data.value);
                                }} onBlur={onSettingsChanged} />
                            </div>
                            <div className="flex flex-column flex-gap-s">
                                <Label htmlFor={`${inputId}-speechstyle`} size="small">
                                    Speech Style
                                </Label>
                                <Input id={`${inputId}-speechstyle`} value={speechStyle} onChange={(e, data) => {
                                    setSpeechStyle(data.value);
                                }} onBlur={onSettingsChanged} />
                            </div>
                            <div className="flex flex-column flex-gap-s">
                                <Label htmlFor={`${inputId}-speechrate`} size="small">
                                    Speech Rate
                                </Label>
                                <Input id={`${inputId}-speechrate`} value={speechRate} onChange={(e, data) => {
                                    setSpeechRate(data.value);
                                }} onBlur={onSettingsChanged} />
                            </div>
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