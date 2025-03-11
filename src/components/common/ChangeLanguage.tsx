import { Menu, ActionIcon, Tooltip } from '@mantine/core';
import { IconLanguage } from '@tabler/icons-react';
import { useTranslation } from "react-i18next";

function ChangeLanguage() {
    const { i18n } = useTranslation();

    return (
        <Menu shadow="md" width={200}>
            <Menu.Target>
                <Tooltip label="Languages">
                    <ActionIcon variant="light" aria-label="Settings">
                        <IconLanguage style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                </Tooltip>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>
                    Languages
                </Menu.Label>
                <Menu.Item onClick={() => i18n.changeLanguage('en')}>
                    English
                </Menu.Item>
                <Menu.Item onClick={() => i18n.changeLanguage('zh-TW')}>
                    Chinese
                </Menu.Item>
                <Menu.Item onClick={() => i18n.changeLanguage('jp')}>
                    Japanese
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}

export default ChangeLanguage
