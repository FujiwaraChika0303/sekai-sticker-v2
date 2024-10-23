import { createImages, createText, StickerObject } from "../utils/createSticker";

export const initialSticker: StickerObject[] = [
    await createImages('img/Ichika/Ichika_09.png'),
    createText("Wonderhoy", "#50668f"),
];