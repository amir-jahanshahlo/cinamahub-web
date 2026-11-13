import { Outlet } from 'react-router'
import AppHeader from './AppHeader.tsx'
import { MobileBottomNavigation } from './Navigation.tsx'
import AIChatPanel from './AIChatPanel.tsx'

function AppLayout() {
  return (
    <div className="min-h-dvh bg-cinema-bg text-slate-100">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <AppHeader />
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto w-full max-w-7xl px-5 pt-10 pb-[calc(11rem+env(safe-area-inset-bottom))] md:px-8 md:pt-16 md:pb-32"
      >
        <Outlet />
      </main>
      <MobileBottomNavigation />
      <AIChatPanel />
    </div>
  )
}

export default AppLayout
