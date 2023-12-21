import * as React from "react";
import {
    Combobox,
    useId,
    ComboboxProps,
    Option
} from "@fluentui/react-components";

import IBook from "../model/IBook";

export interface IBookComboBoxProps {
    books: IBook[];
    selectedBook: IBook;
    onBookSelect: (book?: IBook) => void;
};

export const BookComboBox = (props: IBookComboBoxProps) => {
    const comboId = useId("book-dropdown");

    const [selectedOptions, setSelectedOptions] = React.useState<string[]>([props.selectedBook.number.toString()]);
    const [value, setValue] = React.useState<string>(props.selectedBook.name);
    const [matchingOptions, setMatchingOptions] = React.useState([...props.books]);

    const onChange: ComboboxProps["onChange"] = (event) => {
        const value = event.target.value.trim();
        const matches = props.books.filter(
            (book) => book.name.toLowerCase().indexOf(value.toLowerCase()) === 0
        );
        setMatchingOptions(matches);
    };

    const onOptionSelect: ComboboxProps["onOptionSelect"] = (event, data) => {
        setValue(data.optionText || "");
        setSelectedOptions(data.selectedOptions);

        const selected = props.books.find(b => b.number === parseInt(data.optionValue ?? "-1", 10));
        props.onBookSelect(selected);
    };

    const onInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setValue(ev.target.value);
    };

    React.useEffect(() => {
        setValue(props.selectedBook.name);
        setSelectedOptions([props.selectedBook.number.toString()]);
    }, [props.selectedBook]);

    return (
        <Combobox
            aria-labelledby={comboId}
            placeholder="Select a book"
            onChange={onChange}
            onInput={onInput}
            value={value}
            selectedOptions={selectedOptions}
            onOptionSelect={onOptionSelect}
        >
            {matchingOptions.map((option) => (
                <Option key={option.number} value={option.number.toString()}>
                    {option.name}
                </Option>
            ))}
            {matchingOptions.length === 0 ? (
                <Option key="no-results" text="">
                    No results found
                </Option>
            ) : null}
        </Combobox>
    );
};