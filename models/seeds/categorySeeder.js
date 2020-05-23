const Category = require('../category')
const categoryList = require('../seeds/category.json').results
const db = require('../../config/mongoose')

db.once('open', async () => {
  //助教提供的方法
  await Promise.all(
    categoryList.map((category) => {
      console.log(category);
      return Category.create(category)
    })
  )

  // for (let i = 0; i < categoryList.length; i++) {
  //   Category.create({
  //     category: categoryList[i].category,
  //     category_en: categoryList[i].category_en
  //   })
  // }
  console.log('Category seeds are created!!')
})