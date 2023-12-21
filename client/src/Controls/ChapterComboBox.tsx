import * as React from "react";
import {
    Combobox,
    useId,
    ComboboxProps,
    Option
} from "@fluentui/react-components";

import IChapter from "../model/IChapter";

export interface IChapterComboBoxProps {
    chapters: IChapter[];
    selectedChapter: IChapter;
    onChapterSelect: (chapter?: IChapter) => void;
};

export const ChapterComboBox = (props: IChapterComboBoxProps) => {
    const comboId = useId("chapter-dropdown");

    const [selectedOptions, setSelectedOptions] = React.useState<string[]>([props.selectedChapter.number.toString()]);
    const [value, setValue] = React.useState<string>(props.selectedChapter.number.toString());

    const onOptionSelect: ComboboxProps["onOptionSelect"] = (event, data) => {
        setValue(data.optionText ?? "");
        setSelectedOptions(data.selectedOptions);

        const selected = props.chapters.find(c => c.number === parseInt(data.optionValue ?? "-1", 10));
        props.onChapterSelect(selected);
    };

    React.useEffect(() => {
        setValue(props.selectedChapter.number.toString());
        setSelectedOptions([props.selectedChapter.number.toString()]);
    }, [props.selectedChapter]);

    return (
        <Combobox
            aria-labelledby={comboId}
            placeholder="Select a chapter"
            onOptionSelect={onOptionSelect}
            value={value}
            selectedOptions={selectedOptions}
        >
            {props.chapters.map((option) => (
                <Option key={option.number} value={option.number.toString()}>
                    {option.number.toString()}
                </Option>
            ))}
            {props.chapters.length === 0 ? (
                <Option key="no-results" text="">
                    No results found
                </Option>
            ) : null}
        </Combobox>
    );
};