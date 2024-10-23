import { uuid } from "../uuids"

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
    format: "text" | "image"
    id: string
    content: string
}

export function createText(text: string = "Hello", color: string = "red"): StickerObject{
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

export function createImages(src: string = 'img/Ichika/Ichika_09.png'): StickerObject{
    return {
        x: 28,
        y: 40,
        width: 220,
        height: 220,

        format: "image",
        content: src,
        id: uuid(),
    }
}

export function duplicateNewObject(sticker: StickerObject): StickerObject{
    return {
        ...sticker,
        x: sticker.x - 10,
        y: sticker.y - 10,
        id: uuid(),
    }
}