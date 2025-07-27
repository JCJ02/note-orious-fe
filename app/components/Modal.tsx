import React from "react";
import { cn } from "~/lib/utils";

type ModalProps = {
  isOpen?: boolean;
  onClose?: any;
  className?: string;
  children: React.ReactNode;
};

const Modal = ({ className, children, isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null;
  return (
    <div
      className={cn(
        "fixed inset-0 flex items-center justify-center bg-black bg-black/50",
        className
      )}
      onClick={onClose}
    >
      <div onClick={(event) => event.stopPropagation()}>{children}</div>
    </div>
  );
};

export default Modal;
