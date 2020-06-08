function changeLanguage(category) {
  switch (category) {

    //英文改中文
    case 'householdSupplies':
      return '家居樂業'
    case 'transportation':
      return '交通出行'
    case 'leisure':
      return '休閒娛樂'
    case 'food':
      return '餐飲食品'
    case 'other':
      return '其他'
  }
}

module.exports = changeLanguage

