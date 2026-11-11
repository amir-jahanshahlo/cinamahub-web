import { createBrowserRouter } from 'react-router'
import AppLayout from '../layouts/AppLayout.tsx'
import HomePage from '../../pages/HomePage.tsx'
import MovieDetailsPage from '../../pages/MovieDetailsPage.tsx'
import TvDetailsPage from '../../pages/TvDetailsPage.tsx'
import WatchlistPage from '../../pages/WatchlistPage.tsx'
import NotFoundPage from '../../pages/NotFoundPage.tsx'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: AppLayout,
    children: [
      { index: true, Component: HomePage },
      { path: 'movie/:id', Component: MovieDetailsPage },
      { path: 'tv/:id', Component: TvDetailsPage },
      { path: 'watchlist', Component: WatchlistPage },
      { path: '*', Component: NotFoundPage },
    ],
  },
])
