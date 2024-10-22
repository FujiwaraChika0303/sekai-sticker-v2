import { Container, Text } from "@mantine/core";
import { IconSticker } from "@tabler/icons-react";

import CanvasBoard from "../components/main/CanvasBoard";

function MainPage() {

    return (
        <Container fluid>
            <Text fw={600} fz={32} ta="center" mt={24}>
                <IconSticker /> Sekai Sticker V2
            </Text>

            <Text c="dimmed" mb={8} ta="center"> 
                Sekai Sticker Canvas
            </Text>

            <CanvasBoard />
        </Container>
    )
}

export default MainPage
