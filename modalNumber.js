function modalNumber() {
  const numberLength = 10
  let number = ""
  const letter = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  for (let i = 0; i < numberLength; i++) {
    number += letter[Math.floor(Math.random() * letter.length)]
  }

  return number
}

module.exports = modalNumber



