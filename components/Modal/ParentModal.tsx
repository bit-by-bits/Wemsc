import { FC } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import { ParentModalProps } from "./Interfaces";

const ParentModal: FC<ParentModalProps> = ({
  isOpen,
  onChange,
  title,
  description,
  children,
}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onChange}>
      <ModalContent className="border border-neutral-700 rounded-md bg-main-bg focus:outline-none scale-80">
        {title !== "" && (
          <ModalHeader>
            <div className="text-xl text-center font-bold">{title}</div>
          </ModalHeader>
        )}
        <ModalBody>
          {description !== "" && (
            <div className="text-sm leading-normal text-center">
              {description}
            </div>
          )}
          <span>{children}</span>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ParentModal;
