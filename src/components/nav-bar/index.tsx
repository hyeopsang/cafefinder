import NavButton from './nav-button';
import Home from '@/assets/home.svg?react';
import Map from '@/assets/map.svg?react';
import Events from '@/assets/events.svg?react';
import Profile from '@/assets/profile.svg?react';

const NavList = [
  { path: '/', icon: Home, label: '홈' },
  { path: '/map', icon: Map, label: '지도' },
  { path: '/events', icon: Events, label: '행사' },
  { path: '/mypage', icon: Profile, label: '마이페이지' },
];

export default function NavBar() {
  return (
    <nav className="sha sticky bottom-0 left-0 z-20 w-full bg-white py-2.5 shadow-[0_-2px_20px] shadow-gray-100">
      <ul className="grid w-full grid-cols-4">
        {NavList.map((nav, id) => (
          <NavButton key={id} path={nav.path} icon={nav.icon} label={nav.label} />
        ))}
      </ul>
    </nav>
  );
}
