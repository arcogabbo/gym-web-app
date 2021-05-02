//ROUTER RELATIVO ALLE AZIONI CHE IL CLIENT PUO' SVOLGERE

const express=require('express')
const router=express.Router()
const utility=require('../utility/utility.js')
const client_controller=require('../controllers/client_controller.js')
const admin_controller=require('../controllers/admin_controller.js')

router.get('/',client_controller.home)

router.get('/dashboard', client_controller.dashboard)

router.get('/register', client_controller.register)

router.get('/dashboard/news', client_controller.news_page)

router.get('/dashboard/leaderboard',client_controller.leaderboard_page)

router.get('/dashboard/diary', client_controller.diary_page)

//routes per l'admin sul client
router.get('/administrate',utility.auth,admin_controller.admin_panel)

router.get('/administrate/certificates', utility.auth, admin_controller.show_certificates)

router.get('/administrate/lessons', utility.auth, admin_controller.admin_lessons)

router.get('/administrate/news', utility.auth, admin_controller.admin_news)

module.exports=router