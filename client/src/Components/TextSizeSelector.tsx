import { Badge, Button, Input, Label, Tooltip, useId } from "@fluentui/react-components";
import * as React from "react";
import ISelectedVerse from "../model/ISelectedVerse";
import ISizing from "../model/ISizing";
import { ArrowLeftRegular, ArrowRightRegular, ResizeLargeFilled, ResizeSmallFilled } from "@fluentui/react-icons";
import ISettings from "../model/ISettings";

export interface ITextSizeSelectorProps {
    verses: ISelectedVerse[];
    defaultSizing: ISizing;
    settings: ISettings;
    onVerseSizeChange: (verse: ISelectedVerse) => void;
    onApplyToAll: (sizing: ISizing) => void;
}

export const TextSizeSelector = (props: ITextSizeSelectorProps) => {
    const inputId = useId("input");

    const initialIndex = props.verses.length > 0 ? 0 : -1;
    const initialVerse = props.verses.length > 0 ? props.verses[0] : null;

    const [currentIndex, setCurrentIndex] = React.useState<number>(initialIndex);
    const [currentVerse, setCurrentVerse] = React.useState<ISelectedVerse | null>(initialVerse);

    const [fontSize, setFontSize] = React.useState<string>(initialVerse?.sizing?.fontSize?.toString() ?? props.defaultSizing.fontSize.toString());
    const [lineHeight, setLineHeight] = React.useState<string>(initialVerse?.sizing?.lineHeight?.toString() ?? props.defaultSizing.lineHeight.toString());
    const [referenceSpacing, setReferenceSpacing] = React.useState<string>(initialVerse?.sizing?.referenceSpacing?.toString() ?? props.defaultSizing.referenceSpacing.toString());

    const yScale = 480.0 / props.settings.quality.height;
    const xScale = 640.0 / props.settings.quality.width;

    const onNextPrevVerseClick = (direction: 1 | -1) => {
        if (props.verses.length === 0) {
            return;
        }

        let next = currentIndex + direction;
        if (next < 0) {
            next = props.verses.length - 1;
        } else if (next >= props.verses.length) {
            next = 0;
        }

        let verse = props.verses[next];

        setCurrentIndex(next);
        setCurrentVerse(verse);
        setFontSize(verse.sizing?.fontSize?.toString() ?? props.defaultSizing.fontSize.toString());
        setLineHeight(verse.sizing?.lineHeight?.toString() ?? props.defaultSizing.lineHeight.toString());
        setReferenceSpacing(verse.sizing?.referenceSpacing?.toString() ?? props.defaultSizing.referenceSpacing.toString());
    };

    const onExtremeClick = (type: 'max' | 'min') => {
        let longestIndex: number = -1;
        let longestVerse: ISelectedVerse | null = null;

        props.verses?.forEach((v, i) => {
            if (longestVerse === null) {
                longestVerse = v;
                longestIndex = i;
            } else if (type === 'max' && longestVerse.verseText.length < v.verseText.length) {
                longestVerse = v;
                longestIndex = i;
            } else if (type === 'min' && longestVerse.verseText.length > v.verseText.length) {
                longestVerse = v;
                longestIndex = i;
            }
        });

        if (longestIndex >= 0) {
            setCurrentIndex(longestIndex);
            setCurrentVerse(longestVerse);
        }
    };

    const onVerseSizeChange = () => {
        const sizing: ISizing = {
            fontSize: parseInt(fontSize, 10),
            lineHeight: parseInt(lineHeight, 10),
            referenceSpacing: parseInt(referenceSpacing, 10)
        };
        props.onVerseSizeChange({
            ...currentVerse!,
            sizing: sizing
        });
    };

    const onResetToDefault = () => {
        const verse = {
            ...currentVerse!,
            sizing: {
                ...props.defaultSizing
            }
        };
        setFontSize(verse.sizing.fontSize.toString());
        setLineHeight(verse.sizing.lineHeight.toString());
        setReferenceSpacing(verse.sizing.referenceSpacing.toString());
        props.onVerseSizeChange(verse);
    };

    const onApplyToAll = () => {
        const sizing: ISizing = {
            fontSize: parseInt(fontSize, 10),
            lineHeight: parseInt(lineHeight, 10),
            referenceSpacing: parseInt(referenceSpacing, 10)
        };
        props.onApplyToAll(sizing);
    };

    const onVerseClick = (verse: ISelectedVerse, index: number) => {
        setCurrentIndex(index);
        setCurrentVerse(verse);
    };

    React.useEffect(() => {
        let index = -1;
        const selected = currentVerse;
        if (selected) {
            // try to find the last selected verse
            index = props.verses.findIndex(v => v.id === selected.id);
        }

        if (index < 0 && props.verses.length > 0) {
            // then set it to the first one
            index = 0;
        }

        setCurrentIndex(index);
        setCurrentVerse(index >= 0 ? props.verses[index] : null);
    }, [props.verses]);

    return (
        <div className="flex flex-row flex-gap-l">
            <div className="flex flex-column flex-gap-s">
                <div className="flex flex-column flex-gap-s" style={{ width: 854, height: 480 }}>
                    <div style={{
                        width: 854,
                        height: 480,
                        fontSize: `${fontSize}px`,
                        lineHeight: `${lineHeight}px`,
                        padding: `44px`,
                        backgroundColor: 'black',
                        color: 'white',
                        boxSizing: 'border-box',
                        fontFamily: 'sans-serif',
                        textAlign: 'center',
                        overflow: 'hidden'

                    }}>
                        <div style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column'
                        }}>
                            <div style={{
                                paddingBottom: `${referenceSpacing}px`
                            }}>
                                {currentVerse?.verseText}
                            </div>
                            <div>{currentVerse?.bookName} {currentVerse?.chapterNumber}:{currentVerse?.verseNumber}</div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row flex-gap-s" style={{ alignItems: 'center' }}>
                    <div className="flex flex-row flex-gap-s">
                        <Button onClick={() => onNextPrevVerseClick(-1)} disabled={props.verses.length === 0} icon={<ArrowLeftRegular />} appearance="subtle">Prev</Button>
                    </div>
                    <div className="flex flex-row flex-gap-s flex-row-align-right">
                        <Button onClick={() => onNextPrevVerseClick(1)} disabled={props.verses.length === 0} icon={<ArrowRightRegular />} appearance="subtle" iconPosition="after">Next</Button>
                        <Tooltip
                            withArrow
                            content="View the shortest verse"
                            relationship="label">
                            <Button onClick={() => onExtremeClick('min')} disabled={props.verses.length === 0} icon={<ResizeSmallFilled />} appearance="subtle"></Button>
                        </Tooltip>
                        <Tooltip
                            withArrow
                            content="View the longest verse"
                            relationship="label">
                            <Button onClick={() => onExtremeClick('max')} disabled={props.verses.length === 0} icon={<ResizeLargeFilled />} appearance="subtle"></Button>
                        </Tooltip>
                    </div>
                </div>
            </div>
            <div className="flex flex-column flex-gap-l" style={{ width: 250 }}>
                <div className="flex flex-column flex-gap-s">
                    <Label htmlFor={`${inputId}-fontSize`} size="small">
                        Font Size
                    </Label>
                    <Input id={`${inputId}-fontSize`} value={fontSize} onChange={(e, data) => {
                        setFontSize(data.value);
                    }} />
                </div>
                <div className="flex flex-column flex-gap-s">
                    <Label htmlFor={`${inputId}-lineHeight`} size="small">
                        Line Height
                    </Label>
                    <Input id={`${inputId}-lineHeight`} value={lineHeight} onChange={(e, data) => {
                        setLineHeight(data.value);
                    }} />
                </div>
                <div className="flex flex-column flex-gap-s">
                    <Label htmlFor={`${inputId}-referenceSpacing`} size="small">
                        Reference Spacing
                    </Label>
                    <Input id={`${inputId}-referenceSpacing`} value={referenceSpacing} onChange={(e, data) => {
                        setReferenceSpacing(data.value);
                    }} />
                </div>
                <div className="flex flex-row flex-gap-m" style={{ justifyContent: 'center' }}>
                    <div>
                        C:&nbsp;
                        <Tooltip
                            withArrow
                            content="Number of characters"
                            relationship="label">
                            <Badge appearance="filled" color="informative" shape='rounded'>{currentVerse?.verseText?.length ?? 0}</Badge>
                        </Tooltip>
                        &nbsp;W:&nbsp;
                        <Tooltip
                            withArrow
                            content="Number of words"
                            relationship="label">
                            <Badge appearance="filled" color="informative" shape='rounded'>{currentVerse?.verseText?.split(/\s+/gi)?.length ?? 0}</Badge>
                        </Tooltip>
                    </div>
                </div>
                <div className="flex flex-column flex-gap-s" style={{ justifyContent: 'right' }}>
                    <Button onClick={onVerseSizeChange} disabled={props.verses.length === 0} appearance="primary">Apply</Button>
                    <Button onClick={onApplyToAll} disabled={props.verses.length === 0}>Apply to All</Button>
                    <Button onClick={onResetToDefault} disabled={props.verses.length === 0}>Reset to Defaults</Button>
                </div>
            </div>
        </div>
    );
};