'use client'

import { useTheme } from 'next-themes'
import type React from 'react'

export type ToasterProps = React.HTMLAttributes<HTMLDivElement> & {
    theme?: 'light' | 'dark' | 'system'
    position?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'
    toastOptions?: {
        style?: React.CSSProperties
    }
}

const Toaster = ({
    className,
    style,
    theme: themeProp,
    position,
    toastOptions,
    ...props
}: ToasterProps) => {
    const { theme = 'system' } = useTheme()
    const currentTheme = themeProp ?? theme
    const [vertical, horizontal] = (position ?? 'bottom-center').split('-')
    const isTop = vertical === 'top'
    const isCenter = horizontal === 'center'
    const isRight = horizontal === 'right'

    return (
        <div
            data-theme={currentTheme}
            aria-hidden
            className={className ?? 'toaster group'}
            style={
                {
                    position: 'fixed',
                    zIndex: 50,
                    pointerEvents: 'none',
                    [isTop ? 'top' : 'bottom']: '1rem',
                    [isCenter ? 'left' : isRight ? 'right' : 'left']: '1rem',
                    transform: isCenter ? 'translateX(-50%)' : undefined,
                    '--normal-bg': 'var(--popover)',
                    '--normal-text': 'var(--popover-foreground)',
                    '--normal-border': 'var(--border)',
                    ...toastOptions?.style,
                    ...style,
                } as React.CSSProperties
            }
            {...props}
        />
    )
}

export { Toaster }
