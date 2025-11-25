import { Link, useLocation } from 'react-router';
import type { ComponentType, SVGProps } from 'react';
import { cn } from '@/lib/utils';

type NavButtonProps = {
  path: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export default function NavButton({ path, label, icon: Icon }: NavButtonProps) {
  const location = useLocation();
  const isActive = location.pathname.startsWith(path);
  return (
    <Link
      to={path}
      className={cn(
        'mx-auto flex flex-col items-center justify-center gap-1.5',
        isActive ? 'text-purple-600' : 'text-gray-300',
      )}
    >
      <Icon className="h-6 w-6" />
      <p className="text-xs">{label}</p>
    </Link>
  );
}
