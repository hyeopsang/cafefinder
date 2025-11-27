import { motion } from 'motion/react';
import Search from '@/assets/search.svg?react';

interface SearchModalProps {
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
}

export default function SearchModal({ value, onChange, onClose }: SearchModalProps) {
  return (
    <motion.div
      className="absolute inset-0 z-60 mx-auto flex w-full max-w-3xl items-end justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-transparent" onClick={onClose} />
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        transition={{ duration: 0.15, ease: 'easeInOut' }}
        className="relative inset-x-0 top-0 h-[calc(100%-100px)] w-full rounded-t-2xl bg-white p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full items-center gap-3 rounded-lg bg-white p-3 text-sm">
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="상호명을 입력해주세요"
            className="flex-1 outline-0 placeholder:text-sm"
            autoFocus
          />
          <Search className="h-7 w-7 text-purple-600" />
        </div>

        <button
          className="mt-3 w-full rounded-md bg-gray-200 py-2 text-sm text-gray-700"
          onClick={onClose}
        >
          닫기
        </button>
      </motion.div>
    </motion.div>
  );
}
