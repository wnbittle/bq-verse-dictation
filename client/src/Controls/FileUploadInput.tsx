import * as React from "react";
import {
    Button
} from "@fluentui/react-components";

export interface FileUploadProps {
    onFileUpload: (file: any) => void;
    icon?: React.ReactElement;
    children?: React.ReactElement | string;
}

export const FileUploadInput = (props: FileUploadProps) => {
    const inputRef = React.createRef<HTMLInputElement>();
    const [value, setValue] = React.useState<string>('');

    const onChange = (e: any) => {
        if (e.target.files && e.target.files.length > 0) {
            props.onFileUpload(e.target.files[0]);
        }

        // clear the value so we can re-select the same file and get onchange events
        setValue('');
    };

    const onClick = () => {
        inputRef.current?.click();
    };

    return (<>
        <input type='file' onChange={onChange} style={{ display: 'none' }} value={value} ref={inputRef} />
        <Button icon={props.icon} onClick={onClick}>{props.children}</Button>
    </>)
};