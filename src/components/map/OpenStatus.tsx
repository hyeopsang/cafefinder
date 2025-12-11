interface OpenStatusProps {
  isOpen?: boolean;
}

export default function OpenStatus({ isOpen }: OpenStatusProps) {
  return (
    <p className={`text-xs font-medium ${isOpen ? 'text-blue-500' : 'text-red-500'}`}>
      {isOpen ? '영업중' : '영업전'}
    </p>
  );
}
