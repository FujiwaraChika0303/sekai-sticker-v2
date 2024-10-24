import { Card, Box, Group } from '@mantine/core';
import { StickerObject } from '../../utils/createSticker';
import { Pagination } from '@mantine/core';

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
            <Box style={{ width: 340 }} >
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group justify="center">
                    <Pagination 
                        color="gray"
                        onChange={(ind) => {
                            const targetId = data.find( (_, i) => i === ind - 1 );
                            selectCb(targetId!.id)
                        }} 
                        total={data.length}
                    />
                </Group>
                </Card>
            </Box>
        </>
    )
}

export default SelectLayer
