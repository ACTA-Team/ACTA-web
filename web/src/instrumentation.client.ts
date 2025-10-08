import posthog from 'posthog-js'

// Inicializa PostHog en el cliente usando variables públicas de Next.js
posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY || '', {
  api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
  // Mantener el valor sugerido en tu snippet
  // (si la librería no reconoce 'defaults', simplemente lo ignorará)
  defaults: '2025-05-24',
})