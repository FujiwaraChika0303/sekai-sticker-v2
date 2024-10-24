import { Tooltip, ActionIcon } from "@mantine/core";
import { IconDeselect } from "@tabler/icons-react";

type DeselectLayerProps = {
    disabled: boolean;
    deselectFunc: Function
}

function DeselectLayer({ disabled, deselectFunc }: DeselectLayerProps) {
    return (
        <>
            <Tooltip label="Deselect">
                <ActionIcon
                    variant="light"
                    color="blue"
                    aria-label="Deselect"
                    disabled={disabled}
                    onClick={() => deselectFunc()}
                >
                    <IconDeselect
                        style={{ width: '70%', height: '70%' }}
                        stroke={1.5}
                    />
                </ActionIcon>
            </Tooltip>
        </>
    )
}

export default DeselectLayer
