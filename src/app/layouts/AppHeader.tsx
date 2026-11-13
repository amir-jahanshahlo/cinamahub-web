import { Link, useLocation } from "react-router";
import { DesktopNavigation } from "./Navigation.tsx";
import HeaderSearch from "./HeaderSearch.tsx";
import ShellIcon from "./ShellIcon.tsx";

function AppHeader() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-20 border-b border-cinema-border bg-cinema-bg/95 pt-[env(safe-area-inset-top)] backdrop-blur-xl">
      <div className="app-header-content w-full px-5 md:px-8">
        <Link
          to="/"
          aria-label="CinemaHub home"
          className="flex shrink-0 items-center gap-3 rounded-lg"
        >
          <span className="flex size-10 items-center justify-center rounded-xl bg-linear-to-br from-amber-400 to-orange-600 text-cinema-bg">
            <ShellIcon name="play" className="size-6" />
          </span>
          <span className="text-xl font-bold tracking-tight">
            Cinema<span className="text-cinema-accent">Hub</span>
          </span>
        </Link>
        <DesktopNavigation />
        <HeaderSearch key={location.key} />
      </div>
    </header>
  );
}

export default AppHeader;
