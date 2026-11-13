import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router/dom'
import { StyleProvider } from '@ant-design/cssinjs'
import { ConfigProvider } from 'antd'
import './index.css'
import { router } from './app/router/index.tsx'
import { applyCinemaTheme, cinemaTheme } from './app/theme/theme.ts'

applyCinemaTheme()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StyleProvider layer>
      <ConfigProvider theme={cinemaTheme}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </StyleProvider>
  </StrictMode>,
)
