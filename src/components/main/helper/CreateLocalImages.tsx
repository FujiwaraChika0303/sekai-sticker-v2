import { IconLink, IconChevronRight, IconSend } from "@tabler/icons-react"
import { NavLink, Button, Modal, Group, FileInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from "@mantine/form";
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';

const formSchema = z.object({
    imageFile: z.instanceof(File).nullable()
});
type FormSchema = z.infer<typeof formSchema>;

type CreateLocalImagesProps = {
    title?: string
    openComp?: "NavLink" | "Button"
    callBackImageURL: (imageURL: string) => void
}

function CreateLocalImages({
    title = "Add Local Image",
    openComp = "NavLink",
    callBackImageURL
}: CreateLocalImagesProps) {

    const [opened, { open, close }] = useDisclosure(false);

    const form = useForm<FormSchema>({
        mode: 'uncontrolled',
        initialValues: {
            imageFile: null,
        },
        validate: zodResolver(formSchema),
    });

    async function submitForm(values: FormSchema) {
        const arrayBuffer = await values.imageFile!.arrayBuffer()
        const fileUrl = URL.createObjectURL(new Blob([arrayBuffer]));
        callBackImageURL(fileUrl);
        close();
    }

    return (
        <>
            <Modal opened={opened} onClose={close} title={title}>
                <form onSubmit={form.onSubmit((values) => submitForm(values))}>

                    <FileInput
                        withAsterisk
                        label="Image File"
                        accept="image/png,image/jpeg"
                        key={form.key('imageFile')}
                        {...form.getInputProps('imageFile')}
                    />

                    <Group justify="flex-end" mt="md">
                        <Button
                            type="submit"
                            variant="light"
                            leftSection={<IconSend size={16} />}>
                            Submit
                        </Button>
                    </Group>

                </form>
            </Modal>

            {openComp === "NavLink" && (
                <NavLink
                    label={title}
                    leftSection={<IconLink size="1rem" />}
                    rightSection={
                        <IconChevronRight size="0.8rem" stroke={1.5} className="mantine-rotate-rtl" />
                    }
                    onClick={(e) => {
                        e.preventDefault()
                        open()
                    }}
                />
            )}
        </>
    )
}

export default CreateLocalImages
