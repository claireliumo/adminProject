export const rootRedirect = function (to, from, next) {
  // check login status
  let isLogin = window.sessionStorage.getItem('isLogin');
  console.log('isLogin', isLogin);
  if (!isLogin) {
    next('/signin')
  } else {
    next('/main')
  }
}
