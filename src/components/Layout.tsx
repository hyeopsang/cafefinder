import { Outlet } from 'react-router';
import NavBar from './nav-bar/NavBar';

export default function Layout() {
  return (
    <div className="relative mx-auto flex h-dvh w-full max-w-3xl flex-col overflow-x-hidden bg-white">
      <main className="flex-1 overflow-y-scroll">
        <Outlet />
      </main>
      <NavBar />
    </div>
  );
}
