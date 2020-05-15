import Toast from '@/assets/toast'
const errorHandle = (err) => {
  if (err) {
    setTimeout(() => {
      Toast.text(err.message)
    }, 300)
  }
}

export default errorHandle
