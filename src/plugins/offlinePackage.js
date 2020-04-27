// 离线包处理
import { hideNavBar } from '@/utils/appMethod';
((window) => {
  // 离线包调用app navbar
  if (process.env.VUE_APP_IS_SHOW_HEADER === 'true') {
    window.onload = () => {
      hideNavBar()
    }
  }
})(window)
