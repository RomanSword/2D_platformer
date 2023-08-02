const getImage = async (src) => {
  return await new Promise((resolve, reject) => {
    try {
      const image = new Image()

      image.src = src
      image.onload = () => resolve(image)
    } catch (error) {
      reject(error)
    }
  })
}

const debounce = (func, timeout = 1000) => {
  let timer

  return (...args) => {
    clearTimeout(timer)

    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}

export { getImage, debounce }
