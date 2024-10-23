import { notifications } from "@mantine/notifications";

export function copyImages(blobImage: Blob, format: string = "image/png") {
    try {
 
        navigator.clipboard.write([
            new ClipboardItem({
                [format]: blobImage,
            }),
        ]);

        notifications.show({
            title: "Success",
            message: "Image copied to your clipboard.",
        });
    } 
    catch (error) {
        console.error(error);
    }
}
