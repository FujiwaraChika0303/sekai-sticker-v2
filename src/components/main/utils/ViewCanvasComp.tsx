import { Stage, Layer } from "react-konva";
import { CONFIGS, StickerObject } from "../../../utils/createSticker";
import AdjustableText from "../helper/AdjustableText";
import CanvasTransImage from "../helper/CanvasTransImage";
import { useRef } from "react";
import { Tooltip, ActionIcon, Container, UnstyledButton, Space, Group } from "@mantine/core";
import { IconDownload, IconCopyPlus } from "@tabler/icons-react";
import { copyImages } from "../../../utils/copyUtils";
import { timer, downloadFile, dataURLToBlob } from "../../../utils/downloadUtils";

type ViewCanvasCompProps = {
    stickerContent: StickerObject[];
    clickCb?: Function
}

function ViewCanvasComp({ stickerContent, clickCb }: ViewCanvasCompProps) {
    const stageRef = useRef<any>(null);

    return (
        <>
            <Container>
                <UnstyledButton onClick={() => {
                    !!clickCb && clickCb()
                }}>
                    <Stage
                        ref={stageRef}
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

                <Space h="sm" />

                <Group>
                    <Tooltip label="Download PNG">
                        <ActionIcon
                            variant="light"
                            onClick={async () => {
                                await timer(200);

                                const uri = stageRef.current!.toDataURL();
                                downloadFile(uri, `${new Date().getTime()}_stage.png`);
                            }}
                        >
                            <IconDownload
                                style={{ width: '70%', height: '70%' }}
                                stroke={1.5}
                            />
                        </ActionIcon>
                    </Tooltip>

                    <Tooltip label="Copy PNG to clipboard">
                        <ActionIcon
                            variant="light"
                            onClick={async () => {
                                await timer(200);

                                const blobImage = await dataURLToBlob(
                                    stageRef.current!.toDataURL()
                                )
                                copyImages(blobImage, "image/png")
                            }}
                        >
                            <IconCopyPlus
                                style={{ width: '70%', height: '70%' }}
                                stroke={1.5}
                            />
                        </ActionIcon>
                    </Tooltip>
                </Group>

            </Container>
        </>
    )
}

export default ViewCanvasComp
