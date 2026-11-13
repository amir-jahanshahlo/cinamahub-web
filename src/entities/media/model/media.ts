export type MediaType = 'movie' | 'tv'

export interface Media {
  /** Stable, non-empty ID within this media type; normalize source IDs to strings. */
  readonly id: string
  readonly type: MediaType
  readonly title: string
  /** Display-ready URL or local asset path; API-specific paths are resolved upstream. */
  readonly posterUrl?: string
  /** ISO calendar date (YYYY-MM-DD); for TV, the first release date. */
  readonly releaseDate?: string
  /** Normalized score from 0 to 10. Absence means unrated; zero is a valid score. */
  readonly rating?: number
}

/** Use the full identity for collection keys, including when source IDs overlap. */
export function getMediaKey(media: Pick<Media, 'id' | 'type'>): string {
  return `${media.type}:${media.id}`
}
