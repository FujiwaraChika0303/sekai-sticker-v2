import { useRef, useState } from "react";
import { AppShell, Burger, Box, Card, Container, Group, Text, NavLink, TextInput, ColorInput, Button, ActionIcon, Tooltip, Space, Slider, Divider } from "@mantine/core";
import { Stage, Layer } from 'react-konva';
import Konva from "konva";
import { useListState, useDisclosure } from '@mantine/hooks';

import AdjustableText from "./helper/AdjustableText";
import CanvasTransImage from "./helper/CanvasTransImage";
import { IconArrowDown, IconArrowUp, IconChevronRight, IconCopy, IconImageInPicture, IconPictureInPictureOn, IconPlus, IconSticker, IconTrash } from "@tabler/icons-react";
import { createImages, createText, duplicateNewObject, StickerObject } from "../../utils/sticker/createSticker";
import SelectCharactor from "./SelectCharactor";

import { dataURLToBlob, downloadFile } from "../../utils/downloadUtils";
import { initialSticker } from "../../data/sticker";
import { KonvaEventObject } from "konva/lib/Node";
import { chatactorList } from "../../data/characters";
import ColorToggleBtn from "../common/ColorToggleBtn";
import { copyImages } from "../../utils/copyUtils";

export const LOCAL_STORAGE_KEY = 'sekaiObject'

function CanvasBoard() {

    const stageRef = useRef<any>(null);
    const [opened, { toggle, close }] = useDisclosure();

    const [stickerContent, stickerContentHandlers] = useListState<StickerObject>(initialSticker);
    // const [ isInit, setIsInit ] = useState<boolean>(true);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const selectedShape = stickerContent.find(v => v.id === selectedId);

    // useEffect(() => {
    //     const storedValue = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    //     if (storedValue) {
    //         try {
    //             stickerContentHandlers.setState(
    //                 JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY)!)
    //             );

    //             setIsInit(false);
    //         } 
    //         catch (e) {
    //             console.log('Failed to parse stored value');
    //         }
    //     }
    // }, []);

    // useEffect(() => {
    //     if(!isInit){
    //         window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stickerContent))
    //     }
    // }, [stickerContent]);

    // Check deselect click
    function checkDeselect(e: Konva.KonvaEventObject<MouseEvent> | KonvaEventObject<TouchEvent, any>) {
        // clicked On Empty
        if (e.target === e.target.getStage()) {
            setSelectedId(null);
        }
    };

    // Move layer to front
    function selectIndexHelper(id: string) {
        const index = stickerContent.findIndex((v) => v.id === id);
        stickerContentHandlers.reorder({ from: index, to: stickerContent.length - 1 })
        setSelectedId(id);
    }

    // Add new attributes to specific list item
    function onChangeHelper(newAttrs: StickerObject, ind: number) {
        stickerContentHandlers.setItem(ind, newAttrs);
    }

    return (
        <>
            <AppShell
                layout="alt"
                navbar={{ width: 230, breakpoint: 'sm', collapsed: { mobile: !opened } }}
                // aside={{ width: 150, breakpoint: '1', collapsed: { desktop: false, mobile: true } }}
                padding="md"
            >
                <AppShell.Header>
                    <Group h="100%" px="md">
                        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                    </Group>
                </AppShell.Header>

                <AppShell.Navbar p="md">

                    <Group justify="space-between" mb={14}>
                        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                        <ColorToggleBtn />
                    </Group>

                    <Box>
                        <Text c="dimmed" fz={14} fw={400} mb={6}>
                            Utils
                        </Text>

                        <Divider my="md" />

                        <NavLink
                            label={"Add Text"}
                            leftSection={<IconPlus size="1rem" />}
                            rightSection={
                                <IconChevronRight size="0.8rem" stroke={1.5} className="mantine-rotate-rtl" />
                            }
                            onClick={(e) => {
                                e.preventDefault();

                                const currentSticker = stickerContent.filter(v => v.format === "image");
                                let [defaultText, textColor] = ["Hello", "red"];

                                if (currentSticker[0]) {
                                    const stickerInfo = chatactorList.find(v => v.img === currentSticker[0].content);
                                    defaultText = stickerInfo ? stickerInfo?.defaultText.text : "Hello"
                                    textColor = stickerInfo ? stickerInfo?.color : "red"
                                }

                                stickerContentHandlers.append(createText(defaultText, textColor))
                                close();
                            }}
                        />

                        <SelectCharactor
                            openComp="NavLink"
                            title="Add Charactor"
                            addStickerCb={(v) => {
                                stickerContentHandlers.append(createImages(v.img))
                                close();
                            }}
                        />
                    </Box>


                </AppShell.Navbar>
                <AppShell.Main>
                    <Container fluid>

                        <Text fw={600} fz={32} ta="center" mt={18}>
                            <IconSticker /> Sekai Sticker V2
                        </Text>

                        <Text c="dimmed" mb={16} ta="center">
                            Generate your sticker in a better way!
                        </Text>

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
                                                            key={sticker.id}
                                                            shapeProps={sticker}
                                                            isSelected={sticker.id === selectedId}
                                                            onSelect={() => {
                                                                selectIndexHelper(sticker.id);
                                                            }}
                                                            onChange={(newAttrs: StickerObject) => onChangeHelper(newAttrs, i)}
                                                            url={sticker.content}
                                                        />
                                                    )
                                                }

                                                return (
                                                    <AdjustableText
                                                        key={sticker.id}
                                                        shapeProps={sticker}
                                                        isSelected={sticker.id === selectedId}
                                                        onSelect={() => {
                                                            selectIndexHelper(sticker.id);
                                                        }}
                                                        onChange={(newAttrs: StickerObject) => onChangeHelper(newAttrs, i)}
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
                                    console.log(uri);
                                    downloadFile(uri, 'stage.png');
                                }}
                            >
                                Download PNG
                            </Button>

                            <Button
                                variant="light"
                                onClick={async () => {
                                    const blobImage = await dataURLToBlob(
                                        stageRef.current!.toDataURL()
                                    )
                                    copyImages(blobImage, "image/png")
                                }}
                                leftSection={<IconPictureInPictureOn size={16} />}
                            >
                                Copy PNG
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

                                            <Text fw={500} fz={14} mt={12}>
                                                Letter Spacing
                                            </Text>
                                            <Slider
                                                color="blue"
                                                value={selectedShape.letterSpacing}
                                                step={0.1}
                                                max={10}
                                                min={-10}
                                                onChange={(value) => {
                                                    const ind = stickerContent.findIndex(v => v.id === selectedId);
                                                    stickerContentHandlers.setItemProp(ind, "letterSpacing", value);
                                                }}
                                            />

                                            <Text fw={500} fz={14} mt={12}>
                                                Stroke Width
                                            </Text>
                                            <Slider
                                                color="blue"
                                                value={selectedShape.strokeWidth}
                                                step={0.1}
                                                max={30}
                                                min={-30}
                                                onChange={(value) => {
                                                    const ind = stickerContent.findIndex(v => v.id === selectedId);
                                                    stickerContentHandlers.setItemProp(ind, "strokeWidth", value);
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

                                    <Group justify="space-between" mt={18}>
                                        <Group>
                                            <Tooltip label="Up Layer">
                                                <ActionIcon
                                                    variant="light"
                                                    color="blue"
                                                    aria-label="Up Layer"
                                                    onClick={() => {
                                                        const ind = stickerContent.findIndex(v => v.id === selectedId);

                                                        if (ind <= -1) {
                                                            return
                                                        }

                                                        stickerContentHandlers.reorder({
                                                            from: ind,
                                                            to: Math.min(ind + 1, stickerContent.length - 1)
                                                        })
                                                    }}
                                                >
                                                    <IconArrowUp
                                                        style={{ width: '70%', height: '70%' }}
                                                        stroke={1.5}
                                                    />
                                                </ActionIcon>
                                            </Tooltip>

                                            <Tooltip label="Down Layer">
                                                <ActionIcon
                                                    variant="light"
                                                    color="blue"
                                                    aria-label="Down Layer"
                                                    onClick={() => {
                                                        const ind = stickerContent.findIndex(v => v.id === selectedId);

                                                        if (ind <= -1) {
                                                            return
                                                        }

                                                        stickerContentHandlers.reorder({
                                                            from: ind,
                                                            to: Math.max(ind - 1, 0)
                                                        })
                                                    }}
                                                >
                                                    <IconArrowDown
                                                        style={{ width: '70%', height: '70%' }}
                                                        stroke={1.5}
                                                    />
                                                </ActionIcon>
                                            </Tooltip>
                                        </Group>

                                        <Group>
                                            <Tooltip label="Duplicate">
                                                <ActionIcon
                                                    variant="light"
                                                    color="blue"
                                                    aria-label="Duplicate"
                                                    onClick={() => {
                                                        const newSticker = duplicateNewObject(selectedShape);
                                                        stickerContentHandlers.append(newSticker)
                                                    }}
                                                >
                                                    <IconCopy
                                                        style={{ width: '70%', height: '70%' }}
                                                        stroke={1.5}
                                                    />
                                                </ActionIcon>
                                            </Tooltip>

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

                                    </Group>


                                </Card>
                            )}
                        </Box>
                    </Container>
                </AppShell.Main>

                {/* <AppShell.Aside p="md">
                    Aside
                </AppShell.Aside> */}

            </AppShell>

        </>
    )
}

export default CanvasBoard
