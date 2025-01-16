
import { Tooltip, ActionIcon,Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconTrash } from '@tabler/icons-react';
import useHistoryStickerStore from '../../../store/historyStickerStore';

function RemoveAllHistory() {

    const clearAllStickerHistFunc = useHistoryStickerStore(state => state.clearAllStickerHist);

    const openRemoveAllStickerModal = () => modals.openConfirmModal({
        title: 'Confirm delete message',
        children: (
            <Text size="sm">
                Are you sure to delete all the saved sticker? This action can not be reverse.
            </Text>
        ),
        labels: { confirm: 'Confirm', cancel: 'Cancel' },
        onCancel: () => {},
        onConfirm: () => {
            clearAllStickerHistFunc();
        },
    });

    return (
        <Tooltip label="Remove All saved sticker">
            <ActionIcon
                variant="light"
                color="red"
                aria-label="Remove All saved sticker"
                onClick={() => openRemoveAllStickerModal()}
            >
                <IconTrash
                    style={{ width: '70%', height: '70%' }}
                    stroke={1.5}
                />
            </ActionIcon>
        </Tooltip>
    )
}

export default RemoveAllHistory
