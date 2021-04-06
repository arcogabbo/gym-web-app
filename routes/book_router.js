const express=require('express')
const router=express.Router()
const book_controller=require('../controllers/book_controller.js')
const utility=require('../utility/utility.js')

router.post('/book', utility.auth, book_controller.create_book)

router.delete('/book',utility.auth, book_controller.delete_book)

router.get('/lessons',utility.auth,book_controller.get_future_lessons)

module.exports=router