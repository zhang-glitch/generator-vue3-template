const utils: any = {}

utils.setItem = (key: string, value: any) => {
  if (!key) {
    return false
  } else {
    localStorage.setItem(key, value)
  }
}

utils.getItem = (key: string) => {
  const item = localStorage.getItem(key)
  if (!item) {
    return false
  } else {
    return item
  }
}

utils.removeItem = (key: string) => {
  localStorage.removeItem(key)
}

export default utils
