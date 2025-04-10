// ModalWrapper.tsx
import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalWrapperProps {
  children: ReactNode;
}

export default function ModalWrapper({ children }: ModalWrapperProps) {
  return createPortal(
    <div className="w-full h-full z-50 backdrop-blur-xl overflow-y-scroll">
      {children}
    </div>,
    document.getElementById("modal-root")!
  );
}
