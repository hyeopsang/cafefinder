import { Outlet } from 'react-router';
import NavBar from '../nav-bar';

export default function Layout() {
  return (
    <div className="mx-auto h-dvh w-full max-w-3xl overflow-hidden bg-white">
      <main className="h-full w-full">
        <Outlet />
      </main>
      <NavBar />
    </div>
  );
}
