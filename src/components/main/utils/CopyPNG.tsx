import { Button } from "@mantine/core";
import { IconPictureInPictureOn } from "@tabler/icons-react";
import { copyImages } from "../../../utils/copyUtils";
import { dataURLToBlob } from "../../../utils/downloadUtils";

type CopyPNGProps = {
    dataURL: string;
}

function CopyPNG({ dataURL }: CopyPNGProps) {
    return (
        <>
            <Button
                variant="light"
                onClick={async () => {
                    const blobImage = await dataURLToBlob(
                        dataURL
                    )
                    copyImages(blobImage, "image/png")
                }}
                leftSection={<IconPictureInPictureOn size={16} />}
            >
                Copy PNG
            </Button>
        </>
    )
}

export default CopyPNG
