import Toast from '@/assets/toast'
const errorHandle = (err) => {
  if (err) {
    setTimeout(() => {
      Toast.text((err.data && err.data.message) || err.message || '网络出小差了！')
    }, 300)
  }
}

export default errorHandle
