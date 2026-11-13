import { useEffect, useRef, useState } from 'react'
import AdvancedSearchPanel from './AdvancedSearchPanel.tsx'
import ShellIcon from './ShellIcon.tsx'

function HeaderSearch() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const settingsButtonRef = useRef<HTMLButtonElement>(null)
  const settingsPanelRef = useRef<HTMLElement>(null)
  const restoreTriggerFocus = useRef(false)

  useEffect(() => {
    if (isExpanded) {
      inputRef.current?.focus({ preventScroll: true })
    } else if (restoreTriggerFocus.current) {
      triggerRef.current?.focus({ preventScroll: true })
      restoreTriggerFocus.current = false
    }
  }, [isExpanded])

  useEffect(() => {
    if (!isSettingsOpen) return

    settingsPanelRef.current?.focus({ preventScroll: true })

    function dismissOutside(event: Event) {
      if (
        event.target instanceof Node &&
        !settingsButtonRef.current?.contains(event.target) &&
        !settingsPanelRef.current?.contains(event.target)
      ) {
        setIsSettingsOpen(false)
      }
    }

    document.addEventListener('pointerdown', dismissOutside)
    document.addEventListener('focusin', dismissOutside)
    return () => {
      document.removeEventListener('pointerdown', dismissOutside)
      document.removeEventListener('focusin', dismissOutside)
    }
  }, [isSettingsOpen])

  function closeSettings() {
    setIsSettingsOpen(false)
    settingsButtonRef.current?.focus({ preventScroll: true })
  }

  function collapseSearch() {
    setIsSettingsOpen(false)
    restoreTriggerFocus.current = true
    setIsExpanded(false)
  }

  return (
    <div
      className="header-search"
      data-expanded={isExpanded}
      onKeyDown={(event) => {
        if (event.key !== 'Escape' || event.defaultPrevented) return

        event.preventDefault()
        event.stopPropagation()
        if (isSettingsOpen) closeSettings()
        else collapseSearch()
      }}
    >
      {!isExpanded ? (
        <button
          ref={triggerRef}
          type="button"
          aria-label="Expand search"
          aria-expanded={false}
          aria-controls="header-search-controls"
          onClick={() => setIsExpanded(true)}
          className="icon-button ml-auto flex border border-cinema-border bg-cinema-surface"
        >
          <ShellIcon name="search" />
        </button>
      ) : (
        <div
          id="header-search-controls"
          className="inline-search-controls focus-within:border-cinema-accent"
        >
          <label className="flex min-w-0 items-center gap-3 px-3 text-cinema-muted">
            <span className="sr-only">Search movies and TV shows</span>
            <ShellIcon name="search" className="size-5 shrink-0" />
            <input
              ref={inputRef}
              type="search"
              placeholder="Search movies and TV shows"
              aria-describedby="search-description"
              className="min-h-12 min-w-0 w-full border-0 bg-transparent text-base text-white placeholder:text-cinema-muted focus:outline-none"
            />
          </label>
          <button
            ref={settingsButtonRef}
            type="button"
            aria-label="Advanced search settings"
            aria-expanded={isSettingsOpen}
            aria-controls="advanced-search-settings"
            onClick={() => {
              if (isSettingsOpen) closeSettings()
              else setIsSettingsOpen(true)
            }}
            className={`icon-button ${isSettingsOpen ? 'bg-cinema-accent/10 text-cinema-accent' : ''}`}
          >
            <ShellIcon name="settings" />
          </button>
          <button
            type="button"
            aria-label="Collapse search"
            aria-expanded={true}
            aria-controls="header-search-controls"
            className="icon-button"
            onClick={collapseSearch}
          >
            <ShellIcon name="close" />
          </button>
          <p id="search-description" className="sr-only">
            Search is coming soon. This input is a preview and does not search yet.
          </p>
        </div>
      )}
      {isExpanded && isSettingsOpen && (
        <section
          ref={settingsPanelRef}
          id="advanced-search-settings"
          tabIndex={-1}
          aria-labelledby="advanced-search-title"
          aria-describedby="advanced-search-description"
          className="advanced-search-panel"
        >
          <AdvancedSearchPanel onClose={closeSettings} />
        </section>
      )}
    </div>
  )
}

export default HeaderSearch
