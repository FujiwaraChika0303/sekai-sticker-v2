import { Menu, ActionIcon, Tooltip } from '@mantine/core';
import { IconLanguage } from '@tabler/icons-react';
import { useTranslation } from "react-i18next";
import { useLocalStorage } from '@mantine/hooks';
import { useEffect } from 'react';

function ChangeLanguage() {
    const { i18n } = useTranslation();
    const [language, setLanguage] = useLocalStorage({
        key: 'languages-sekai',
        defaultValue: 'en',
    });

    useEffect( () => {
        i18n.changeLanguage(language)
    },[language])

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
                <Menu.Item onClick={() => setLanguage('en')}>
                    English
                </Menu.Item>
                <Menu.Item onClick={() => setLanguage('zh-TW')}>
                    中文 (繁體)
                </Menu.Item>
                <Menu.Item onClick={() => setLanguage('ja')}>
                    日本語
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}

export default ChangeLanguage
