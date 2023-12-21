import * as React from "react";
import {
    DialogTrigger,
    Button,
    Title3,
    Title2,
    Divider,
    Label,
    Tooltip,
    Body1
} from "@fluentui/react-components";

import kjv from '../kjv.json';
import { IEnhancedVerse, VerseSelectionTable } from "./VerseSelectionTable";
import { GenerateMaterialModal, ISelectedVerseResult } from "./GenerateMaterialModal";
import { BookComboBox } from "../Controls/BookComboBox";
import { ChapterComboBox } from "../Controls/ChapterComboBox";
import { FileUploadInput } from "../Controls/FileUploadInput";
import { SelectedVersesPanel } from "./SelectedVersesPanel";
import { ColorRegular, FolderOpenRegular, SaveRegular, SettingsCogMultipleRegular, SettingsRegular, TextFontSizeRegular } from "@fluentui/react-icons";
import { TextColorSelector } from "./TextColorSelector";
import { Alert } from "../Controls/Alert";
import { SettingsModal } from "./SettingsModal";

import Qualities from "../model/Qualities";
import ISettings from "../model/ISettings";
import IBook from "../model/IBook";
import IChapter from "../model/IChapter";
import IVerse from "../model/IVerse";
import ISelectedVerse from "../model/ISelectedVerse";
import IMaterial from "../model/IMaterial";
import IBible from "../model/IBible";
import { TextSizeSelector } from "./TextSizeSelector";
import ISizing from "../model/ISizing";

const bible = kjv as IBible;
const books: IBook[] = bible.books;

const defaultSettings: ISettings = {
    name: 'Untitled',
    speechVoice: 'en-US-JaneNeural',
    speechStyle: 'sad',
    speechRate: '-10.00%',
    videoFPS: 24,
    quality: Qualities[1],
    colors: [
        // green
        '#7FFF00',
        // orange
        '#FF8C00',
        // magenta
        '#FF1493',
        // blue
        '#00BFFF',
        // yellow
        '#FFD700',
        // purple
        '#BA55D3'
    ]
};

const defaultSizing: ISizing = {
    fontSize: 30,
    lineHeight: 55,
    referenceSpacing: 30
}

const getEnhancedVerse = (book: IBook, chapter: IChapter, verse: IVerse) => {
    return {
        id: `${book.number}-${chapter.number}-${verse.number}`,
        number: verse.number,
        text: verse.text
    };
};

const convertIdToSelectedVerse = (id: string, sizing: ISizing): ISelectedVerse => {
    const [b, c, v] = id.split('-').map(s => parseInt(s, 10));

    const bk = books.find(book => book.number === b);
    const ch = bk?.chapters?.find(chap => chap.number === c);
    const vs = ch?.verses?.find(vers => vers.number === v);

    return {
        id: id,
        studyNumber: 0,
        bookNumber: b,
        bookName: bk?.name ?? '',
        chapterNumber: c,
        verseNumber: v,
        verseText: vs?.text ?? '',
        breaks: [],
        aliases: [],
        sizing: { ...sizing }
    };
};

const sortAndRenumberSelectedVerses = (verses: ISelectedVerse[]) => {
    // sort
    verses.sort((a, b) => {
        let diff = a.bookNumber - b.bookNumber;
        if (diff === 0) {
            diff = a.chapterNumber - b.chapterNumber;
            if (diff === 0) {
                diff = a.verseNumber - b.verseNumber;
            }
        }
        return diff;
    });

    // default the study #
    verses.forEach((v, i) => {
        v.studyNumber = i + 1;
    });
};

export const MaterialBuilder = () => {
    const defaultBook = books[0];
    const defaultChapter = defaultBook.chapters[0];
    const defaultVerses = defaultChapter.verses.map(v => getEnhancedVerse(defaultBook, defaultChapter, v));

    const [selectedBook, setSelectedBook] = React.useState<IBook>(defaultBook);
    const [selectedChapter, setSelectedChapter] = React.useState<IChapter>(defaultChapter);

    const [chapters, setChapters] = React.useState<IChapter[]>(defaultBook.chapters);
    const [verses, setVerses] = React.useState<IEnhancedVerse[]>(defaultVerses);

    const [selectedVerseIds, setSelectedVerseIds] = React.useState<Set<string>>(new Set<string>([]));
    const [selectedVerses, setSelectedVerses] = React.useState<ISelectedVerse[]>([]);

    const [settings, setSettings] = React.useState<ISettings>(defaultSettings);

    const onBookSelect = (book?: IBook) => {
        if (book && book.number !== selectedBook.number) {
            setSelectedBook(book);
            setChapters(book.chapters);

            const chapter = book.chapters[0];
            setSelectedChapter(chapter);

            const verses = chapter.verses.map(v => {
                return getEnhancedVerse(book, chapter, v);
            });
            setVerses(verses);
        }
    };

    const onChapterSelect = (chapter?: IChapter) => {
        if (chapter) {
            setSelectedChapter(chapter);

            const verses = chapter.verses.map(v => {
                return getEnhancedVerse(selectedBook!, chapter, v);
            });
            setVerses(verses);
        }
    };

    // const onClearSelectionsClick = () => {
    //     setSelectedVerseIds(new Set<string>([]));
    //     setSelectedVerses([]);
    // };

    const onVerseSelectionChanged = (verses: string[]) => {
        const bookNumber = selectedBook?.number;
        const chapterNumber = selectedChapter?.number;

        const newSelected = new Set<string>(selectedVerseIds);
        const newSelectedVerses: ISelectedVerse[] = [...selectedVerses];

        // get all the verses that were removed
        const toDelete: string[] = [];
        selectedVerseIds.forEach(v => {
            // we can limit the search for performance
            if (v.startsWith(`${bookNumber}-${chapterNumber}`)) {
                if (verses.indexOf(v) < 0) {
                    // not found in new selections
                    toDelete.push(v);
                }
            }
        });

        // get all the ones added
        const toAdd: string[] = [];
        verses.forEach(v => {
            if (!newSelected.has(v)) {
                toAdd.push(v);
            }
        });

        // remove the ones that were removed
        toDelete.forEach(v => {
            newSelected.delete(v);

            const idx = newSelectedVerses.findIndex(ver => ver.id === v);
            if (idx >= 0) {
                newSelectedVerses.splice(idx, 1);
            }
        });

        // add the ones that were added
        toAdd.forEach(v => {
            newSelected.add(v);
            newSelectedVerses.push(convertIdToSelectedVerse(v, defaultSizing));
        });

        sortAndRenumberSelectedVerses(newSelectedVerses);

        setSelectedVerseIds(newSelected);
        setSelectedVerses(newSelectedVerses);
    };

    const onLoad = (file: File) => {
        file.text().then((data) => {
            const material: IMaterial = JSON.parse(data);
            const ids = new Set<string>();

            material.verses.forEach(v => {
                ids.add(v.id);
            });

            setSelectedVerseIds(ids);
            setSelectedVerses(material.verses.map((v) => ({
                ...v,
                breaks: v.breaks ?? [],
                aliases: v.aliases ?? [],
                sizing: v.sizing ?? { ...defaultSizing }
            })));
            setSettings({
                ...defaultSettings,
                ...material.settings
            });
        }).catch((err) => {
            console.error(err);
        });
    };

    const onSaveClick = async () => {
        // build a json file and prompt download
        const payload = JSON.stringify({
            settings: settings,
            verses: selectedVerses
        } as IMaterial);

        const fileName = `${settings.name.replace(/[^a-zA-Z0-9.]/gi, '-').toLocaleLowerCase()}.json`;
        const blob = new Blob([payload], { type: "text/json" });

        const win = window as any;
        if (win.showSaveFilePicker) {
            const handle = await win.showSaveFilePicker({
                suggestedName: fileName,
                types: [{
                    description: 'JSON file',
                    accept: { 'application/json': ['.json'] },
                }],
            });

            const writableStream = await handle.createWritable();
            await writableStream.write(blob);
            await writableStream.close();
        } else {
            const link = document.createElement("a");

            link.download = fileName;
            link.href = window.URL.createObjectURL(blob);
            link.dataset.downloadurl = ["text/json", link.download, link.href].join(":");

            const evt = new MouseEvent("click", {
                view: window,
                bubbles: true,
                cancelable: true,
            });

            link.dispatchEvent(evt);
            link.remove();
        }
    };

    const onGenerateComplete = (results: ISelectedVerseResult[]) => {
        // no-op right now
    };

    const onVerseHeaderClick = (verse: ISelectedVerse) => {
        const book = books.find(b => b.number === verse.bookNumber);
        const chapter = book?.chapters.find(c => c.number === verse.chapterNumber);

        setSelectedBook(book!);
        setChapters(book!.chapters);
        setSelectedChapter(chapter!);

        const verses = chapter!.verses.map(v => {
            return getEnhancedVerse(book!, chapter!, v);
        });

        setVerses(verses);
    };

    const onVerseDeselectClick = (verse: ISelectedVerse) => {
        const newSelectedIds = new Set<string>(selectedVerseIds);
        newSelectedIds.delete(verse.id);
        setSelectedVerseIds(newSelectedIds);

        const toRemove = selectedVerses.findIndex(v => v.id === verse.id);
        const newSelectedVerses = [...selectedVerses];
        newSelectedVerses.splice(toRemove, 1);
        setSelectedVerses(newSelectedVerses);
    }

    const onVerseBreakChange = (verse: ISelectedVerse) => {
        const selected = [...selectedVerses];
        const idx = selected.findIndex(v => v.id === verse.id);
        if (idx >= 0) {
            selected[idx] = verse;
        }
        setSelectedVerses(selected);
    };

    const onVerseAliasChange = (verse: ISelectedVerse) => {
        const selected = [...selectedVerses];
        const idx = selected.findIndex(v => v.id === verse.id);
        if (idx >= 0) {
            selected[idx] = verse;
        }
        setSelectedVerses(selected);
    };

    const onChapterRemove = (bookNumber: number, chapterNumber: number) => {
        const prefix = `${bookNumber}-${chapterNumber}-`;

        // find the ones to remove
        const toRemove = selectedVerses.filter(v => v.id.startsWith(prefix));

        // remove them
        const newSelectedVerses = [...selectedVerses];
        const newSelectedIds = new Set<string>(selectedVerseIds);
        toRemove.forEach(v => {
            newSelectedIds.delete(v.id);
            const index = newSelectedVerses.findIndex(sv => sv.id === v.id);
            if (index >= 0) {
                newSelectedVerses.splice(index, 1);
            }
        });

        // update the state
        setSelectedVerseIds(newSelectedIds);
        setSelectedVerses(newSelectedVerses);
    };

    const onSettingsChanged = (settings: ISettings) => {
        setSettings(settings);
    };

    const onVerseSizeChange = (verse: ISelectedVerse) => {
        const selected = [...selectedVerses];
        const idx = selected.findIndex(v => v.id === verse.id);
        if (idx >= 0) {
            selected[idx] = verse;
        }
        setSelectedVerses(selected);
    };

    const onApplySizingToAll = (sizing: ISizing) => {
        const verses = selectedVerses.map(v => {
            return {
                ...v,
                sizing: sizing
            }
        });
        setSelectedVerses(verses);
    };

    return (<>
        <div className="flex-row flex-gap-s p-s" style={{ backgroundColor: '#f4f4f4', alignItems: 'center' }}>
            {/* <Title2>Material Builder</Title2> */}
            <Title2>{settings.name}</Title2>

            <div className="flex-row flex-gap-s flex-row-align-right">
                {/* <Alert
                    title="Clear Selections"
                    content="Are you sure you want to clear all your selections?"
                    onCancel={() => { }}
                    onContinue={onClearSelectionsClick}>
                    <DialogTrigger disableButtonEnhancement>
                        <Button icon={<DeleteRegular />}>Clear Selections</Button>
                    </DialogTrigger>
                </Alert> */}
                <Alert
                    title="Color Selection"
                    content={<TextColorSelector
                        settings={settings}
                        onSettingsChanged={onSettingsChanged} />}
                    onCancel={() => { }}
                    onContinue={() => { }}
                    maxWidth={1200}
                    continueLabel="Done">
                    <DialogTrigger disableButtonEnhancement>
                        <Button icon={<ColorRegular />}></Button>
                    </DialogTrigger>
                </Alert>

                <Alert
                    title="Sizing"
                    content={<TextSizeSelector
                        verses={selectedVerses}
                        defaultSizing={defaultSizing}
                        settings={settings}
                        onVerseSizeChange={onVerseSizeChange}
                        onApplyToAll={onApplySizingToAll} />}
                    onCancel={() => { }}
                    onContinue={() => { }}
                    maxWidth={1180}
                    continueLabel="Done">
                    <DialogTrigger disableButtonEnhancement>
                        <Button icon={<TextFontSizeRegular />}></Button>
                    </DialogTrigger>
                </Alert>

                <SettingsModal
                    onSettingsChanged={onSettingsChanged}
                    settings={settings}>
                    <DialogTrigger disableButtonEnhancement>
                        <Button icon={<SettingsRegular />} />
                    </DialogTrigger>
                </SettingsModal>

                <FileUploadInput
                    icon={<FolderOpenRegular />}
                    onFileUpload={onLoad} />

                <Button
                    icon={<SaveRegular />}
                    onClick={onSaveClick} />

                <GenerateMaterialModal
                    verses={selectedVerses}
                    settings={settings}
                    onGenerateComplete={onGenerateComplete}>
                    <DialogTrigger disableButtonEnhancement>
                        <Button icon={<SettingsCogMultipleRegular />} appearance="primary">Generate</Button>
                    </DialogTrigger>
                </GenerateMaterialModal>
            </div>
        </div>

        <Divider />

        <div className="flex-row flex-justify-center">
            <div className="p-m" style={{ width: '70%' }}>
                <div className="flex-row pb-s">
                    <div className="flex-row flex-gap-m flex-row-align" style={{ alignItems: 'center' }}>
                        <Label>Book:</Label>
                        <BookComboBox
                            books={books}
                            selectedBook={selectedBook}
                            onBookSelect={onBookSelect}
                        />

                        <Label>Chapter:</Label>
                        <ChapterComboBox
                            chapters={chapters}
                            selectedChapter={selectedChapter}
                            onChapterSelect={onChapterSelect}
                        />
                    </div>
                </div>
                <VerseSelectionTable
                    items={verses}
                    selectedVerses={selectedVerseIds}
                    onSelectionChanged={onVerseSelectionChanged}
                />
            </div>
            <Divider vertical />
            <div className="p-m" style={{ width: '30%', backgroundColor: '#fafafa', paddingLeft: 0 }}>
                <SelectedVersesPanel
                    settings={settings}
                    verses={selectedVerses}
                    onVerseHeaderClick={onVerseHeaderClick}
                    onVerseDeselectClick={onVerseDeselectClick}
                    onVerseBreakChange={onVerseBreakChange}
                    onVerseAliasChange={onVerseAliasChange}
                    onChapterRemove={onChapterRemove}
                />
            </div>
        </div>
    </>);
};