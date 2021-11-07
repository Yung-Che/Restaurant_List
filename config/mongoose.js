const mongoose = require('mongoose')


// setting mongoose connected
mongoose.connect('mongodb://localhost/RestaurantList')

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db