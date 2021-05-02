//ROUTER RELATIVO ALLE AZIONI CHE L'ADMIN PUO' SVOLGERE

const admin_controller=require('../controllers/admin_controller.js')
const express=require('express')
const utility=require('../utility/utility.js')
const router=express.Router()

router.put('/user/:id',utility.auth,admin_controller.accept_user)

router.post('/lesson',utility.auth,admin_controller.book)

router.delete('/lesson/:id',utility.auth,admin_controller.delete_lesson)

router.get('/certificates',utility.auth,admin_controller.get_certificates)

router.put('/certificates/:id',utility.auth,admin_controller.update_certificates)

router.delete('/certificates/:id',utility.auth,admin_controller.delete_certificates)

router.delete('/news/:id',utility.auth,admin_controller.delete_news)

router.put('/news/:id',utility.auth,admin_controller.update_news)

router.post('/news',utility.auth,admin_controller.create_news)

module.exports=router