//NOTA: il delete della sessione verrà fatto lato client visto che il jwt
//è immagazzinato nel browser del client come cookie

const user_controller=require('../controllers/user_controller.js')
const express=require('express')
const utility=require('../utility/utility.js')
const router=express.Router()

router.post('/login',user_controller.create_session)

router.post('/profile',user_controller.create_user)

router.put('/profile/des',utility.auth,user_controller.update_des)

router.put('/profile/pic',utility.auth,user_controller.update_pic)

router.put('/profile/pr',utility.auth, user_controller.update_pr)

//il middleware auth controlla che l'utente sia loggato
//prima di soddisfare la richiesta
router.get('/profile',utility.auth,user_controller.get_profile_by_mail)

router.get('/profile/:id',utility.auth,user_controller.get_profile_by_id)

router.get('/news',utility.auth,user_controller.get_news)

module.exports=router