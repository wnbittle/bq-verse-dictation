import * as React from "react";
import {
    Label,
    useId,
    Input,
    Combobox,
    Option,
    Field,
    Dropdown
} from "@fluentui/react-components";

import IVoice from "../model/IVoice";
import { DragonHDOmniLocales, DragonHDOmniStyles, DragonHDOmniVoices } from "../model/DragonHDOmni";

export interface IVoiceSelectorProps {
    voice: IVoice;
    onVoiceSelectionChanged: (voice: IVoice) => void;
}

const getVoiceName = (voice: string) => {
    // en-au-annette:DragonHDOmniLatestNeural
    let name = voice.split("-")[2].split(":")[0];
    name = name.charAt(0).toUpperCase() + name.slice(1);
    return name;
}

// unique values
const uniqueLocales = Array.from(new Set(DragonHDOmniVoices.map((voice) => voice["Locale"]))).sort();

const getVoiceForName = (voiceName: string) => {
    let voice = DragonHDOmniVoices.find((voice) => voice["Voice Name"] === voiceName);
    if (!voice) {
        voice = DragonHDOmniVoices.find((voice) => getVoiceName(voice["Voice Name"]) === "en-us-jane:DragonHDOmniLatestNeural");
    }
    return voice;
};

const getVoiceOptions = (locale: string, gender: string, age: string) => {
    const options = DragonHDOmniVoices.filter((voice) => {
        return (voice["Locale"] === locale) &&
            (voice["Gender"] === gender) &&
            (voice["Age Group"] === age);
    });
    return options;
}

const getGenderOptions = (locale: string): string[] => {
    const options = DragonHDOmniVoices.filter((voice) => {
        return (voice["Locale"] === locale);
    });
    return Array.from(new Set(options.map((voice) => voice["Gender"]))).sort();
}

const getAgeOptions = (locale: string, gender: string): string[] => {
    const options = DragonHDOmniVoices.filter((voice) => {
        return (voice["Locale"] === locale) &&
            (voice["Gender"] === gender);
    });
    return Array.from(new Set(options.map((voice) => voice["Age Group"]))).sort();
}

const getStyleForValue = (value: string) => {
    const style = DragonHDOmniStyles.find((style) => style.value === value);
    return style?.name;
}

export const VoiceSelector = (props: IVoiceSelectorProps) => {
    const inputId = useId("input");

    const [selectedLocale, setSelectedLocale] = React.useState<string>(props.voice.locale);
    const [selectedLocaleName, setSelectedLocaleName] = React.useState<string>(DragonHDOmniLocales[props.voice.locale]);
    const [selectedLocales, setSelectedLocales] = React.useState<string[]>([props.voice.locale]);

    const [selectedGender, setSelectedGender] = React.useState<string>(props.voice.gender);
    const [genderOptions, setGenderOptions] = React.useState<string[]>(getGenderOptions(props.voice.locale));
    const [selectedGenders, setSelectedGenders] = React.useState<string[]>([props.voice.gender]);
    
    const [selectedAge, setSelectedAge] = React.useState<string>(props.voice.age);
    const [ageOptions, setAgeOptions] = React.useState<string[]>(getAgeOptions(props.voice.locale, props.voice.gender));
    const [selectedAges, setSelectedAges] = React.useState<string[]>([props.voice.age]);
    
    const [speechVoice, setSpeechVoice] = React.useState<string>(props.voice.name);
    const [speechVoiceName, setSpeechVoiceName] = React.useState<string>(getVoiceName(props.voice.name));
    const [speechVoiceDescription, setSpeechVoiceDescription] = React.useState<string>(getVoiceForName(props.voice.name)?.Description || "");
    const [voiceOptions, setVoiceOptions] = React.useState<any[]>(getVoiceOptions(props.voice.locale, props.voice.gender, props.voice.age));
    const [selectedVoices, setSelectedVoices] = React.useState<string[]>([props.voice.name]);

    const [speechStyle, setSpeechStyle] = React.useState<string>(props.voice.style);
    const [speechStyleName, setSpeechStyleName] = React.useState<string>(getStyleForValue(props.voice.style)!);
    const [selectedStyles, setSelectedSytles] = React.useState<string[]>([props.voice.style]);
    
    const [speechRate, setSpeechRate] = React.useState<string>(props.voice.rate);

    React.useEffect(() => {
        console.log('rerender: ');
        setSelectedLocale(props.voice.locale);
        setSelectedLocaleName(DragonHDOmniLocales[props.voice.locale]);
        setSelectedLocales([props.voice.locale]);

        setSelectedGender(props.voice.gender);
        setGenderOptions(getGenderOptions(props.voice.locale));
        setSelectedGenders([props.voice.gender]);

        setSelectedAge(props.voice.age);
        setAgeOptions(getAgeOptions(props.voice.locale, props.voice.gender));
        setSelectedAges([props.voice.age]);

        setSpeechVoice(props.voice.name);
        setSpeechVoiceName(getVoiceName(props.voice.name));
        setSpeechVoiceDescription(getVoiceForName(props.voice.name)?.Description || "");
        setVoiceOptions(getVoiceOptions(props.voice.locale, props.voice.gender, props.voice.age));
        setSelectedVoices([props.voice.name]);
        
        setSpeechStyle(props.voice.style);
        setSpeechStyleName(getStyleForValue(props.voice.style)!);
        setSelectedSytles([props.voice.style]);

        setSpeechRate(props.voice.rate);
    }, [props.voice]);
    
    const onLocaleSelectionChanged = (locale: string) => {
        setSelectedLocale(locale); 
        setSelectedLocales([locale]);
        setSelectedLocaleName(DragonHDOmniLocales[locale]);

        const genderOptions = getGenderOptions(locale);
        const gender = genderOptions.includes(selectedGender) ? selectedGender : genderOptions[0];
        setSelectedGender(gender);
        setGenderOptions(genderOptions);
        setSelectedGenders([gender]);

        const ageOptions = getAgeOptions(locale, gender);
        const age = ageOptions.includes(selectedAge) ? selectedAge : ageOptions[0];
        setSelectedAge(age);
        setAgeOptions(ageOptions);
        setSelectedAges([age]);

        const voiceOptions = getVoiceOptions(locale, gender, age);
        const voice = voiceOptions[0];
        const voiceName = voice["Voice Name"];
        setSpeechVoice(voiceName);
        setSpeechVoiceName(getVoiceName(voiceName));
        setSpeechVoiceDescription(voice.Description);
        setVoiceOptions(voiceOptions);
        setSelectedVoices([voiceName]);
    };

    const onGenderSelectionChanged = (gender: string) => {
        setSelectedGender(gender);
        setSelectedGenders([gender]);

        const ageOptions = getAgeOptions(selectedLocale, gender);
        const age = ageOptions.includes(selectedAge) ? selectedAge : ageOptions[0];
        setSelectedAge(age);
        setAgeOptions(ageOptions);
        setSelectedAges([age]);

        const voiceOptions = getVoiceOptions(selectedLocale, gender, age);
        const voice = voiceOptions[0];
        const voiceName = voice["Voice Name"];
        setSpeechVoice(voiceName);
        setSpeechVoiceName(getVoiceName(voiceName));
        setSpeechVoiceDescription(voice.Description);
        setVoiceOptions(voiceOptions);
        setSelectedVoices([voiceName]);
    };

    const onAgeSelectionChanged = (age: string) => {
        setSelectedAge(age);
        setSelectedAges([age]);

        const voiceOptions = getVoiceOptions(selectedLocale, selectedGender, age);
        const voice = voiceOptions[0];
        const voiceName = voice["Voice Name"];
        setSpeechVoice(voiceName);
        setSpeechVoiceName(getVoiceName(voiceName));
        setSpeechVoiceDescription(voice.Description);
        setVoiceOptions(voiceOptions);
        setSelectedVoices([voiceName]);
    };

    const onVoiceSelectionChanged = (voiceName: string) => {
        console.log('onVoiceSelectionChanged: ', voiceName);
        const voice = getVoiceForName(voiceName);

        setSelectedLocale(voice?.Locale!);
        setSelectedLocaleName(DragonHDOmniLocales[voice?.Locale!]);
        setSelectedGender(voice?.Gender!);
        setSelectedAge(voice?.["Age Group"]!);
        setSpeechVoice(voiceName);
        setSpeechVoiceName(getVoiceName(voiceName));
        setSpeechVoiceDescription(voice?.Description || "");

        props.onVoiceSelectionChanged({
            locale: voice?.Locale!,
            gender: voice?.Gender!,
            age: voice?.["Age Group"]!,
            name: voice?.["Voice Name"]!,
            style: speechStyle,
            rate: speechRate
        });
    };

    const onVoiceStyleChanged = (style: string) => {
        console.log('onVoiceStyleChanged: ', style);
        setSpeechStyle(style);
        setSpeechStyleName(getStyleForValue(style)!);
        props.onVoiceSelectionChanged({
            locale: selectedLocale,
            gender: selectedGender,
            age: selectedAge,
            name: speechVoice,
            style: style,
            rate: speechRate
        });
    };

    const onSpeechRateChanged = () => {
        console.log('onSpeechRateChanged: ', speechRate);
        props.onVoiceSelectionChanged({
            locale: selectedLocale,
            gender: selectedGender,
            age: selectedAge,
            name: speechVoice,
            style: speechStyle,
            rate: speechRate
        });
    };

    return (
        <div className="flex flex-column flex-gap-m flex-1">
            <div className="flex flex-column flex-gap-s">
                <Label htmlFor={`${inputId}-speechlocale`} size="small">
                    Speech Locale
                </Label>
                <Dropdown 
                    id={`${inputId}-speechlocale`}
                    placeholder="Select a locale"
                    onOptionSelect={(e, d) => { onLocaleSelectionChanged(d.optionValue!); }}
                    value={selectedLocaleName}
                    positioning={{
                        autoSize: true,
                    }}
                    selectedOptions={selectedLocales}>
                    {uniqueLocales.map((option) => (
                        <Option key={option} value={option}>
                            {DragonHDOmniLocales[option]}
                        </Option>
                    ))}
                </Dropdown>
            </div>
            <div className="flex flex-column flex-gap-s">
                <Label htmlFor={`${inputId}-speechgender`} size="small">
                    Speech Gender
                </Label>
                <Dropdown
                    id={`${inputId}-speechgender`}
                    placeholder="Select a gender"
                    onOptionSelect={(e, d) => { onGenderSelectionChanged(d.optionValue!); }}
                    value={selectedGender}
                    selectedOptions={selectedGenders}>
                    {genderOptions.map((option) => (
                        <Option key={option} value={option}>
                            {option}
                        </Option>
                    ))}
                </Dropdown>
            </div>
            <div className="flex flex-column flex-gap-s">
                <Label htmlFor={`${inputId}-speechage`} size="small">
                    Speech Age
                </Label>
                <Dropdown
                    id={`${inputId}-speechage`}
                    placeholder="Select an age"
                    onOptionSelect={(e, d) => { onAgeSelectionChanged(d.optionValue!); }}
                    value={selectedAge}
                    selectedOptions={selectedAges}>
                    {ageOptions.map((option) => (
                        <Option key={option} value={option}>
                            {option}
                        </Option>
                    ))}
                </Dropdown>
            </div>
            <div className="flex flex-column flex-gap-s">
                <Label htmlFor={`${inputId}-speechvoice`} size="small">
                    Speech Voice
                </Label>
                <Field hint={speechVoiceDescription}>
                    <Dropdown
                        id={`${inputId}-speechvoice`}
                        placeholder="Select a voice"
                        onOptionSelect={(e, d) => { onVoiceSelectionChanged(d.optionValue!); }}
                        value={speechVoiceName}
                        positioning={{
                            autoSize: true,
                        }}
                        selectedOptions={selectedVoices}>
                        {voiceOptions.map((option) => (
                            <Option key={option["Voice Name"]} value={option["Voice Name"]}>
                                {getVoiceName(option["Voice Name"])}
                            </Option>
                        ))}
                    </Dropdown>
                </Field>
            </div>
            <div className="flex flex-column flex-gap-s">
                <Label htmlFor={`${inputId}-speechstyle`} size="small">
                    Speech Style
                </Label>
                <Dropdown
                    id={`${inputId}-speechstyle`}
                    placeholder="Select a style"
                    onOptionSelect={(e, d) => { onVoiceStyleChanged(d.optionValue!); }}
                    value={speechStyleName}
                    positioning={{
                        autoSize: true,
                    }}
                    selectedOptions={selectedStyles}>
                    {DragonHDOmniStyles.map((option) => (
                        <Option key={option.value} value={option.value}>
                            {option.name}
                        </Option>
                    ))}
                </Dropdown>
            </div>
            <div className="flex flex-column flex-gap-s">
                <Label htmlFor={`${inputId}-speechrate`} size="small">
                    Speech Rate
                </Label>
                <Input id={`${inputId}-speechrate`} value={speechRate} onChange={(e, data) => {
                    setSpeechRate(data.value);
                }} onBlur={onSpeechRateChanged} />
            </div>
        </div>
    );
};