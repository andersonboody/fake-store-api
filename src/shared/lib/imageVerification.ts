export const imageVerification = (url: string) => {
  const regex = new RegExp(/[^\s]+(.*?).(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/)
  if (regex.test(url)) return true
  return false
}
//https://i.imgur.com/AzAY4Ed.jpeg
