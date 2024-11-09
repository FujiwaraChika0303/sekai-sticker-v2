import { Card, Group, Tooltip, Text } from '@mantine/core';
import { StickerObject } from '../../utils/createSticker';
import { Pagination } from '@mantine/core';
import { IconLayersDifference } from '@tabler/icons-react';

type SelectLayerProps = {
    data: StickerObject[];
    selectCb: (id: string) => void
}

function SelectLayer({
    data,
    selectCb
}: SelectLayerProps) {
    return (
        <>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group justify="center">
                    <Text ta="center">
                        <IconLayersDifference size={16} /> Layer Select
                    </Text>

                    <Tooltip label="Select Layer">
                        <Pagination
                            color="gray"
                            onChange={(ind) => {
                                const targetId = data.find((_, i) => i === ind - 1);
                                selectCb(targetId!.id)
                            }}
                            total={data.length}
                        />
                    </Tooltip>
                </Group>
            </Card>
        </>
    )
}

export default SelectLayer
