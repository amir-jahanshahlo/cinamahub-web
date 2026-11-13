import { memo, useState, type ReactNode } from 'react'
import { Link } from 'react-router'
import { Card, Tag } from 'antd'
import { PictureOutlined, StarFilled } from '@ant-design/icons'
import type { Media } from '../model/media.ts'
import { formatMediaRating, getMediaDetailsPath, getReleaseYear } from '../lib/mediaPresentation.ts'

export interface MediaCardProps {
  readonly media: Media
  /** Feature-owned controls with their own accessible labels, rendered outside the link. */
  readonly actions?: ReactNode
}

function MediaPoster({ src, title }: { src: Media['posterUrl']; title: string }) {
  const [hasError, setHasError] = useState(false)

  return (
    <div className="aspect-2/3 w-full overflow-hidden rounded-t-cinema-lg bg-cinema-bg">
      {src && !hasError ? (
        <img
          src={src}
          alt={`${title} poster`}
          width={400}
          height={600}
          loading="lazy"
          decoding="async"
          onError={() => setHasError(true)}
          className="block h-full w-full object-cover"
        />
      ) : (
        <div
          role="img"
          aria-label={`Poster unavailable for ${title}`}
          className="flex h-full flex-col items-center justify-center gap-3 p-3 text-center text-cinema-muted"
        >
          <PictureOutlined aria-hidden="true" className="text-3xl" />
          <span className="text-xs sm:text-sm">Poster unavailable</span>
        </div>
      )}
    </div>
  )
}

export const MediaCard = memo(function MediaCard({ media, actions }: MediaCardProps) {
  const year = getReleaseYear(media.releaseDate)
  const rating = formatMediaRating(media.rating)
  const typeLabel = media.type === 'movie' ? 'Movie' : 'TV series'
  const posterUrl = media.posterUrl?.trim()

  return (
    <Card
      className="h-full min-w-0"
      classNames={{ body: 'flex h-full flex-col p-0' }}
    >
      <Link
        to={getMediaDetailsPath(media)}
        aria-label={`View ${media.title} (${typeLabel}) details`}
        className="flex min-w-0 flex-1 flex-col rounded-cinema-lg text-cinema-text transition-colors hover:bg-(--cinema-fill-hover) hover:text-cinema-text focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cinema-accent"
      >
        {/* A source change remounts only the poster, clearing any previous load failure. */}
        <MediaPoster key={posterUrl} src={posterUrl} title={media.title} />
        <div className="flex flex-1 flex-col gap-3 p-3 sm:p-4">
          <span
            title={media.title}
            className="line-clamp-2 min-h-12 text-base leading-6 font-semibold wrap-anywhere"
          >
            {media.title}
          </span>
          <div className="mt-auto flex min-h-6 flex-wrap items-center gap-x-3 gap-y-1 text-sm text-cinema-muted">
            {year && <time dateTime={media.releaseDate}>{year}</time>}
            {rating !== undefined && (
              <span
                aria-label={`Rating: ${rating} out of 10`}
                className="inline-flex items-center gap-1.5 tabular-nums"
              >
                <StarFilled aria-hidden="true" className="text-cinema-warning" />
                <span aria-hidden="true">{rating}</span>
              </span>
            )}
          </div>
          <div><Tag className="m-0">{typeLabel}</Tag></div>
        </div>
      </Link>
      {actions != null && (
        <div className="flex flex-wrap items-center gap-2 border-t border-cinema-border p-3 sm:px-4">
          {actions}
        </div>
      )}
    </Card>
  )
})
