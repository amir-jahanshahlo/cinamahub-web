import type { Media } from '../model/media.ts'

export function getMediaDetailsPath(media: Pick<Media, 'id' | 'type'>): string {
  return `/${media.type}/${encodeURIComponent(media.id)}`
}

export function getReleaseYear(releaseDate: Media['releaseDate']): string | undefined {
  if (!releaseDate || !/^\d{4}-\d{2}-\d{2}$/.test(releaseDate)) return undefined

  const date = new Date(`${releaseDate}T00:00:00Z`)
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== releaseDate) {
    return undefined
  }

  return releaseDate.slice(0, 4)
}

export function formatMediaRating(rating: Media['rating']): string | undefined {
  if (rating === undefined || !Number.isFinite(rating) || rating < 0 || rating > 10) {
    return undefined
  }

  return rating.toFixed(1)
}
