import { ActionIcon, Tooltip } from "@mantine/core"
import { IconArrowLeft } from "@tabler/icons-react"

import { useRouter } from 'next/navigation'

function BackBtn() {

    const router = useRouter()

    return (
        <>
            <Tooltip label="Back">
                <ActionIcon variant="transparent" aria-label="Settings" onClick={() => router.back()}>
                    <IconArrowLeft style={{ width: '90%', height: '90%' }} stroke={1.5} />
                </ActionIcon>
            </Tooltip>
        </>
    )
}

export default BackBtn
