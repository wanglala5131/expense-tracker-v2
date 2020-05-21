


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

// function modalNumber() {
//   //存放已存在的號碼
//   let existNumber = []

//   //隨機產生號碼並給players並加入existNumber，若重複則會重新產生
//   for (i = 0; i < players.length; i++) {
//     let number = ticketNumber()
//     while (existNumber.includes(number)) {   //CHECK是否重複
//       number = ticketNumber()
//     }
//     existNumber.push(number)      //放到existNumber
//     players[i].ticket = number    //分給players
//   }
// }

