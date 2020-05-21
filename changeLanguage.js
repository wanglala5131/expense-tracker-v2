

function changeLanguage(category) {
  switch (category) {
    //改變icon
    case '家居樂業':
      return 'fas fa-home'
    case '交通出行':
      return 'fas fa-shuttle-van'
    case '休閒娛樂':
      return 'fas fa-grin-beam'
    case '餐飲食品':
      return 'fas fa-utensils'
    case '其他':
      return 'fas fa-pen'

  }
}



module.exports = changeLanguage

