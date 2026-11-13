import { theme, type ThemeConfig } from 'antd'

const primary = '#ff9955'
const background = '#0b101a'

// Keep the existing dark appearance. Use native AntD components directly for new
// controls; use context-aware hooks for messages, notifications, and modal APIs.
const baseTheme: ThemeConfig = {
  algorithm: (seed, mapToken) => ({
    ...theme.darkAlgorithm(seed, mapToken),
    // The dark algorithm adjusts seed colors; retain CinemaHub's exact accent.
    colorPrimary: seed.colorPrimary,
  }),
  token: {
    colorPrimary: primary,
    colorInfo: primary,
    colorBgBase: background,
    colorBgLayout: background,
    colorBgContainer: '#131c2b',
    colorBgElevated: '#1b273a',
    colorTextBase: '#f1f5f9',
    colorText: '#f1f5f9',
    colorTextSecondary: '#a6b2c5',
    colorTextTertiary: '#8593a8',
    colorTextPlaceholder: '#8593a8',
    colorTextLabel: '#e2e8f0',
    // Dark text keeps solid orange controls readable, including primary buttons.
    colorTextLightSolid: background,
    colorBorder: '#2a3547',
    colorBorderSecondary: '#2a3547',
    colorFillSecondary: '#253247',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    fontFamily: "system-ui, 'Segoe UI', Roboto, sans-serif",
    fontSize: 16,
    lineHeight: 1.5,
    borderRadius: 12,
    borderRadiusSM: 10,
    borderRadiusLG: 16,
    controlHeight: 48,
    controlHeightSM: 32,
    controlHeightLG: 52,
  },
}

const resolvedToken = theme.getDesignToken(baseTheme)

export const cinemaTheme: ThemeConfig = {
  ...baseTheme,
  components: {
    Button: {
      textTextColor: resolvedToken.colorTextSecondary,
      textTextHoverColor: resolvedToken.colorText,
      textHoverBg: resolvedToken.colorFillTertiary,
    },
  },
}

// Preserve the existing 52px floating-label filters and 48px actions locally.
export const advancedSearchTheme: ThemeConfig = {
  token: {
    controlHeight: resolvedToken.controlHeightLG,
    fontSize: resolvedToken.fontSizeSM,
    borderRadius: resolvedToken.borderRadiusSM,
    colorText: resolvedToken.colorTextLabel,
  },
  components: {
    Input: { activeBg: 'transparent', hoverBg: 'transparent' },
    Select: { selectorBg: 'transparent' },
    Button: {
      controlHeight: resolvedToken.controlHeight,
      borderRadius: resolvedToken.borderRadius,
      defaultBg: 'transparent',
      defaultColor: resolvedToken.colorTextLabel,
    },
    Switch: {
      trackHeight: 24,
      trackMinWidth: 44,
      trackPadding: 3,
      handleSize: 18,
      handleBg: 'var(--cinema-switch-handle, var(--cinema-text-control))',
      colorTextQuaternary: resolvedToken.colorFillSecondary,
    },
  },
}

// This app has a single, static theme. Publish its resolved AntD tokens before
// React mounts so custom UI, Tailwind, and portaled content share one source.
export function applyCinemaTheme() {
  const token = theme.getDesignToken(cinemaTheme)
  const variables = {
    'primary': token.colorPrimary,
    'primary-hover': token.colorPrimaryHover,
    'background': token.colorBgLayout,
    'surface': token.colorBgContainer,
    'surface-elevated': token.colorBgElevated,
    'text': token.colorText,
    'text-secondary': token.colorTextSecondary,
    'text-placeholder': token.colorTextPlaceholder,
    'text-control': token.colorTextLabel,
    'text-on-primary': token.colorTextLightSolid,
    'border': token.colorBorder,
    'fill': token.colorFillSecondary,
    'fill-hover': token.colorFillTertiary,
    'success': token.colorSuccess,
    'warning': token.colorWarning,
    'error': token.colorError,
    'font-family': token.fontFamily,
    'font-size': `${token.fontSize}px`,
    'line-height': String(token.lineHeight),
    'radius': `${token.borderRadius}px`,
    'radius-sm': `${token.borderRadiusSM}px`,
    'radius-lg': `${token.borderRadiusLG}px`,
    'control-height': `${token.controlHeight}px`,
  }

  for (const [name, value] of Object.entries(variables)) {
    document.documentElement.style.setProperty(`--cinema-${name}`, value)
  }
}
