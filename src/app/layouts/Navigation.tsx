import { NavLink } from 'react-router'
import ShellIcon from './ShellIcon.tsx'

const links = [
  { to: '/', label: 'Home', icon: 'home' },
  { to: '/watchlist', label: 'Watchlist', icon: 'watchlist' },
] as const

function NavigationLinks({ mobile = false }: { mobile?: boolean }) {
  return links.map(({ to, label, icon }) => (
    <NavLink
      key={to}
      to={to}
      end
      className={({ isActive }) =>
        `flex min-h-12 items-center justify-center rounded-xl px-5 text-sm font-medium transition-colors ${
          mobile ? 'flex-1 flex-col gap-1 py-2' : 'gap-2.5'
        } ${
          isActive
            ? 'bg-cinema-accent/10 text-cinema-accent'
            : 'text-cinema-muted hover:bg-(--cinema-fill-hover) hover:text-cinema-text'
        }`
      }
    >
      <ShellIcon name={icon} />
      <span>{label}</span>
    </NavLink>
  ))
}

export function DesktopNavigation() {
  return (
    <nav aria-label="Primary navigation" className="hidden items-center gap-2 md:flex">
      <NavigationLinks />
    </nav>
  )
}

export function MobileBottomNavigation() {
  return (
    <nav
      aria-label="Primary navigation"
      className="fixed inset-x-0 bottom-0 z-30 flex gap-3 border-t border-cinema-border bg-cinema-bg/95 px-4 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden"
    >
      <NavigationLinks mobile />
    </nav>
  )
}
