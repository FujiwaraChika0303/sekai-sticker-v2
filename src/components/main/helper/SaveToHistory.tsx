import { Tooltip, ActionIcon } from "@mantine/core";
import { IconDeviceFloppy } from "@tabler/icons-react";
import useHistoryStickerStore from "../../../store/historyStickerStore";
import useCurrentStickerStore from "../../../store/currenStickerStore";
import { notifications } from "@mantine/notifications";

function SaveToHistory() {

    const currentSticker = useCurrentStickerStore(state => state.sticker)
    const saveStickerFunc = useHistoryStickerStore(state => state.addStickerHist);

    function addStickerToHist() {
        saveStickerFunc(currentSticker);

        notifications.show({
            title: "Success",
            color: "green",
            message: "Current Sticker saved to history",
        });
    }

    return (
        <Tooltip label="Save To History (External / Internal images will not be saved)">
            <ActionIcon
                variant="light"
                color="blue"
                aria-label="Save To History (External / Internal images will not be saved)"
                onClick={() => addStickerToHist()}
            >
                <IconDeviceFloppy
                    style={{ width: '70%', height: '70%' }}
                    stroke={1.5}
                />
            </ActionIcon>
        </Tooltip>
    )
}

export default SaveToHistory
