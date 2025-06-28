'use client'

import { useEffect } from 'react'

export default function HydrationFix() {
  // Suppress hydration warnings for Grammarly extension attributes
  useEffect(() => {
    // Remove data attributes added by Grammarly browser extension
    const body = document.querySelector('body')
    if (body) {
      body.removeAttribute('data-new-gr-c-s-check-loaded')
      body.removeAttribute('data-gr-ext-installed')
    }
  }, [])

  return null
}