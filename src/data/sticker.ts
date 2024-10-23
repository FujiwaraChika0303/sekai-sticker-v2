import { StickerObject } from "../utils/sticker/createSticker";
import { uuid } from "../utils/uuids";

export const initialSticker: StickerObject[] = [
    {
        x: 28,
        y: 40,
        width: 230,
        height: 230,
        format: "image",
        content: 'img/emu/Emu_13.png',
        id: uuid(),
    },
    {
        x: 10,
        y: 10,
        fontSize: 32,
        rotation: 20,
        fill: '#FF66BB',
        format: "text",
        letterSpacing: -1,
        strokeWidth: 7,
        stroke: "#ffffff",
        id: uuid(),
        content: "Wonderhoy!"
    },
];