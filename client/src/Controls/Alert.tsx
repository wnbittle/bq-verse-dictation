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
    Divider
} from "@fluentui/react-components";

export interface IAlertProps {
    title: string;
    content: React.ReactElement | string;
    onContinue: () => void;
    onCancel: () => void;
    children: React.ReactElement;
    maxWidth?: number; 
    continueLabel?: string;
    cancelLabel?: string;
}

export const Alert = (props: IAlertProps) => {
    return (
        <Dialog modalType="alert">
            {props.children}
            <DialogSurface style={{ maxWidth: props.maxWidth ?? 600 }}>
                <DialogBody>
                    <DialogTitle>{props.title}</DialogTitle>
                    <DialogContent>
                        {props.content}
                    </DialogContent>
                    <DialogActions>
                        <DialogTrigger disableButtonEnhancement>
                            <Button appearance="secondary" onClick={props.onCancel}>{props.cancelLabel ?? "Cancel"}</Button>
                        </DialogTrigger>
                        <DialogTrigger disableButtonEnhancement>
                            <Button appearance="primary" onClick={props.onContinue}>{props.continueLabel ?? "Continue"}</Button>
                        </DialogTrigger>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    );
};