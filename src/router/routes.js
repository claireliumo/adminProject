export const rootRedirect = function (to, from, next) {
  // check login status
  let isLogin = true
  if (!isLogin) {
    next('/signin')
  }
}
