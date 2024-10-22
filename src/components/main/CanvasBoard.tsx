import { AppShell, Burger, Box, Card, Container, Group, Text, NavLink } from "@mantine/core";
import { Stage, Layer } from 'react-konva';
import { useEffect, useState } from "react";
import { useDisclosure } from '@mantine/hooks';

import AdjustableText from "./helper/AdjustableText";
import CanvasTransImage from "./helper/CanvasTransImage";
import { IconChevronRight, IconMessage } from "@tabler/icons-react";
import { StickerObject, createImages, createText } from "../../utils/sticker/createSticker";
import SelectCharactor from "./SelectCharactor";
import { uuid } from "../../utils/uuids";

const initialSticker: StickerObject[] = [
    {
        x: 10,
        y: 10,
        fontSize: 48,
        rotation: 20,
        fill: '#FF66BB',
        format: "text",
        id: uuid(),
        content: "Wonderhoy!"
    },
    {
        x: 70,
        y: 150,
        width: 250,
        height: 250,
        format: "image",
        content: 'img/emu/Emu_13.png',
        id: uuid(),
    },
];

function CanvasBoard() {

    const [opened, { toggle }] = useDisclosure();

    const [stickerContent, setStickerContent] = useState(initialSticker);
    const [selectedId, selectShape] = useState<string | null>(null);


    useEffect(() => {
        console.log(stickerContent);
    }, [stickerContent]);

    const checkDeselect = (e: any) => {
        // deselect when clicked on empty area
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            selectShape(null);
        }
    };

    function selectIndexHelper(id: string) {
        const items = stickerContent.slice();
        const item = items.find((v) => v.id === id);
        const index = items.findIndex((v) => v.id === id);
        items.splice(index, 1);
        items.push(item!);
        setStickerContent(items);

        selectShape(id);
    }

    function onChangeHelper(newAttrs: any, ind: number) {
        const rects = stickerContent.slice();
        rects[ind] = newAttrs;
        setStickerContent(rects);
        console.log("END");
    }

    return (
        <>

            <AppShell
                layout="alt"

                navbar={{ width: 230, breakpoint: 'sm', collapsed: { mobile: !opened } }}
                aside={{ width: 150, breakpoint: '1', collapsed: { desktop: false, mobile: true } }}
                padding="md"
            >
                <AppShell.Header>

                    <Group h="100%" px="md">
                        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />

                    </Group>
                </AppShell.Header>

                <AppShell.Navbar p="md">
                    <Group>
                        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                        <Text>Navbar</Text>

                        <NavLink
                            label={"Add Text"}
                            leftSection={<IconMessage size="1rem" />}
                            rightSection={
                                <IconChevronRight size="0.8rem" stroke={1.5} className="mantine-rotate-rtl" />
                            }
                            onClick={(e) => {
                                e.preventDefault()
                                setStickerContent([...stickerContent, createText()])
                            }}
                        />

                        <SelectCharactor
                            addStickerCb={(v) => {
                                console.log(v)
                                setStickerContent([...stickerContent, createImages(v.img)])
                            }}
                        />
                    </Group>


                </AppShell.Navbar>
                <AppShell.Main>
                    <Container fluid>
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

                                            {stickerContent.map((sticker, i) => {
                                                if (sticker.format === "image") {
                                                    return (
                                                        <CanvasTransImage
                                                            key={i}
                                                            shapeProps={sticker}
                                                            isSelected={sticker.id === selectedId}
                                                            onSelect={() => {
                                                                selectIndexHelper(sticker.id);
                                                            }}
                                                            onChange={(newAttrs: any) => onChangeHelper(newAttrs, i)}
                                                            url={sticker.content}
                                                        />)
                                                }

                                                return (
                                                    <AdjustableText
                                                        key={i}
                                                        shapeProps={sticker}
                                                        isSelected={sticker.id === selectedId}
                                                        onSelect={() => {
                                                            selectIndexHelper(sticker.id);
                                                        }}
                                                        onChange={(newAttrs: any) => onChangeHelper(newAttrs, i)}
                                                        content={sticker.content}
                                                    />
                                                )
                                            })}


                                        </Layer>

                                    </Stage>
                                </Card>
                            </Box>
                        </Group>
                    </Container>
                </AppShell.Main>

                <AppShell.Aside p="md">
                    Aside
                </AppShell.Aside>

            </AppShell>

        </>
    )
}

export default CanvasBoard
