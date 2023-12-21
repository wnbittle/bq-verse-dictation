import { Caption1, Card, CardHeader, CardPreview, Checkbox } from "@fluentui/react-components";
import * as React from "react";
import ISettings from "../model/ISettings";
import chroma from "chroma-js";

export interface TextColorSelectorProps {
    settings: ISettings;
    onSettingsChanged: (settings: ISettings) => void;
}

export const TextColorSelector = (props: TextColorSelectorProps) => {
    const colors: string[] = generateColors();

    const onSelectionChange = (color: string) => {
        const index = props.settings.colors.indexOf(color);
        if (index < 0) {
            props.onSettingsChanged({
                ...props.settings,
                colors: [...props.settings.colors, color]
            });
        } else if (index >= 0) {
            const colors = [...props.settings.colors];
            colors.splice(index, 1);
            props.onSettingsChanged({
                ...props.settings,
                colors: colors
            });
        }
    };

    return (
        <div className="flex-row flex-gap-s p-l" style={{ flexWrap: 'wrap', fontWeight: 'bolder', fontSize: '10px', backgroundColor: '#333' }}>
            {colors.map(c => (
                <ColorCard 
                    color={c}
                    onCardSelectionChange={onSelectionChange}
                    selected={props.settings.colors.indexOf(c) >= 0}
                    key={`C${c}`}
                 />
            ))}
        </div>
    );
};

interface IColorCardProps {
    color: string;
    selected: boolean;
    onCardSelectionChange: (color: string) => void;
}

const ColorCard = (props: IColorCardProps) => {
    const [selected, setSelected] = React.useState<boolean>(props.selected);

    const onCardSelectedChange = (selected: boolean) => {
        setSelected(selected);
        props.onCardSelectionChange(props.color);
    };

    return (<Card
        //  className={styles.card}
        floatingAction={
            <Checkbox
                onChange={(e, data) => onCardSelectedChange(data.checked as boolean)}
                checked={selected}
            />
        }
        selected={selected}
        onSelectionChange={(e, data) => onCardSelectedChange(data.selected)}>
        <CardPreview
        //    className={styles.grayBackground}
        //    logo={
        //      <img
        //        className={styles.logoBadge}
        //        src={resolveAsset("logo3.svg")}
        //        alt="Figma app logo"
        //      />
        //    }
        >
            {/* <img
            //  className={styles.smallRadius}
            //  src={resolveAsset("office1.png")}
             alt="Presentation Preview"
           /> */}
            <div className="flex-column p-s" style={{ width: 80, height: 24, backgroundColor: 'black', color: props.color, alignItems: 'center', justifyContent: 'center' }}>{props.color}</div>
        </CardPreview>

        {/* <CardHeader
           header={<Text weight="semibold">iOS App Prototype</Text>}
           description={
             <Caption1 className={styles.caption}>
               You created 53m ago
             </Caption1>
           }
           action={
             <Button
               appearance="transparent"
               icon={<MoreHorizontal20Regular />}
               aria-label="More actions"
             />
           }
         /> */}
    </Card>);
};

const CSS_COLOR_NAMES: any = {
    AliceBlue: '#F0F8FF',
    AntiqueWhite: '#FAEBD7',
    Aquamarine: '#7FFFD4',
    Azure: '#F0FFFF',
    Beige: '#F5F5DC',
    Bisque: '#FFE4C4',
    Black: '#000000',
    BlanchedAlmond: '#FFEBCD',
    Blue: '#0000FF',
    BlueViolet: '#8A2BE2',
    Brown: '#A52A2A',
    BurlyWood: '#DEB887',
    CadetBlue: '#5F9EA0',
    Chartreuse: '#7FFF00',
    Chocolate: '#D2691E',
    Coral: '#FF7F50',
    CornflowerBlue: '#6495ED',
    Cornsilk: '#FFF8DC',
    Crimson: '#DC143C',
    Cyan: '#00FFFF',
    DarkBlue: '#00008B',
    DarkCyan: '#008B8B',
    DarkGoldenRod: '#B8860B',
    DarkGrey: '#A9A9A9',
    DarkGreen: '#006400',
    DarkKhaki: '#BDB76B',
    DarkMagenta: '#8B008B',
    DarkOliveGreen: '#556B2F',
    DarkOrange: '#FF8C00',
    DarkOrchid: '#9932CC',
    DarkRed: '#8B0000',
    DarkSalmon: '#E9967A',
    DarkSeaGreen: '#8FBC8F',
    DarkSlateBlue: '#483D8B',
    DarkSlateGrey: '#2F4F4F',
    DarkTurquoise: '#00CED1',
    DarkViolet: '#9400D3',
    DeepPink: '#FF1493',
    DeepSkyBlue: '#00BFFF',
    DimGrey: '#696969',
    DodgerBlue: '#1E90FF',
    FireBrick: '#B22222',
    FloralWhite: '#FFFAF0',
    ForestGreen: '#228B22',
    Gainsboro: '#DCDCDC',
    GhostWhite: '#F8F8FF',
    Gold: '#FFD700',
    GoldenRod: '#DAA520',
    Grey: '#808080',
    Green: '#008000',
    GreenYellow: '#ADFF2F',
    HoneyDew: '#F0FFF0',
    HotPink: '#FF69B4',
    IndianRed: '#CD5C5C',
    Indigo: '#4B0082',
    Ivory: '#FFFFF0',
    Khaki: '#F0E68C',
    Lavender: '#E6E6FA',
    LavenderBlush: '#FFF0F5',
    LawnGreen: '#7CFC00',
    LemonChiffon: '#FFFACD',
    LightBlue: '#ADD8E6',
    LightCoral: '#F08080',
    LightCyan: '#E0FFFF',
    LightGoldenRodYellow: '#FAFAD2',
    LightGrey: '#D3D3D3',
    LightGreen: '#90EE90',
    LightPink: '#FFB6C1',
    LightSalmon: '#FFA07A',
    LightSeaGreen: '#20B2AA',
    LightSkyBlue: '#87CEFA',
    LightSlateGrey: '#778899',
    LightSteelBlue: '#B0C4DE',
    LightYellow: '#FFFFE0',
    Lime: '#00FF00',
    LimeGreen: '#32CD32',
    Linen: '#FAF0E6',
    Magenta: '#FF00FF',
    Maroon: '#800000',
    MediumAquaMarine: '#66CDAA',
    MediumBlue: '#0000CD',
    MediumOrchid: '#BA55D3',
    MediumPurple: '#9370DB',
    MediumSeaGreen: '#3CB371',
    MediumSlateBlue: '#7B68EE',
    MediumSpringGreen: '#00FA9A',
    MediumTurquoise: '#48D1CC',
    MediumVioletRed: '#C71585',
    MidnightBlue: '#191970',
    MintCream: '#F5FFFA',
    MistyRose: '#FFE4E1',
    Moccasin: '#FFE4B5',
    NavajoWhite: '#FFDEAD',
    Navy: '#000080',
    OldLace: '#FDF5E6',
    Olive: '#808000',
    OliveDrab: '#6B8E23',
    Orange: '#FFA500',
    OrangeRed: '#FF4500',
    Orchid: '#DA70D6',
    PaleGoldenRod: '#EEE8AA',
    PaleGreen: '#98FB98',
    PaleTurquoise: '#AFEEEE',
    PaleVioletRed: '#DB7093',
    PapayaWhip: '#FFEFD5',
    PeachPuff: '#FFDAB9',
    Peru: '#CD853F',
    Pink: '#FFC0CB',
    Plum: '#DDA0DD',
    PowderBlue: '#B0E0E6',
    Purple: '#800080',
    RebeccaPurple: '#663399',
    Red: '#FF0000',
    RosyBrown: '#BC8F8F',
    RoyalBlue: '#4169E1',
    SaddleBrown: '#8B4513',
    Salmon: '#FA8072',
    SandyBrown: '#F4A460',
    SeaGreen: '#2E8B57',
    SeaShell: '#FFF5EE',
    Sienna: '#A0522D',
    Silver: '#C0C0C0',
    SkyBlue: '#87CEEB',
    SlateBlue: '#6A5ACD',
    SlateGrey: '#708090',
    Snow: '#FFFAFA',
    SpringGreen: '#00FF7F',
    SteelBlue: '#4682B4',
    Tan: '#D2B48C',
    Teal: '#008080',
    Thistle: '#D8BFD8',
    Tomato: '#FF6347',
    Turquoise: '#40E0D0',
    Violet: '#EE82EE',
    Wheat: '#F5DEB3',
    White: '#FFFFFF',
    WhiteSmoke: '#F5F5F5',
    Yellow: '#FFFF00',
    YellowGreen: '#9ACD32',
};

const generateColors = (): string[] => {
    const output: string[] = [];

    for (const key in CSS_COLOR_NAMES) {
        const color = CSS_COLOR_NAMES[key];
        const contrast = chroma.contrast(color, '#000');
        
        if (contrast > 4.5)
            output.push(color);
    }

    return output;
};
