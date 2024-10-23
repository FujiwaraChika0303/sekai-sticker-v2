import { useDisclosure } from '@mantine/hooks';
import { Drawer, Grid, NavLink, TextInput, UnstyledButton, ScrollArea, Button, Box, ActionIcon, Tooltip, Text } from '@mantine/core';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { IconAdjustments, IconChevronRight, IconX, IconSearch, IconSticker } from '@tabler/icons-react';
import { StickerChatactor, chatactorList } from '../../data/characters';
import { useEffect, useState } from 'react';

import { uniqueBy, prop } from "remeda"

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

    const [filledList, setFilledList] = useState<StickerChatactor[]>(chatactorList);
    const [searchString, setSearchString] = useState<string>("");
    const [opened, { open, close }] = useDisclosure(false);

    useEffect(() => {

        if (searchString === "") {
            setFilledList(chatactorList);
            return
        }

        const searchResult = chatactorList.filter(v => v.name.toLowerCase().includes(searchString.toLowerCase()));
        setFilledList(searchResult)

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
            >
                <TextInput
                    leftSection={<IconSearch size={16} />}
                    rightSection={
                        <Tooltip label="Clear Search">
                        <ActionIcon
                            variant="subtle"
                            aria-label="Clear Search"
                            onClick={() => setSearchString("")}
                        >
                            <IconX style={{ width: '70%', height: '70%' }} stroke={1.5} />
                        </ActionIcon>
                        </Tooltip>
                    }
                    placeholder="Search Charactor"
                    value={searchString}
                    onChange={(event) => setSearchString(event.currentTarget.value)}
                    mb={12}
                />

                <Grid>
                    <Grid.Col span={2}>
                        <ScrollArea h={320}>
                            {uniqueBy(chatactorList, prop("character")).map(v =>
                                <Box key={v.img}>
                                    <UnstyledButton onClick={() => setSearchString(v.character)} mb={14}>
                                        <Text c="dimmed" fz={14}>
                                            {v.character}
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

                    <Grid.Col span={10}>
                        <ScrollArea h={320}>
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
