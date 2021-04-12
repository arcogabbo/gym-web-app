//NOTA: il delete della sessione verrà fatto lato client visto che il jwt
//è immagazzinato nel browser del client come cookie

const user_controller=require('../controllers/user_controller.js')
const express=require('express')
const utility=require('../utility/utility.js')
const router=express.Router()

router.post('/login',user_controller.create_session)

router.post('/user',user_controller.create_user)

//il middleware auth controlla che l'utente sia loggato
//prima di soddisfare la richiesta
router.get('/user',utility.auth, user_controller.get_profile_info)

router.get('/user/des',utility.auth,user_controller.get_des)

router.put('/user/des',utility.auth,user_controller.update_des)

router.get('/user/pic',utility.auth,user_controller.get_pic)

router.put('/user/pic',utility.auth,user_controller.update_pic)

router.get('/user/pr',utility.auth, user_controller.get_pr)

router.put('/user/pr',utility.auth, user_controller.update_pr)

//l'endpoint user serve per le operazioni sull'utente, profile serve solo lato client

router.get('/profile',utility.auth,user_controller.get_profile_by_mail)

router.get('/profile/:id',utility.auth,user_controller.get_profile_by_id)

router.get('/news',utility.auth,user_controller.get_news)

router.get('/diary',utility.auth,user_controller.get_diary)

router.put('/diary',utility.auth,user_controller.update_diary)

router.delete('/diary',utility.auth,user_controller.delete_diary)

module.exports=router