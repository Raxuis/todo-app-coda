import {Button, ButtonText} from "@/components/ui/button";
import {
    Modal,
    ModalBackdrop,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter
} from '@/components/ui/modal';
import {Heading} from "@/components/ui/heading";
import {Icon} from "@/components/ui/icon";
import {TrashIcon} from "lucide-react-native";
import {Box} from "@/components/ui/box";
import {Text} from "@/components/ui/text";

const DeleteTaskModal = (
    {
        showModal,
        setShowModal,
        deleteTask,
        taskId
    }
    : {
        showModal: boolean,
        setShowModal: Function,
        deleteTask: Function,
        taskId: string | null
    }) => {
    return (
        <>
            <Button onPress={() => setShowModal(true)}>
                <ButtonText>Delete Post</ButtonText>
            </Button>
            <Modal
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false)
                }}
            >
                <ModalBackdrop/>
                <ModalContent className="max-w-[305px] items-center">
                    <ModalHeader>
                        <Box className="w-[56px] h-[56px] rounded-full bg-background-error items-center justify-center">
                            <Icon as={TrashIcon} className="stroke-error-600" size="xl"/>
                        </Box>
                    </ModalHeader>
                    <ModalBody className="mt-0 mb-4">
                        <Heading size="md" className="text-typography-950 mb-2 text-center">
                            Supprimer une tâche
                        </Heading>
                        <Text size="sm" className="text-typography-500 text-center">
                            Êtes-vous sûr de supprimer cette tâche.
                        </Text>
                    </ModalBody>
                    <ModalFooter className="w-full">
                        <Button
                            variant="outline"
                            action="secondary"
                            size="sm"
                            onPress={() => {
                                setShowModal(false)
                            }}
                            className="flex-grow"
                        >
                            <ButtonText>Cancel</ButtonText>
                        </Button>
                        <Button
                            onPress={async () => {
                                if (taskId) {
                                    await deleteTask(taskId);
                                    setShowModal(false);
                                }
                            }}
                            size="sm"
                            className="flex-grow bg-red-500"
                        >
                            <ButtonText>Delete</ButtonText>
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
};

export default DeleteTaskModal;