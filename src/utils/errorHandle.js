import Toast from '@/assets/toast'
const errorHandle = (err) => {
  if (err && err.data) {
    Toast.text(err.data.message || '网络出小差了！')
  }
}

export default errorHandle
