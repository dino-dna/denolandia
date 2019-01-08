export function float (min: number, max: number) {
  return Math.random() * (max - min) + min
}

export function integer (min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function string (length: number) {
  var str = ''
  while (str.length < length) {
    str += String.fromCharCode(integer(97, 122))
  }
  return str
}
