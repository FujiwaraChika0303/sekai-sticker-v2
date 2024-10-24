import { useRef, useState } from "react";
import { AppShell, Burger, Box, Card, Container, Group, Text, NavLink, TextInput, ColorInput, Button, ActionIcon, Tooltip, Space, Slider, Divider, ScrollArea } from "@mantine/core";
import { Stage, Layer } from 'react-konva';
import Konva from "konva";
import { useListState, useDisclosure } from '@mantine/hooks';

import AdjustableText from "./helper/AdjustableText";
import CanvasTransImage from "./helper/CanvasTransImage";
import { IconArrowDown, IconArrowUp, IconChevronRight, IconCopy, IconDeselect, IconImageInPicture, IconPictureInPictureOn, IconPlus, IconSticker, IconTrash } from "@tabler/icons-react";
import { CONFIGS, createExternalImages, createImages, createText, duplicateNewObject, StickerObject } from "../../utils/createSticker";
import SelectCharactor from "./SelectCharactor";

import { dataURLToBlob, downloadFile } from "../../utils/downloadUtils";
import { initialSticker } from "../../data/sticker";
import { KonvaEventObject } from "konva/lib/Node";
import { chatactorList } from "../../data/characters";
import ColorToggleBtn from "../common/ColorToggleBtn";
import { copyImages } from "../../utils/copyUtils";
import LearnMore from "../about/LearnMore";
import CreateExternalImages from "./helper/CreateExternalImages";
import { notifications } from "@mantine/notifications";
import CreateLocalImages from "./helper/CreateLocalImages";
import SelectLayer from "./SelectLayer";

function CanvasBoard() {

    const stageRef = useRef<any>(null);
    const [opened, { toggle, close }] = useDisclosure();

    const [stickerContent, stickerContentHandlers] = useListState<StickerObject>(initialSticker);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const selectedShape = stickerContent.find(v => v.id === selectedId);

    // Check deselect click
    function checkDeselect(e: Konva.KonvaEventObject<MouseEvent> | KonvaEventObject<TouchEvent, any>) {
        // clicked On Empty
        if (e.target === e.target.getStage()) {
            setSelectedId(null);
        }
    };

    // Add new attributes to specific list item
    function onChangeHelper(newAttrs: StickerObject, ind: number) {
        stickerContentHandlers.setItem(ind, newAttrs);
    }

    async function callBackImageURL(imageURL: string) {
        try {
            stickerContentHandlers.append(await createExternalImages(imageURL))
            close();
            notifications.show({
                title: "Success",
                message: "Success to import images"
            })
        }
        catch (error: any) {
            console.log(error);
            notifications.show({
                title: "Failed to Import",
                message: error.message
            })
        }
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
                        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" mt={12} mb={12} />
                    </Group>
                </AppShell.Header>

                <AppShell.Navbar p="md">

                    <AppShell.Section grow my="md" component={ScrollArea}>


                        <Group justify="space-between" >
                            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" mb={14} />
                        </Group>

                        <Text fz={14} fw={600} mb={12} ta="center">
                            🔧 Functions
                        </Text>

                        <Box>
                            <Text c="dimmed" fz={14} fw={400} mb={6}>
                                Text
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

                                    if (currentSticker.length >= 1) {
                                        const targetStickerInd = currentSticker.length - 1;

                                        const stickerInfo = chatactorList.find(v => v.img === currentSticker[targetStickerInd].content);
                                        defaultText = stickerInfo ? stickerInfo?.defaultText.text : "Hello"
                                        textColor = stickerInfo ? stickerInfo?.color : "red"
                                    }

                                    stickerContentHandlers.append(createText(defaultText, textColor))
                                    close();
                                }}
                            />

                            <Text c="dimmed" fz={14} fw={400} mb={6} mt={12}>
                                Images
                            </Text>

                            <Divider my="md" />

                            <SelectCharactor
                                openComp="NavLink"
                                title="Add Sticker"
                                addStickerCb={async (v) => {
                                    stickerContentHandlers.append(await createImages(v.img))
                                    close();
                                }}
                            />

                            <CreateLocalImages
                                title="Upload local Image"
                                callBackImageURL={(imageURL: string) => {
                                    callBackImageURL(imageURL)
                                }}
                            />

                            <CreateExternalImages
                                title="Upload URL Image"
                                callBackImageURL={(imageURL: string) => {
                                    callBackImageURL(imageURL)
                                }}
                            />

                        </Box>
                    </AppShell.Section>

                    <AppShell.Section>
                        <Group justify="space-between">
                            <ColorToggleBtn />

                            <Group>
                                <Text c="dimmed" fz={12}>
                                    📊 v0.1.0
                                </Text>

                                <LearnMore />
                            </Group>
                        </Group>
                    </AppShell.Section>

                </AppShell.Navbar>

                <AppShell.Main>
                    <Container fluid>

                        <Text fw={600} fz={32} ta="center" mt={48}>
                            <IconSticker /> Sekai Sticker V2
                        </Text>

                        <Text c="dimmed" mb={16} ta="center">
                            Generate your sticker in a better way!
                        </Text>

                        <Group justify="center" mb={24}>
                            <Button
                                variant="light"
                                leftSection={<IconImageInPicture size={16} />}
                                onClick={() => {
                                    const uri = stageRef.current!.toDataURL();
                                    // console.log(uri);
                                    downloadFile(uri, `${new Date().getTime()}_stage.png`);
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

                        <Group justify="center" mb={12}>
                            <Box style={{ height: 340, width: 340 }} >
                                <Card shadow="sm" padding="lg" radius="md" withBorder>
                                    <Stage
                                        ref={stageRef}
                                        width={CONFIGS.stageWidth}
                                        height={CONFIGS.stageHeight}
                                        onMouseDown={checkDeselect}
                                        onTouchStart={checkDeselect}
                                    >
                                        <Layer>

                                            {stickerContent.map((sticker, i) => {
                                                if (
                                                    sticker.format === "image"
                                                    || sticker.format === "externalImage"
                                                ) {
                                                    return (
                                                        <CanvasTransImage
                                                            key={sticker.id}
                                                            shapeProps={sticker}
                                                            isSelected={sticker.id === selectedId}
                                                            onSelect={() => {
                                                                setSelectedId(sticker.id);
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
                                                            setSelectedId(sticker.id);
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

                        <Group justify="center" mb={12}>
                            <Box style={{ width: 340 }} >
                                <Card shadow="sm" padding="lg" radius="md" withBorder mt={12}>
                                    <Group justify="space-between" >
                                        <Group>
                                            <Tooltip label="Up Layer">
                                                <ActionIcon
                                                    variant="light"
                                                    color="blue"
                                                    aria-label="Up Layer"
                                                    disabled={selectedShape === undefined}
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
                                                    disabled={selectedShape === undefined}
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

                                        <Tooltip label="Deselect">
                                            <ActionIcon
                                                variant="light"
                                                color="blue"
                                                aria-label="Deselect"
                                                disabled={selectedShape === undefined}
                                                onClick={() => {
                                                    setSelectedId(null)
                                                }}
                                            >
                                                <IconDeselect
                                                    style={{ width: '70%', height: '70%' }}
                                                    stroke={1.5}
                                                />
                                            </ActionIcon>
                                        </Tooltip>

                                        <Group>
                                            <Tooltip label="Duplicate">
                                                <ActionIcon
                                                    variant="light"
                                                    color="blue"
                                                    aria-label="Duplicate"
                                                    disabled={selectedShape === undefined}
                                                    onClick={() => {
                                                        if (selectedShape === undefined) {
                                                            return
                                                        }
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
                                                    disabled={selectedShape === undefined}
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
                            </Box>
                        </Group>

                        <Group justify="center">
                            <SelectLayer
                                data={stickerContent}
                                selectCb={(id) => setSelectedId(id)}
                            />
                        </Group>

                        <Box>
                            {selectedShape !== undefined && (
                                <Group justify="center" mb={12}>
                                    <Box style={{ width: 340 }} >
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

                                                            for (let i = 0; i < stickerContent.length; i++) {
                                                                if (stickerContent[i].format === "text") {
                                                                    stickerContentHandlers.setItemProp(i, "fill", v.color);
                                                                }
                                                            }
                                                        }}
                                                    />
                                                </>
                                            )}

                                            <Text fw={500} fz={14} mt={20}>
                                                Position X
                                            </Text>
                                            <Slider
                                                mt={2}
                                                color="blue"
                                                value={selectedShape.x}
                                                step={1}
                                                max={250}
                                                min={-250}
                                                onChange={(value) => {
                                                    const ind = stickerContent.findIndex(v => v.id === selectedId);
                                                    stickerContentHandlers.setItemProp(ind, "x", value);
                                                }}
                                            />

                                            <Text fw={500} fz={14} mt={20}>
                                                Position Y
                                            </Text>
                                            <Slider
                                                mt={2}
                                                color="blue"
                                                value={selectedShape.y}
                                                step={1}
                                                max={250}
                                                min={-250}
                                                onChange={(value) => {
                                                    const ind = stickerContent.findIndex(v => v.id === selectedId);
                                                    stickerContentHandlers.setItemProp(ind, "y", value);
                                                }}
                                            />

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

                                                    <Text fw={500} fz={14} mt={20}>
                                                        Font Size
                                                    </Text>
                                                    <Slider
                                                        step={1}
                                                        max={100}
                                                        min={0}
                                                        value={selectedShape.fontSize}
                                                        onChange={(value) => {
                                                            const ind = stickerContent.findIndex(v => v.id === selectedId);
                                                            stickerContentHandlers.setItemProp(ind, "fontSize", +value);
                                                        }}
                                                    />

                                                    <Text fw={500} fz={14} mt={20}>
                                                        Letter Spacing
                                                    </Text>
                                                    <Slider
                                                        mt={2}
                                                        color="blue"
                                                        value={selectedShape.letterSpacing}
                                                        step={0.1}
                                                        max={20}
                                                        min={-20}
                                                        onChange={(value) => {
                                                            const ind = stickerContent.findIndex(v => v.id === selectedId);
                                                            stickerContentHandlers.setItemProp(ind, "letterSpacing", value);
                                                        }}
                                                    />

                                                    <Text fw={500} fz={14} mt={20}>
                                                        Stroke Width
                                                    </Text>
                                                    <Slider
                                                        mt={2}
                                                        color="blue"
                                                        value={selectedShape.strokeWidth}
                                                        step={0.1}
                                                        max={80}
                                                        min={0}
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


                                        </Card>
                                    </Box>
                                </Group>
                            )}
                        </Box>
                    </Container>
                </AppShell.Main>

            </AppShell >

        </>
    )
}

export default CanvasBoard
