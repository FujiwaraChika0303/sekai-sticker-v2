import { useDisclosure } from '@mantine/hooks';
import { Drawer, Grid, NavLink, UnstyledButton, ScrollArea, Button, Box, Tooltip, Text, MultiSelect } from '@mantine/core';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { IconAdjustments, IconChevronRight, IconSticker } from '@tabler/icons-react';
import { StickerChatactor, chatactorList } from '../../data/characters';
import { useEffect, useState } from 'react';

import { uniqueBy, prop } from "remeda"
import { capitalizeFirstLetter } from '../../utils/createSticker';
import { useTranslation } from 'react-i18next';

interface SelectCharactorProps {
    title?: string
    openComp?: "NavLink" | "Button"
    addStickerCb: (sticker: StickerChatactor) => void
}

function SelectCharactor({
    title = "Add Charactor",
    openComp = "NavLink",
    addStickerCb
}: SelectCharactorProps) {

    const { t } = useTranslation();

    const [filledList, setFilledList] = useState<StickerChatactor[]>([]);
    const [searchString, setSearchString] = useState<string[]>([]);
    const [opened, { open, close }] = useDisclosure(false);

    useEffect(() => {

        if (searchString.length <= 0) {
            setFilledList([]);
            return
        }

        const searchLs = []
        for (let target of searchString) {
            searchLs.push(
                ...chatactorList.filter(v => v.character.toLowerCase() === target.toLowerCase())
            )
        }

        setFilledList(searchLs.reverse())
    }, [searchString])

    function selectAndClose(sticker: StickerChatactor) {
        addStickerCb(sticker);
        close();
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
                <MultiSelect
                    value={searchString}
                    onChange={setSearchString}
                    placeholder={t("Select Charactor")}
                    mb={6}
                    data={uniqueBy(chatactorList, prop("character")).map(v => ({
                        value: v.character,
                        label: capitalizeFirstLetter(v.character)
                    }))}
                />

                <Grid>
                    <Grid.Col span={{ base: 2, md: 2, lg: 2 }}>
                        <ScrollArea h={440}>
                            {uniqueBy(chatactorList, prop("character")).map(v =>
                                <Box key={v.img}>
                                    <UnstyledButton
                                        onClick={() => 
                                            setSearchString(currentLs => {
                                                // Remove Sticker from search
                                                if(currentLs.includes(v.character)){
                                                    return currentLs.filter( key => key !== v.character)
                                                }

                                                // Add Sticker to search
                                                return [...currentLs, v.character]
                                            })
                                        }
                                        mb={14}
                                    >
                                        <Text c="dimmed" fz={14}>
                                            {capitalizeFirstLetter(v.character)}
                                        </Text>
                                        <LazyLoadImage
                                            src={`${v.img}`}
                                            width="100%"
                                            height="100%"
                                            effect="blur"
                                        />
                                    </UnstyledButton>
                                </Box>
                            )}
                        </ScrollArea>
                    </Grid.Col>

                    <Grid.Col span={{ base: 10, md: 10, lg: 10 }}>
                        <ScrollArea h={440}>
                            {filledList.length <= 0 && (
                                <Text c="dimmed" ta="center" mt={180}>
                                    {t("Select Your Sticker Character")}
                                </Text>
                            )}

                            <Grid>
                                {filledList.map(v =>
                                    <Grid.Col span={{ base: 3, md: 2, lg: 1 }} key={v.img}>
                                        <Tooltip label={v.name}>
                                            <UnstyledButton onClick={() => selectAndClose(v)}>
                                                <LazyLoadImage
                                                    src={`${v.img}`}
                                                    width="100%"
                                                    effect="blur"
                                                />
                                            </UnstyledButton>
                                        </Tooltip>
                                    </Grid.Col>
                                )}
                            </Grid>
                        </ScrollArea>
                    </Grid.Col>
                </Grid>

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
                    Change Charactor
                </Button>
            )}
        </>
    )
}

export default SelectCharactor
