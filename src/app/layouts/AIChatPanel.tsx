import { useRef } from 'react'
import { useLocation } from 'react-router'
import ShellIcon from './ShellIcon.tsx'

function AIChatPanel() {
  const location = useLocation()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  function openChat() {
    dialogRef.current?.showModal()
    closeRef.current?.focus()
  }

  return (
    <>
      <button
        type="button"
        aria-label="Open AI assistant"
        aria-haspopup="dialog"
        aria-controls="ai-chat-dialog"
        onClick={openChat}
        className="chat-trigger fixed right-5 z-20 flex min-h-14 min-w-14 items-center justify-center gap-3 rounded-2xl border border-orange-300/30 bg-cinema-accent px-4 font-semibold text-cinema-bg shadow-lg shadow-black/30 transition-colors hover:bg-orange-300 md:right-8"
      >
        <ShellIcon name="chat" className="size-6" />
        <span className="hidden text-sm md:inline">AI Assistant</span>
      </button>
      {/* Only visibility resets on navigation; future conversation data stays separate. */}
      <dialog
        key={location.key}
        ref={dialogRef}
        id="ai-chat-dialog"
        aria-labelledby="ai-chat-title"
        aria-describedby="ai-chat-description"
        className="shell-dialog chat-dialog"
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close()
        }}
      >
        <div className="flex min-h-80 flex-col p-5 md:min-h-96 md:p-6">
          <div className="flex items-center justify-between gap-4 border-b border-cinema-border pb-4">
            <div className="flex items-center gap-3">
              <ShellIcon name="chat" className="size-6 text-cinema-accent" />
              <h2 id="ai-chat-title" className="text-lg font-semibold">
                AI Assistant
              </h2>
            </div>
            <button
              ref={closeRef}
              type="button"
              aria-label="Close AI assistant"
              className="icon-button"
              onClick={() => dialogRef.current?.close()}
            >
              <ShellIcon name="close" />
            </button>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center gap-4 py-10 text-center">
            <span className="flex size-16 items-center justify-center rounded-2xl bg-cinema-accent/10 text-cinema-accent">
              <ShellIcon name="chat" className="size-8" />
            </span>
            <span className="rounded-full border border-cinema-border px-3 py-1 text-xs font-medium tracking-wide text-cinema-accent">
              COMING SOON
            </span>
            <p id="ai-chat-description" className="max-w-72 text-sm leading-relaxed text-cinema-muted">
              Your movie companion is on the way. The AI Assistant will be available in a future update.
            </p>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default AIChatPanel
