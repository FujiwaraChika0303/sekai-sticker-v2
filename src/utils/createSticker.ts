import { getImagesWidthAndHeight } from "./imagesUtils"
import { uuid } from "./uuids"

export interface StickerObject {
    x: number
    y: number
    rotation?: number
    fill?: string    // color
    stroke?: string  // color
    fontSize?: number
    width?: number
    height?: number
    strokeWidth?: number
    letterSpacing?: number
    format: "text" | "image" | "externalImage"
    id: string
    content: string
}

export function createText(
    text: string = "Hello",
    color: string = "#50668f"
): StickerObject {

    return {
        x: 10,
        y: 10,
        fontSize: 32,
        rotation: 20,
        fill: color,
        stroke: "#ffffff",
        letterSpacing: 0,
        strokeWidth: 6,
        format: "text",
        id: uuid(),
        content: text
    }
}

// URL images or Local images
export async function createExternalImages(
    src: string = 'img/Ichika/Ichika_09.png'
): Promise<StickerObject> {
    await fetch(src);

    let { w, h } = await getImagesWidthAndHeight(src);

    while(w >= 300 || h >= 300){
        w = w / 3
        h = h / 3
    }

    return {
        x: 28,
        y: 40,
        width: w,
        height: h,

        format: "externalImage",
        content: src,
        id: uuid(),
    }
}

// Sticker
export async function createImages(
    src: string = 'img/Ichika/Ichika_09.png',
): Promise<StickerObject> {

    let { w, h } = await getImagesWidthAndHeight(src);

    return {
        x: 28,
        y: 40,
        width: w,
        height: h,

        format: "image",
        content: src,
        id: uuid(),
    }
}

// Sticker
export function createImagesInit(
    src: string = 'img/Ichika/Ichika_09.png',
    w: number,
    h: number
): StickerObject {

    return {
        x: 28,
        y: 40,
        width: w,
        height: h,

        format: "image",
        content: src,
        id: uuid(),
    }
}

export function duplicateNewObject(
    sticker: StickerObject
): StickerObject {
    return {
        ...sticker,
        x: sticker.x - 10,
        y: sticker.y - 10,
        id: uuid(),
    }
}