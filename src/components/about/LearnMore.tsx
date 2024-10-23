import { useDisclosure } from '@mantine/hooks';
import { Modal, ActionIcon, Tooltip } from '@mantine/core';
import { IconNotebook } from '@tabler/icons-react';
import LearnMoreContent from './LearnMoreContent';

function LearnMore() {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Modal opened={opened} onClose={close} title="📝 General Informations" size="85%">
                <LearnMoreContent />
            </Modal>

            <Tooltip label="General Informations">
                <ActionIcon variant="light" aria-label="General Informations" onClick={open}>
                    <IconNotebook style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
            </Tooltip>
        </>
    );
}

export default LearnMore
