export function useLogger() {
  const config = useRuntimeConfig()

  const isProd = config.public.nodeEnv === 'production'

  function logAndTrack(...args: any[]) {
    if (isProd) {
      // @TODO send to sentry
    }

    console.log(...args)
  }

  return { logAndTrack }
}
