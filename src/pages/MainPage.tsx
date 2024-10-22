import { Container } from "@mantine/core";

import { Stage, Layer } from 'react-konva';
import CanvasImages from "../components/main/CanvasImages";
import AdjustableText from "../components/main/AdjustableText";
import { useState } from "react";
import CanvasTransImage from "../components/main/CanvasTransImage";


const initialRectangles = [
    {
        x: 10,
        y: 10,
        width: 100,
        height: 100,
        fill: 'red',
        format: "text",
        id: 'rect1',
    },
    {
        x: 150,
        y: 150,
        width: 100,
        height: 100,
        fill: 'green',
        format: "images",
        id: 'rect2',
    },
    {
        x: 150,
        y: 150,
        width: 100,
        height: 100,
        fill: 'green',
        format: "images",
        id: 'rect3',
    },
];

function MainPage() {

    const [rectangles, setRectangles] = useState(initialRectangles);
    const [selectedId, selectShape] = useState<string | null>(null);

    const checkDeselect = (e: any) => {
        // deselect when clicked on empty area
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            selectShape(null);
        }
    };

    return (
        <Container fluid>
            <h1>Hello MainPage</h1>

            <Stage
                width={window.innerWidth}
                height={window.innerHeight}
                onMouseDown={checkDeselect}
                onTouchStart={checkDeselect}

            >
                <Layer>

                    {/* <Text text="Some text on canvas" fontSize={15} fontFamily="YurukaStd"  /> */}

                    {/* <CanvasImages url={'https://konvajs.github.io/assets/yoda.jpg'} draggable /> */}

                    {/* <CanvasImages url={'/img/an/An_01.png'} draggable /> */}

                    {/* <AdjustableText
                        content={"Hello world"}
                    /> */}

                    {rectangles.map((rect, i) => {
                        if (rect.format === "images") {
                            return (<CanvasTransImage
                                key={i}
                                shapeProps={rect}
                                isSelected={rect.id === selectedId}
                                onSelect={() => {
                                    selectShape(rect.id);
                                }}
                                onChange={(newAttrs: any) => {
                                    const rects = rectangles.slice();
                                    rects[i] = newAttrs;
                                    setRectangles(rects);
                                }}
                                url={'https://konvajs.github.io/assets/yoda.jpg'}
                            />)
                        }

                        return (
                            <AdjustableText
                                key={i}
                                shapeProps={rect}
                                isSelected={rect.id === selectedId}
                                onSelect={() => {
                                    selectShape(rect.id);
                                }}
                                onChange={(newAttrs: any) => {
                                    const rects = rectangles.slice();
                                    rects[i] = newAttrs;
                                    setRectangles(rects);
                                }}
                                content={'Hello'}
                            />
                        )
                    })}



                </Layer>

            </Stage>
        </Container>
    )
}

export default MainPage
