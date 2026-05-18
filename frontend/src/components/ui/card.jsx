import * as React from 'react'

import { cn } from '@/lib/utils'

function Card({ className, ...props }) {
  return (
    <div
      data-slot="card"
      className={cn(
        'rounded-3xl border border-border/70 bg-card/95 text-card-foreground shadow-[0_20px_60px_-20px_rgba(15,23,42,0.25)] backdrop-blur-xl',
        className,
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }) {
  return (
    <div
      data-slot="card-header"
      className={cn('flex flex-col space-y-2 px-8 pt-8 pb-0 text-center sm:text-left', className)}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }) {
  return (
    <h1
      data-slot="card-title"
      className={cn('text-2xl font-semibold tracking-tight text-foreground', className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }) {
  return (
    <p
      data-slot="card-description"
      className={cn('text-sm leading-6 text-muted-foreground', className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }) {
  return <div data-slot="card-content" className={cn('px-8 py-8', className)} {...props} />
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent }