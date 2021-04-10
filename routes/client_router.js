const express=require('express')
const router=express.Router()
const utility=require('../utility/utility.js')
const client_controller=require('../controllers/client_controller.js')

router.get('/',client_controller.home)

router.get('/dashboard', client_controller.dashboard)

router.get('/register', client_controller.register)

router.get('/dashboard/news', client_controller.news_page)

router.get('/dashboard/leaderboard',client_controller.leaderboard_page)

router.get('/dashboard/diary', client_controller.diary_page)

module.exports=router