import { motion } from 'motion/react';

interface PlaceModalProps {
  onClose: () => void;
}

export default function PlaceModal({ onClose }: PlaceModalProps) {
  return (
    <motion.div
      className="absolute inset-0 z-60 mx-auto flex w-full max-w-3xl items-end justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0" onClick={onClose} />

      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        transition={{ duration: 0.15, ease: 'easeInOut' }}
        className="relative inset-x-0 top-0 h-[calc(100%-100px)] w-full overflow-hidden rounded-t-xl bg-white pt-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      ></motion.div>
    </motion.div>
  );
}
