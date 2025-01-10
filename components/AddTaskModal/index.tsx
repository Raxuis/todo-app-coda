import {
    Modal,
    ModalBackdrop,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter
} from '@/components/ui/modal';
import {CloseIcon, Icon} from "@/components/ui/icon";
import {Button, ButtonText} from "@/components/ui/button";
import {Heading} from "@/components/ui/heading";
import {Input, InputField} from "@/components/ui/input";
import {useState} from "react";

const AddTaskModal = ({showModal, setShowModal, addTask}: {
    showModal: boolean,
    setShowModal: Function,
    addTask: Function
}) => {
    const [newTask, setNewTask] = useState<string>("");

    return (
        <Modal
            isOpen={showModal}
            onClose={() => {
                setShowModal(false)
            }}
            size="md"
        >
            <ModalBackdrop/>
            <ModalContent>
                <ModalHeader>
                    <Heading>
                        Ajouter une tâche
                    </Heading>
                    <ModalCloseButton>
                        <Icon
                            as={CloseIcon}
                            size="md"
                            className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
                        />
                    </ModalCloseButton>
                </ModalHeader>
                <ModalBody>
                    <Input variant="outline" size="sm" className="flex-1">
                        <InputField
                            placeholder="Se laver..."
                            defaultValue={newTask}
                            onChangeText={text => setNewTask(text)}/>
                    </Input>
                </ModalBody>
                <ModalFooter>
                    <Button
                        variant="outline"
                        action="secondary"
                        onPress={() => {
                            setShowModal(false)
                            setNewTask("");
                        }}
                    >
                        <ButtonText>Annuler</ButtonText>
                    </Button>
                    <Button
                        onPress={async () => {
                            if (!newTask || newTask === "") {
                                return;
                            }
                            await addTask(newTask);
                            setNewTask("");
                            setShowModal(false)
                        }}
                        action="positive"
                    >
                        <ButtonText>Ajouter</ButtonText>
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default AddTaskModal;
