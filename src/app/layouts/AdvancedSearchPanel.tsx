import { useState } from 'react'
import { DownOutlined } from '@ant-design/icons'
import ShellIcon from './ShellIcon.tsx'

function SelectField({
  label,
  name,
  options,
}: {
  label: string
  name: string
  options: readonly string[]
}) {
  const id = `advanced-${name}`

  return (
    <div className="filter-field">
      <label className="filter-label" htmlFor={id}>
        {label}
      </label>
      <select id={id} name={name} defaultValue="" className="filter-control filter-select">
        <option value="">Any {label.toLowerCase()}</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <DownOutlined aria-hidden="true" className="filter-select-chevron" />
    </div>
  )
}

function AdvancedSearchPanel({ onClose }: { onClose: () => void }) {
  const [rating, setRating] = useState(0)

  return (
    <>
      <div className="flex items-start justify-between gap-4 border-b border-cinema-border px-5 py-4 md:px-6">
        <div className="min-w-0">
          <div className="mb-1 flex flex-wrap items-center gap-3">
            <h2 id="advanced-search-title" className="text-lg font-semibold tracking-tight">
              Advanced search
            </h2>
            <span className="rounded-md border border-cinema-accent/25 bg-cinema-accent/10 px-2 py-0.5 text-[0.65rem] font-semibold tracking-wider text-cinema-accent">
              UI PREVIEW
            </span>
          </div>
          <p id="advanced-search-description" className="text-sm leading-relaxed text-cinema-muted">
            Explore the filter controls. Search and filtering are coming soon.
          </p>
        </div>
        <button
          type="button"
          aria-label="Close advanced search settings"
          className="icon-button"
          onClick={onClose}
        >
          <ShellIcon name="close" />
        </button>
      </div>

      <form
        aria-label="Advanced search preview"
        aria-describedby="advanced-search-description advanced-search-preview-note"
        noValidate
        onSubmit={(event) => event.preventDefault()}
        onReset={() => setRating(0)}
      >
        <div className="grid grid-cols-1 gap-x-4 gap-y-6 px-5 pt-7 pb-6 sm:grid-cols-2 md:px-6 lg:grid-cols-3">
          <SelectField label="Media Type" name="media-type" options={['Movie', 'TV show']} />
          <SelectField
            label="Genre"
            name="genre"
            options={['Action', 'Adventure', 'Animation', 'Comedy', 'Documentary', 'Drama', 'Horror', 'Science fiction', 'Thriller']}
          />
          <SelectField
            label="Language"
            name="language"
            options={['English', 'Persian', 'French', 'Spanish', 'Japanese', 'Korean']}
          />

          {['Actor', 'Director', 'Writer'].map((label) => (
            <div key={label} className="filter-field">
              <label className="filter-label" htmlFor={`advanced-${label.toLowerCase()}`}>
                {label}
              </label>
              <input
                id={`advanced-${label.toLowerCase()}`}
                name={label.toLowerCase()}
                type="text"
                placeholder="Name or keyword"
                autoComplete="off"
                className="filter-control"
              />
            </div>
          ))}

          <SelectField
            label="Country"
            name="country"
            options={['United States', 'United Kingdom', 'Iran', 'France', 'Japan', 'South Korea']}
          />

          <fieldset className="filter-field filter-year-range">
            <legend className="filter-label">Release Year Range</legend>
            <div className="filter-control flex items-center gap-3">
              <label className="sr-only" htmlFor="advanced-year-from">
                Release year from
              </label>
              <input
                id="advanced-year-from"
                name="year-from"
                type="number"
                placeholder="From"
                className="filter-year-input"
              />
              <span aria-hidden="true" className="text-cinema-muted">—</span>
              <label className="sr-only" htmlFor="advanced-year-to">
                Release year to
              </label>
              <input
                id="advanced-year-to"
                name="year-to"
                type="number"
                placeholder="To"
                className="filter-year-input"
              />
            </div>
          </fieldset>

          <div className="filter-field">
            <label className="filter-label" htmlFor="advanced-rating">
              Rating
            </label>
            <div className="filter-control flex items-center gap-4">
              <input
                id="advanced-rating"
                name="rating"
                type="range"
                min={0}
                max={10}
                step={0.5}
                value={rating}
                aria-valuetext={rating === 0 ? 'Any rating' : `${rating.toFixed(1)} or higher out of 10`}
                onChange={(event) => setRating(Number(event.target.value))}
                className="m-0 min-w-0 flex-1 cursor-pointer accent-cinema-accent"
              />
              <output
                htmlFor="advanced-rating"
                className="w-10 shrink-0 text-end text-sm font-medium tabular-nums text-cinema-accent"
              >
                {rating === 0 ? 'Any' : `${rating.toFixed(1)}+`}
              </output>
            </div>
          </div>

          <SelectField
            label="Age Rating"
            name="age-rating"
            options={['G', 'PG', 'PG-13', 'R', 'NC-17', 'TV-14', 'TV-MA']}
          />
          <SelectField
            label="Streaming Network"
            name="streaming-network"
            options={['Netflix', 'Prime Video', 'Disney+', 'Apple TV+', 'HBO']}
          />

          <div className="filter-field">
            <span className="filter-label">Release Status</span>
            <label className="filter-control flex cursor-pointer items-center justify-between gap-4">
              <span>Include upcoming titles</span>
              <span className="filter-switch">
                <input name="include-upcoming" type="checkbox" role="switch" className="sr-only" />
                <span aria-hidden="true" className="filter-switch-track" />
              </span>
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-cinema-border bg-cinema-bg/30 px-5 py-4 sm:flex-row sm:items-center sm:justify-between md:px-6">
          <p id="advanced-search-preview-note" className="max-w-md text-xs leading-relaxed text-cinema-muted">
            Preview only. Changing these controls does not apply filters or run a search.
          </p>
          <div className="flex shrink-0 gap-3">
            <button
              type="reset"
              className="min-h-12 flex-1 rounded-xl border border-cinema-border bg-transparent px-5 text-sm font-medium text-cinema-control transition-colors hover:bg-white/5 sm:flex-none"
            >
              Reset
            </button>
            <button
              type="submit"
              disabled
              aria-describedby="advanced-search-preview-note"
              className="flex min-h-12 flex-1 cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-cinema-accent/70 px-6 text-sm font-semibold text-cinema-bg sm:flex-none"
            >
              <ShellIcon name="search" className="size-4" />
              Search
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default AdvancedSearchPanel
