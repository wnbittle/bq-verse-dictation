import * as React from "react";
import { Card, CardHeader, Button, Badge, Subtitle2Stronger, Link, Tooltip, Dialog, DialogSurface, DialogBody, DialogTitle, DialogContent, DialogActions, Field, Input, InputOnChangeData } from "@fluentui/react-components";
import { CopyRegular, DeleteRegular, PersonVoiceRegular } from "@fluentui/react-icons";

import ISelectedVerse from "../model/ISelectedVerse";
import { AudioPlayer } from "../Controls/AudioPlayer";
import ISettings from "../model/ISettings";
import IAlias from "../model/IAlias";
import { VoiceSelector } from "./VoiceSelector";
import IVoice from "../model/IVoice";
import IPhenome from "../model/IPhenome";

export interface ISelectedVerseCardProps {
    settings: ISettings;
    verse: ISelectedVerse;
    onVerseHeaderClick: (verse: ISelectedVerse) => void;
    onVerseDeselectClick: (verse: ISelectedVerse) => void;
    onVerseTokenChange: (verse: ISelectedVerse) => void;
    onVerseVoiceChange: (verse: ISelectedVerse) => void;
}

interface IToken {
    id: number;
    text: string;
    start: number;
    end: number;

    isBreak: boolean;
    isPunctuation: boolean;
    alias?: string;
    phenome?: string;
}

// TODO: Allow setting the study #

export const SelectedVerseCard = (props: ISelectedVerseCardProps) => {
    const tokens: IToken[] = [];
    const items = props.verse.verseText
        .split(/(\s+)|([^\w\s])/gi)
        .filter(token => token !== undefined && token !== null && token !== '');

    const [selectedToken, setSelectedToken] = React.useState<IToken>();
    const [tokenModalOpen, setTokenModalOpen] = React.useState<boolean>(false);
    const [voiceModalOpen, setVoiceModalOpen] = React.useState<boolean>(false);
    const [voice, setVoice] = React.useState(props.verse.voice);

    React.useEffect(() => {
        setVoice(props.verse.voice);
    }, [props.verse]);

    let position = 0;
    items.forEach((t, i) => {
        const start = position;
        const end = position + t.length;
        if (t?.trim()) {
            const breakIdx = (props.verse.breaks ?? []).findIndex(b => b.id === i);
            const aliasIdx = (props.verse.aliases ?? []).findIndex(a => a.id === i);
            const phenomeIdx = (props.verse.phenomes ?? []).findIndex(p => p.id === i);
            tokens.push({
                id: i,
                text: t,
                start: start,
                end: end,
                isBreak: breakIdx >= 0,
                isPunctuation: t.length === 1 && /[^\w\s]/gi.test(t),
                alias: aliasIdx >= 0 ? props.verse.aliases[aliasIdx].replacement : undefined,
                phenome: phenomeIdx >= 0 ? props.verse.phenomes[phenomeIdx].phenome : undefined
            });
        }
        position = end;
    });

    const onTokenClick = (e: React.MouseEvent, token: IToken) => {
        if (e.ctrlKey) {
            // then prompt for alias/phenome
            setSelectedToken({
                ...token
            });
            setTokenModalOpen(true);
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
            props.onVerseTokenChange({
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
            alias: data.value?.trim()
        });
    };

    const onPhenomeChange = (e: React.ChangeEvent, data: InputOnChangeData) => {
        const token = selectedToken;
        setSelectedToken({
            ...token!,
            phenome: data.value?.trim()
        });
    };

    const onTokenEditApply = () => {
        const token = selectedToken!;

        props.onVerseTokenChange({
            ...props.verse,
            //aliases: updateAliases(token),
            phenomes: updatePhenomes(token)
        });

        setTokenModalOpen(false);
    };

    const updateAliases = (token: IToken): IAlias[] => {
        const aliases = [...props.verse.aliases];
        const aliasIdx = aliases.findIndex(a => a.id === token.id);
        const alias = aliasIdx >= 0 ? aliases[aliasIdx] : null;

        // if the token alias is the same as the original or if the
        // token alias is empty, then remove the alias
        if (token.alias === alias?.original || !token.alias) {
            // then remove the alias
            if (aliasIdx >= 0) {
                aliases.splice(aliasIdx, 1);
            }
        } else {
            // then add/update the alias
            let aliasToAdd: IAlias = {
                id: token.id,
                location: token.start,
                original: token.text,
                replacement: token.alias!
            };
            if (aliasIdx >= 0) {
                aliases[aliasIdx] = aliasToAdd;
            } else {
                aliases.push(aliasToAdd);
            }
        }

        aliases.sort((a, b) => a.id - b.id);

        return aliases;
    };

    const updatePhenomes = (token: IToken): IPhenome[] => {
        const phenomes = [...props.verse.phenomes];
        const phenomeIdx = phenomes.findIndex(p => p.id === token.id);

        if (!token.phenome) {
            // then remove the phenome
            if (phenomeIdx >= 0) {
                phenomes.splice(phenomeIdx, 1);
            }
        } else {
            // then add/update the phenome
            let phenomeToAdd: IPhenome = {
                id: token.id,
                location: token.start,
                text: token.text,
                phenome: token.phenome!
            };
            if (phenomeIdx >= 0) {
                phenomes[phenomeIdx] = phenomeToAdd;
            } else {
                phenomes.push(phenomeToAdd);
            }
        }

        phenomes.sort((a, b) => a.id - b.id);

        return phenomes;
    };

    const onTokenEditCancel = () => {
        setTokenModalOpen(false);
    };

    const onVoiceSelectionApply = () => {
        setVoiceModalOpen(false);
        console.log('onVoiceSelectionApply: ', voice);
        props.onVerseVoiceChange({
            ...props.verse,
            voice: { ...voice }
        });
        // TODO reset the player status
    };

    const onVoiceSelectionCancel = () => {
        setVoiceModalOpen(false);
        setVoice(props.verse.voice);
    };

    const onVoiceSelectionChanged = (voice: IVoice) => {
        setVoice(voice);
    };

    const onChangeVoiceSettingsClick = () => {
        setVoiceModalOpen(true);
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
                            content="Change voice settings"
                            relationship="label">
                            <Button
                                appearance="subtle"
                                icon={<PersonVoiceRegular />}
                                aria-label="Change voice settings"
                                onClick={onChangeVoiceSettingsClick}
                            />
                        </Tooltip>
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
                    if (t.isPunctuation) {
                        return <span key={t.id}>{t.text}&nbsp;</span>;
                    } else {
                        return <span key={t.id} className={`svc-token${t.isBreak ? ' svc-token-selected' : ''}`} onClick={(e) => onTokenClick(e, t)}>
                            <span className={t.alias ? 'strikethrough' : ''}>{t.text}</span>
                            <span hidden={!t.alias} style={{ fontStyle: 'italic', color: 'red' }}>&nbsp;{t.alias}</span>
                            <span hidden={!t.phenome} style={{ color: '#479ef5' }}>&nbsp;({t.phenome})</span>
                        </span>;
                    }
                })}
            </div>

            <Dialog open={tokenModalOpen}>
                <DialogSurface>
                    <DialogBody>
                        <DialogTitle>Pronunciation</DialogTitle>
                        <DialogContent>
                            <div className="pb-s">For pronunciation, use the <Link href="https://en.wikipedia.org/wiki/International_Phonetic_Alphabet">International Phonetic Alphabet (IPA)</Link>.</div>
                            {/* <Field
                                label="Enter the desired substitution:">
                                <Input defaultValue={selectedToken?.alias} onChange={onAliasChange} />
                            </Field> */}
                            <Field
                                label="Enter the desired pronunciation:">
                                <Input defaultValue={selectedToken?.phenome} onChange={onPhenomeChange} />
                            </Field>
                        </DialogContent>
                        <DialogActions>
                            <Button appearance="secondary" onClick={onTokenEditCancel}>Cancel</Button>
                            <Button appearance="primary" onClick={onTokenEditApply}>Apply</Button>
                        </DialogActions>
                    </DialogBody>
                </DialogSurface>
            </Dialog>

            <Dialog open={voiceModalOpen}>
                <DialogSurface>
                    <DialogBody>
                        <DialogTitle>Change Voice</DialogTitle>
                        <DialogContent>
                            <p>See here for voice setting options: <Link href="https://speech.microsoft.com/portal/8a433965d84745b8aba1c7cad835c29c/voicegallery">Voice Gallery</Link></p>
                            <VoiceSelector 
                                voice={voice}
                                onVoiceSelectionChanged={onVoiceSelectionChanged}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button appearance="secondary" onClick={onVoiceSelectionCancel}>Cancel</Button>
                            <Button appearance="primary" onClick={onVoiceSelectionApply}>Apply</Button>
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