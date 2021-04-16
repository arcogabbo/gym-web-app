const express=require('express')
const router=express.Router()
const book_controller=require('../controllers/book_controller.js')
const utility=require('../utility/utility.js')

router.post('/book/:lesson_id', utility.auth, book_controller.create_book)

router.delete('/book/:lesson_id',utility.auth, book_controller.delete_book)

router.get('/lesson',utility.auth,book_controller.get_future_lessons)

router.get('/lesson/:lesson_id',utility.auth,book_controller.get_lesson)

module.exports=router