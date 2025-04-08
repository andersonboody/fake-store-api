import BrokerFile from '@/shared/assets/image/file.png'

export const imageVerification = (url: string) => {
  const regex = new RegExp(/^https:\/\/i\.imgur\.com\/[^\s]+(.*?).(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/)
  if (regex.test(url)) return url
  return BrokerFile
}
