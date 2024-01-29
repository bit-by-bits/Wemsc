import { FC } from "react";
import { IoMdClose } from "react-icons/io";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { ParentModalProps } from "./Interfaces";

const ParentModal: FC<ParentModalProps> = ({
  isOpen,
  onChange,
  title,
  description,
  children,
}) => {
  return (
    <Modal isOpen={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <ModalContent
        className="
          fixed 
          drop-shadow-md 
          border 
          border-neutral-700 
          top-[50%] 
          left-[50%] 
          max-h-full 
          h-full 
          md:h-auto 
          md:max-h-[85vh] 
          w-full 
          md:w-[90vw] 
          md:max-w-[450px] 
          translate-x-[-50%] 
          translate-y-[-50%] 
          rounded-md 
          bg-neutral-800 
          p-[25px] 
          focus:outline-none
        "
      >
        <ModalHeader>
          <div className="text-xl text-center font-bold mb-4">{title}</div>
        </ModalHeader>
        <ModalBody>
          <div className="mb-5 text-sm leading-normal text-center">
            {description}
          </div>
          <div>{children}</div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="light"
            onPress={() => onChange(false)}
          >
            Close
          </Button>
          <Button color="primary" onPress={() => onChange(false)}>
            Action
          </Button>
        </ModalFooter>
        <button
          className="
            text-neutral-400 
            hover:text-white 
            absolute 
            top-[10px] 
            right-[10px] 
            inline-flex 
            h-[25px] 
            w-[25px] 
            appearance-none 
            items-center 
            justify-center 
            rounded-full 
            focus:outline-none
          "
          aria-label="Close"
          onClick={() => onChange(false)}
        >
          <IoMdClose />
        </button>
      </ModalContent>
    </Modal>
  );
};

export default ParentModal;
