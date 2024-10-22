import { useEffect, useRef, useState } from "react";
import { AppShell, Burger, Box, Card, Container, Group, Text, NavLink, TextInput, ColorInput, Button, ActionIcon, Tooltip, Space } from "@mantine/core";
import { Stage, Layer } from 'react-konva';
import { useListState, useDisclosure } from '@mantine/hooks';

import AdjustableText from "./helper/AdjustableText";
import CanvasTransImage from "./helper/CanvasTransImage";
import { IconChevronRight, IconImageInPicture, IconMessage, IconTrash } from "@tabler/icons-react";
import { StickerObject, createImages, createText } from "../../utils/sticker/createSticker";
import SelectCharactor from "./SelectCharactor";
import { uuid } from "../../utils/uuids";
import { downloadFile } from "../../utils/downloadUtils";

const initialSticker: StickerObject[] = [
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
        id: uuid(),
        content: "Wonderhoy!"
    },
];

function CanvasBoard() {

    const stageRef = useRef<any>(null);
    const [opened, { toggle }] = useDisclosure();

    const [stickerContent, stickerContentHandlers] = useListState(initialSticker);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const selectedShape = stickerContent.find(v => v.id === selectedId);

    useEffect(() => {
        console.log(stickerContent);
    }, [stickerContent]);

    const checkDeselect = (e: any) => {
        // deselect when clicked on empty area
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            setSelectedId(null);
        }
    };

    function selectIndexHelper(id: string) {
        const index = stickerContent.findIndex((v) => v.id === id);
        stickerContentHandlers.reorder({ from: index, to: stickerContent.length - 1 })

        setSelectedId(id);
    }

    function onChangeHelper(newAttrs: any, ind: number) {
        const rects = stickerContent.slice();
        rects[ind] = newAttrs;
        stickerContentHandlers.setState(rects);
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
                                stickerContentHandlers.append(createText())
                            }}
                        />

                        <SelectCharactor
                            addStickerCb={(v) => {
                                console.log(v)
                                stickerContentHandlers.append(createImages(v.img))
                            }}
                        />
                    </Group>


                </AppShell.Navbar>
                <AppShell.Main>
                    <Container fluid>

                        <Group justify="center" mb={12}>
                            <Box style={{ height: 300, width: 300 }} >
                                <Card shadow="sm" padding="lg" radius="md" withBorder>
                                    <Stage
                                        ref={stageRef}
                                        width={300}
                                        height={300}
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
                                                        />
                                                    )
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

                        <Group justify="center" mt={60}>
                            <Button
                                variant="light"
                                leftSection={<IconImageInPicture size={16} />}
                                onClick={() => {
                                    const uri = stageRef.current!.toDataURL();
                                    downloadFile(uri, 'stage.png');
                                }}
                            >
                                Download Png
                            </Button>
                        </Group>

                        <Box>
                            {selectedShape !== undefined && (
                                <Card shadow="sm" padding="lg" radius="md" withBorder mt={12}>
                                    <Text c="dimmed">
                                        Modify Elements
                                    </Text>

                                    {selectedShape.format === "image" && (
                                        <>
                                            <Space h="md" />
                                            <SelectCharactor
                                                openComp="Button"
                                                title="Change Charactor"
                                                addStickerCb={(v) => {
                                                    const ind = stickerContent.findIndex(v => v.id === selectedId);
                                                    stickerContentHandlers.setItemProp(ind, "content", v.img);
                                                }}
                                            />
                                        </>
                                    )}

                                    {selectedShape.format === "text" && (
                                        <>
                                            <TextInput
                                                mt={12}
                                                label="Text content"
                                                placeholder="Input placeholder"
                                                value={selectedShape.content}
                                                onChange={(event) => {
                                                    const newText = event.currentTarget.value;
                                                    const ind = stickerContent.findIndex(v => v.id === selectedId);
                                                    stickerContentHandlers.setItemProp(ind, "content", newText);
                                                }}
                                            />

                                            <ColorInput
                                                mt={12}
                                                label="Color"
                                                placeholder="Input placeholder"
                                                value={selectedShape.fill}
                                                onChange={(colorStr) => {
                                                    const ind = stickerContent.findIndex(v => v.id === selectedId);
                                                    stickerContentHandlers.setItemProp(ind, "fill", colorStr);
                                                }}
                                            />
                                        </>
                                    )}

                                    <Group justify="flex-end" mt={18}>
                                        <Tooltip label="Delete This">
                                            <ActionIcon
                                                variant="light"
                                                color="red"
                                                aria-label="Trash"
                                                onClick={() => {
                                                    setSelectedId(null);

                                                    stickerContentHandlers.remove(
                                                        stickerContent.findIndex(v => v.id === selectedId)
                                                    );

                                                }}
                                            >
                                                <IconTrash
                                                    style={{ width: '70%', height: '70%' }}
                                                    stroke={1.5}
                                                />
                                            </ActionIcon>
                                        </Tooltip>
                                    </Group>


                                </Card>
                            )}
                        </Box>
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
