import * as React from "react";
import { Card, CardHeader, Button, Badge, Subtitle2Stronger, Link, Tooltip, Dialog, DialogTrigger, DialogSurface, DialogBody, DialogTitle, DialogContent, DialogActions, Field, Input, InputOnChangeData } from "@fluentui/react-components";
import { CopyRegular, DeleteRegular } from "@fluentui/react-icons";

import ISelectedVerse from "../model/ISelectedVerse";
import { AudioPlayer } from "../Controls/AudioPlayer";
import ISettings from "../model/ISettings";
import IAlias from "../model/IAlias";

export interface ISelectedVerseCardProps {
    settings: ISettings;
    verse: ISelectedVerse;
    onVerseHeaderClick: (verse: ISelectedVerse) => void;
    onVerseDeselectClick: (verse: ISelectedVerse) => void;
    onVerseBreakChange: (verse: ISelectedVerse) => void;
    onVerseAliasChange: (verse: ISelectedVerse) => void;
}

interface IToken {
    id: number;
    text: string;
    start: number;
    end: number;

    isBreak: boolean;
    alias: string | null;
}

// TODO: Allow setting the study #

export const SelectedVerseCard = (props: ISelectedVerseCardProps) => {
    const tokens: IToken[] = [];
    const items = props.verse.verseText.split(/(\s+)/gi);

    const [selectedToken, setSelectedToken] = React.useState<IAlias>();
    const [aliasModalOpen, setAliasModelOpen] = React.useState<boolean>(false);

    let position = 0;
    items.forEach((t, i) => {
        const start = position;
        const end = position + t.length;
        if (t?.trim()) {
            const breakIdx = (props.verse.breaks ?? []).findIndex(b => b.id === i);
            const aliasIdx = (props.verse.aliases ?? []).findIndex(a => a.id === i);
            tokens.push({
                id: i,
                text: t,
                start: start,
                end: end,
                isBreak: breakIdx >= 0,
                alias: aliasIdx >= 0 ? props.verse.aliases[aliasIdx].replacement : null
            });
        }
        position = end;
    });

    const onTokenClick = (e: React.MouseEvent, token: IToken) => {
        if (e.ctrlKey) {
            // then prompt for alias
            setSelectedToken({
                id: token.id,
                location: token.start,
                original: token.text,
                replacement: token.alias || token.text
            });
            setAliasModelOpen(true);
        } else {
            // then add breakpoint
            const breaks = [...props.verse.breaks];
            const idx = breaks.findIndex(b => b.id === token.id);
            if (idx >= 0) {
                breaks.splice(idx, 1);
            } else {
                breaks.push({
                    id: token.id,
                    text: token.text,
                    textStart: token.start,
                    textEnd: token.end,
                    textLength: token.text.length,
                    textPosition: token.end
                });
            }
            breaks.sort((a, b) => a.id - b.id);
            props.onVerseBreakChange({
                ...props.verse,
                breaks: breaks
            });
        }
    };

    const onCopyText = async () => {
        await navigator.clipboard.writeText(props.verse.verseText);
    };

    const onAliasChange = (e: React.ChangeEvent, data: InputOnChangeData) => {
        const token = selectedToken;
        setSelectedToken({
            ...token!,
            replacement: data.value?.trim()
        });
    };

    const onAliasApply = () => {
        const alias = selectedToken!;
        const aliases = [...props.verse.aliases];
        const idx = aliases.findIndex(a => a.id === alias.id);

        if (alias.original === alias.replacement) {
            // then remove the alias
            if (idx >= 0) {
                aliases.splice(idx, 1);
            }
        } else {
            // then add/update the alias
            if (idx >= 0) {
                aliases[idx] = alias;
            } else {
                aliases.push({ ...alias });
            }
        }

        aliases.sort((a, b) => a.id - b.id);
        props.onVerseBreakChange({
            ...props.verse,
            aliases: aliases
        });

        setAliasModelOpen(false);
    };

    const onAliasCancel = () => {
        setAliasModelOpen(false);
    };

    return (
        <Card>
            <CardHeader
                header={
                    <Link onClick={() => props.onVerseHeaderClick(props.verse)}>
                        <Subtitle2Stronger>
                            {props.verse.bookName} {props.verse.chapterNumber}:{props.verse.verseNumber}
                        </Subtitle2Stronger>
                    </Link>}
                action={
                    <div className="flex-row">
                        <AudioPlayer settings={props.settings} verse={props.verse} />
                        <Tooltip
                            withArrow
                            content="Copy verse text"
                            relationship="label">
                            <Button
                                appearance="subtle"
                                icon={<CopyRegular />}
                                aria-label="Copy text"
                                onClick={onCopyText}
                            />
                        </Tooltip>
                        <Tooltip
                            withArrow
                            content="Remove verse"
                            relationship="label">
                            <Button
                                appearance="subtle"
                                icon={<DeleteRegular primaryFill='#c50f1f' color='danger' />}
                                aria-label="Remove verse"
                                onClick={() => props.onVerseDeselectClick(props.verse)}
                            />
                        </Tooltip>
                    </div>
                }
            />

            <div>
                {tokens.map(t => {
                    return <span key={t.id} className={`svc-token${t.isBreak ? ' svc-token-selected' : ''}`} onClick={(e) => onTokenClick(e, t)}>
                        <span className={t.alias ? 'strikethrough' : ''}>{t.text}</span>
                        <span hidden={!t.alias} style={{ fontStyle: 'italic', color: 'red' }}>&nbsp;{t.alias}</span>
                    </span>;
                })}
            </div>

            <Dialog open={aliasModalOpen}>
                <DialogSurface>
                    <DialogBody>
                        <DialogTitle>Change Pronunciation</DialogTitle>
                        <DialogContent>
                            <Field
                                label="Enter the desired pronunciation:">
                                <Input defaultValue={selectedToken?.replacement} onChange={onAliasChange} />
                            </Field>
                        </DialogContent>
                        <DialogActions>
                            <Button appearance="secondary" onClick={onAliasCancel}>Cancel</Button>
                            <Button appearance="primary" onClick={onAliasApply}>Apply</Button>
                        </DialogActions>
                    </DialogBody>
                </DialogSurface>
            </Dialog>

            <footer className="flex-row flex-gap-s">
                <div>
                    C:&nbsp;
                    <Tooltip
                        withArrow
                        content="Number of characters"
                        relationship="label">
                        <Badge appearance="filled" color="informative" shape='rounded'>{props.verse.verseText.length}</Badge>
                    </Tooltip>
                </div>
                <div>
                    W:&nbsp;
                    <Tooltip
                        withArrow
                        content="Number of words"
                        relationship="label">
                        <Badge appearance="filled" color="informative" shape='rounded'>{props.verse.verseText.split(/\s+/gi).length}</Badge>
                    </Tooltip>
                </div>
                <div className="flex-row-align-right">
                    #&nbsp;
                    <Tooltip
                        withArrow
                        content="Verse of study"
                        relationship="label">
                        <Badge appearance="filled" color="brand" shape='rounded'>{props.verse.studyNumber}</Badge>
                    </Tooltip>
                </div>
            </footer>
        </Card>
    );
};