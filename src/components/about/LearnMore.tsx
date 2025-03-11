import { useDisclosure } from '@mantine/hooks';
import { Modal, ActionIcon, Tooltip, Group, Text } from '@mantine/core';
import { IconNotebook } from '@tabler/icons-react';
import LearnMoreContent from './LearnMoreContent';

function LearnMore() {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Modal opened={opened} onClose={close} title="📝 General Informations" size="85%">
                <LearnMoreContent />
            </Modal>

            <Group>
                <Text c="dimmed" fz={12}>
                    📊 v1.1.0
                </Text>

                <Tooltip label="General Informations">
                    <ActionIcon variant="light" aria-label="General Informations" onClick={open}>
                        <IconNotebook style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                </Tooltip>

            </Group>
        </>
    );
}

export default LearnMore
