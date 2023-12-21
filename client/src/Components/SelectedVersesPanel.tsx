import * as React from 'react';
import { Accordion, AccordionHeader, AccordionItem, AccordionPanel, AccordionToggleEventHandler, Badge, Button, Divider, Title3, Tooltip } from "@fluentui/react-components";
import { SelectedVerseCard } from './SelectedVerseCard';
import { BookRegular, DeleteRegular } from '@fluentui/react-icons';

import ISelectedVerse from '../model/ISelectedVerse';
import IBreak from '../model/IBreak';
import ISettings from '../model/ISettings';

export interface ISelectedVersesPanelProps {
    settings: ISettings;
    verses: ISelectedVerse[];
    onVerseHeaderClick: (verse: ISelectedVerse) => void;
    onVerseDeselectClick: (verse: ISelectedVerse) => void;
    onVerseBreakChange: (verse: ISelectedVerse) => void;
    onVerseAliasChange: (verse: ISelectedVerse) => void;
    onChapterRemove: (bookNumber: number, chapterNumber: number) => void;
}

interface IVerseGroup {
    id: string;
    bookName: string;
    bookNumber: number;
    chapterNumber: number;
    verses: ISelectedVerse[];
}

const groupVerses = (verses: ISelectedVerse[]): IVerseGroup[] => {
    const output: IVerseGroup[] = [];

    verses.forEach(v => {
        const id = `${v.bookNumber}-${v.chapterNumber}`;
        let group = output.find(g => g.id === id);
        if (!group) {
            group = {
                id: id,
                bookName: v.bookName,
                bookNumber: v.bookNumber,
                chapterNumber: v.chapterNumber,
                verses: [v]
            };
            output.push(group);
        } else {
            group.verses.push(v);
        }
    });

    return output;
};

export const SelectedVersesPanel = (props: ISelectedVersesPanelProps) => {
    const [openItems, setOpenItems] = React.useState<string[]>([]);
    const handleToggle: AccordionToggleEventHandler<string> = (event, data) => {
        setOpenItems(data.openItems);
    };

    const groups = groupVerses(props.verses);

    return (
        <div className='flex-row flex-justify-center pl-l'>
            <div className='w-100p'>
                <Title3 className='d-block pb-s'>
                    Selected <Badge appearance="filled" color="brand">{props.verses.length}</Badge>
                </Title3>
                <Accordion
                    openItems={openItems}
                    onToggle={handleToggle}
                    multiple
                    collapsible>
                    {groups.map(g => (
                        <AccordionItem key={g.id} value={g.id}>
                            <div className='flex flex-row' style={{ paddingRight: 12 }}>
                                <AccordionHeader className='w-100p' expandIconPosition="end" icon={<BookRegular />}>
                                    {g.bookName}&nbsp;{g.chapterNumber}
                                    <Divider className='pr-s pl-m'></Divider>
                                    <Badge appearance="filled" color="informative" shape='rounded'>{g.verses.length}</Badge>

                                </AccordionHeader>
                                <Tooltip
                                    withArrow
                                    content="Remove chapter"
                                    relationship='label'>
                                    <Button
                                        appearance="subtle"
                                        icon={<DeleteRegular primaryFill='#c50f1f' color='danger' />}
                                        aria-label="Remove chapter"
                                        onClick={() => props.onChapterRemove(g.bookNumber, g.chapterNumber)}
                                    />
                                </Tooltip>
                            </div>

                            <AccordionPanel>
                                <div className='flex-column flex-gap-m pb-l'>
                                    {g.verses.map(v => (
                                        <SelectedVerseCard
                                            key={v.id}
                                            settings={props.settings}
                                            verse={v}
                                            onVerseHeaderClick={props.onVerseHeaderClick}
                                            onVerseDeselectClick={props.onVerseDeselectClick}
                                            onVerseBreakChange={props.onVerseBreakChange}
                                            onVerseAliasChange={props.onVerseAliasChange} />
                                    ))}
                                </div>
                            </AccordionPanel>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    );
};
