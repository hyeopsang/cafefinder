import Logo from '@/assets/logo.svg?react';

export default function Header() {
  return (
    <header className="flex h-14 w-full items-center overflow-hidden px-1 py-3">
      <Logo className="h-20 w-40" />
    </header>
  );
}
