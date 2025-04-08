// ModalWrapper.tsx
import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalWrapperProps {
  children: ReactNode;
}

export default function ModalWrapper({ children }: ModalWrapperProps) {
  return createPortal(
    <div className="inset-0 w-full h-full z-50 flex items-center justify-center backdrop-blur-xl">
      {children}
    </div>,
    document.getElementById("modal-root")!
  );
}
