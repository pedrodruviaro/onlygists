export function useSession() {
  const user = useSupabaseUser()
  const services = useServices()

  async function logout() {
    const response = await services.auth.signOut()
    return response
  }

  function isLogged() {
    const hasUserLogged = Boolean(user.value)
    return hasUserLogged
  }

  return {
    user,
    logout,
    isLogged,
  }
}
