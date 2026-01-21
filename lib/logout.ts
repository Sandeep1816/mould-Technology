export function logout(router?: any) {
  localStorage.removeItem("token")
  localStorage.removeItem("user")

  if (router) {
    router.replace("/login")
  } else {
    window.location.href = "/login"
  }
}
