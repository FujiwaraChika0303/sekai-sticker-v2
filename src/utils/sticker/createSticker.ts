import { uuid } from "../uuids"

export interface StickerObject {
    x: number
    y: number
    rotation?: number
    fill?: string
    fontSize?: number
    width?: number
    height?: number
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
        id: uuid(),
        content: text
    }
}

export function createImages(src: string = 'https://konvajs.github.io/assets/yoda.jpg'): StickerObject{
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