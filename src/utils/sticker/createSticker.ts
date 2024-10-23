import { uuid } from "../uuids"

export interface StickerObject {
    x: number
    y: number
    rotation?: number
    fill?: string  // color
    fontSize?: number
    width?: number
    height?: number
    letterSpacing?: number
    format: "text" | "image"
    id: string
    content: string
}

export function createText(text: string = "Hello"): StickerObject{
    return {
        x: 10,
        y: 10,
        fontSize: 32,
        rotation: 20,
        fill: 'red',
        format: "text",
        letterSpacing: 0,
        id: uuid(),
        content: text
    }
}

export function createImages(src: string = 'img/emu/Emu_13.png'): StickerObject{
    return {
        x: 150,
        y: 150,
        width: 250,
        height: 250,

        format: "image",
        content: src,
        id: uuid(),
    }
}