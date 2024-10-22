import { Box, Card, Container, Group } from "@mantine/core";

import { Stage, Layer } from 'react-konva';

import AdjustableText from "../components/main/AdjustableText";
import { useState } from "react";
import CanvasTransImage from "../components/main/CanvasTransImage";

const initialRectangles = [
    {
        x: 10,
        y: 10,
        fontSize: 48,
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

    function selectIndexHelper(id: string) {
        const items = rectangles.slice();
        const item = items.find((v) => v.id === id);
        const index = items.findIndex((v) => v.id === id);
        items.splice(index, 1);
        items.push(item!);
        setRectangles(items);

        selectShape(id);
    }

    return (
        <Container fluid>
            <h1>Hello MainPage</h1>
            <Group justify="center">

                <Box style={{ height: 500, width: 500 }} >
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Stage
                        width={500}
                        height={500}
                        onMouseDown={checkDeselect}
                        onTouchStart={checkDeselect}
                        
                    >
                        <Layer>

                            {rectangles.map((rect, i) => {
                                if (rect.format === "images") {
                                    return (<CanvasTransImage
                                        key={i}
                                        shapeProps={rect}
                                        isSelected={rect.id === selectedId}
                                        onSelect={() => {
                                            selectIndexHelper(rect.id);
                                        }}
                                        onChange={(newAttrs: any) => {
                                            const rects = rectangles.slice();
                                            rects[i] = newAttrs;
                                            setRectangles(rects);

                                            console.log("END");
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
                                            selectIndexHelper(rect.id);
                                        }}
                                        onChange={(newAttrs: any) => {
                                            const rects = rectangles.slice();
                                            rects[i] = newAttrs;
                                            setRectangles(rects);

                                            console.log("END");
                                        }}
                                        content={'Hello'}
                                    />
                                )
                            })}



                        </Layer>

                    </Stage>
                </Card>
                </Box>
            </Group>
        </Container>
    )
}

export default MainPage
