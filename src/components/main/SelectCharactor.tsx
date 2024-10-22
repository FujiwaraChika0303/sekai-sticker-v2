import { useDisclosure } from '@mantine/hooks';
import { Drawer, Grid, NavLink, TextInput, UnstyledButton, ScrollArea, Button } from '@mantine/core';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { IconAdjustments, IconChevronRight, IconMessage, IconSearch } from '@tabler/icons-react';
import { StickerChatactor, chatactorList } from '../../data/characters';
import { useEffect, useState } from 'react';

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
                    placeholder="Search Charactor"
                    value={searchString}
                    onChange={(event) => setSearchString(event.currentTarget.value)}
                    mb={12}
                />

                <ScrollArea h={350}>
                    <Grid>
                        {filledList.map(v =>
                            <Grid.Col span={{ base: 12, md: 6, lg: 2 }} key={v.img}>
                                <UnstyledButton onClick={() => selectAndClose(v)}>
                                    <LazyLoadImage
                                        src={`${v.img}`}                           
                                        width="100%"
                                        effect="blur"
                                    />
                                </UnstyledButton>
                            </Grid.Col>
                        )}
                    </Grid>
                </ScrollArea>
            </Drawer>

            { openComp === "NavLink" && (
                <NavLink
                    label={title}
                    leftSection={<IconMessage size="1rem" />}
                    rightSection={
                        <IconChevronRight size="0.8rem" stroke={1.5} className="mantine-rotate-rtl" />
                    }
                    onClick={(e) => {
                        e.preventDefault()
                        open()
                    }}
                />
            )}      

            { openComp === "Button" && (
                <Button leftSection={<IconAdjustments />} variant="light" onClick={() => open()}>
                    Change Charactor
                </Button>
            )}                
        </>
    )
}

export default SelectCharactor
