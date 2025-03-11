import { Text, Divider } from "@mantine/core";
import { IconTableShortcut } from "@tabler/icons-react";
import Markdown from 'markdown-to-jsx'

const contentOne = `
# 🔍 When a layer is selected

- **Delete**:   
Delete current layer

- **Ctrl + D**:   
Copy and paster current layer

`

function Shotcuts() {
    return (
        <>
            <Text fz={32} fw={600} ta="left" mb={8}>
                <IconTableShortcut /> Shotcuts
            </Text>

            <Divider my="md" />

            <Markdown>
                {contentOne}
            </Markdown>
        </>
    )
}

export default Shotcuts
