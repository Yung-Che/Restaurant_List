const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// Create
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, name_en, category, image, location, phone, google_map, description } = req.body
  Restaurant.create({ name, name_en, category, image, location, phone, google_map, description, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// detail
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const id = req.params.id
  return Restaurant.findById({ _id: id, userId })
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// edit
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const id = req.params.id
  return Restaurant.findById({ _id: id, userId })
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const id = req.params.id
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = name,
        restaurant.name_en = name_en,
        restaurant.category = category,
        restaurant.image = image,
        restaurant.location = location,
        restaurant.phone = phone,
        restaurant.google_map = google_map,
        restaurant.rating = rating,
        restaurant.description = description,
        restaurant.userId = userId
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

// delete
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const id = req.params.id
  return Restaurant.findById({ _id: id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


module.exports = router
// const express = require('express')
// const router = express.Router()
// const Restaurant = require('../../models/restaurant')

// // Create
// router.get('/new', (req, res) => {
//   return res.render('new')
// })

// router.post('/', (req, res) => {
//   Restaurant.create(req.body)
//     .then(() => res.redirect('/'))
//     .catch(error => console.log(error))
// })

// // detail
// router.get('/:id', (req, res) => {
//   const userId = req.user._id
//   const _id = req.params.id
//   return Restaurant.findById({_id, userId})
//     .lean()
//     .then((restaurant) => res.render('show', { restaurant }))
//     .catch(error => console.log(error))
// })

// // edit
// router.get('/:id/edit', (req, res) => {
//   const userId = req.user._id
//   const _id = req.params.id
//   return Restaurant.findById({ _id, userId })
//     .lean()
//     .then((restaurant) => res.render('edit', { restaurant }))
//     .catch(error => console.log(error))
// })

// router.put('/:id', (req, res) => {
//   const userId = req.user._id
//   const _id = req.params.id
//   const name = req.body.name
//   const name_en = req.body.name_en
//   const category = req.body.category
//   const image = req.body.image
//   const location = req.body.location
//   const phone = req.body.phone
//   const google_map = req.body.google_map
//   const rating = req.body.rating
//   const description = req.body.description
//   return Restaurant.findById({ _id, userId })
//     .then(restaurant => {
//       restaurant.name = name,
//         restaurant.name_en = name_en,
//         restaurant.category = category,
//         restaurant.image = image,
//         restaurant.location = location,
//         restaurant.phone = phone,
//         restaurant.google_map = google_map,
//         restaurant.rating = rating,
//         restaurant.description = description
//       return restaurant.save()
//     })
//     .then(() => res.redirect(`/restaurants/${_id}`))
//     .catch(error => console.log(error))
// })

// // delete
// router.delete('/:id', (req, res) => {
//   const userId = req.user._id
//   const _id = req.params.id
//   return Restaurant.findById(_id)
//     .then(restaurant => restaurant.remove())
//     .then(() => res.redirect('/'))
//     .catch(error => console.log(error))
// })


// module.exports = router