import { useDisclosure } from '@mantine/hooks';
import { Drawer, Grid, NavLink, ScrollArea, Button, Box, UnstyledButton, Group, Text } from '@mantine/core';
import { IconAdjustments, IconChevronRight, IconSticker } from '@tabler/icons-react';
import useHistoryStickerStore from '../../store/historyStickerStore';
import { Stage, Layer } from 'react-konva';
import { CONFIGS, StickerObject } from '../../utils/createSticker';
import AdjustableText from './helper/AdjustableText';
import CanvasTransImage from './helper/CanvasTransImage';
import { notifications } from '@mantine/notifications';
import RemoveOneToHistory from './helper/RemoveOneToHistory';

interface SelectHistoryStickerProps {
    title?: string
    openComp?: "NavLink" | "Button"
    setStickerCb: (sticker: StickerObject[]) => void
}

function SelectHistorySticker({
    title = "View Saved",
    openComp = "NavLink",
    setStickerCb
}: SelectHistoryStickerProps) {

    const [opened, { open, close }] = useDisclosure(false);
    const histStickerArray = useHistoryStickerStore(state => state.histStickerArray);
    // const clearOneStickerHistFunc = useHistoryStickerStore(state => state.clearOneStickerHist);

    function selectAndClose(ind: number) {
        setStickerCb(histStickerArray[ind]);
        close();

        notifications.show({
            title: "Sticker loaded",
            message: "The saved sticker is loaded to your board.",
        });
    }

    return (
        <>
            <Drawer
                offset={8}
                radius="md"
                opened={opened}
                onClose={close}
                title={title}
                position="bottom"
                size="65%"
            >

                <ScrollArea h={440} >
                    {histStickerArray.length <= 0 && (
                        <Box>
                            <Text c="dimmed" ta="center" mt={160}>
                                You have no saved sticker in history
                            </Text>
                        </Box>
                    )}

                    <Grid>
                        {histStickerArray.map((stickerContent, ind) => (
                            <Box style={{ minWidth: CONFIGS.stageWidth, minHeight: CONFIGS.stageHeight + 60 }} key={ind}>

                                <Group justify='flex-end' mt={12}>
                                    <RemoveOneToHistory ind={ind} />
                                </Group>

                                <UnstyledButton onClick={() => selectAndClose(ind)} >
                                    <Stage
                                        width={CONFIGS.stageWidth}
                                        height={CONFIGS.stageHeight}
                                    >
                                        <Layer>
                                            {stickerContent.map((sticker) => {
                                                if (
                                                    sticker.format === "image"
                                                    || sticker.format === "externalImage"
                                                ) {
                                                    return (
                                                        <CanvasTransImage
                                                            key={sticker.id}
                                                            shapeProps={sticker}
                                                            isSelected={false}
                                                            onSelect={() => { }}
                                                            onChange={() => { }}
                                                            url={sticker.content}
                                                            draggable={false}
                                                        />
                                                    )
                                                }

                                                return (
                                                    <AdjustableText
                                                        key={sticker.id}
                                                        shapeProps={sticker}
                                                        isSelected={false}
                                                        onSelect={() => {

                                                        }}
                                                        onChange={() => { }}
                                                        content={sticker.content}
                                                        draggable={false}
                                                    />
                                                )
                                            })}

                                        </Layer>

                                    </Stage>
                                </UnstyledButton>
                            </Box>

                        ))}
                    </Grid>
                </ScrollArea>

            </Drawer>

            {openComp === "NavLink" && (
                <NavLink
                    label={title}
                    leftSection={<IconSticker size="1rem" />}
                    rightSection={
                        <IconChevronRight size="0.8rem" stroke={1.5} className="mantine-rotate-rtl" />
                    }
                    onClick={(e) => {
                        e.preventDefault()
                        open()
                    }}
                />
            )}

            {openComp === "Button" && (
                <Button leftSection={<IconAdjustments />} variant="light" onClick={() => open()}>
                    View Saved
                </Button>
            )}
        </>
    )
}

export default SelectHistorySticker
