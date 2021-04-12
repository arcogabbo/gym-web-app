//NOTA: il delete della sessione verrà fatto lato client visto che il jwt
//è immagazzinato nel browser del client come cookie

const user_controller=require('../controllers/user_controller.js')
const express=require('express')
const utility=require('../utility/utility.js')
const router=express.Router()

router.post('/login',user_controller.create_session)

router.post('/profile',user_controller.create_user)

//il middleware auth controlla che l'utente sia loggato
//prima di soddisfare la richiesta
router.get('/profile/info',utility.auth, user_controller.get_profile_info)

router.get('/profile/des',utility.auth,user_controller.get_des)

router.put('/profile/des',utility.auth,user_controller.update_des)

router.get('/profile/pic',utility.auth,user_controller.get_pic)

router.put('/profile/pic',utility.auth,user_controller.update_pic)

router.get('/profile/pr',utility.auth, user_controller.get_pr)

router.put('/profile/pr',utility.auth, user_controller.update_pr)

router.get('/profile',utility.auth,user_controller.get_profile_by_mail)

router.get('/profile/:id',utility.auth,user_controller.get_profile_by_id)

router.get('/news',utility.auth,user_controller.get_news)

router.get('/diary',utility.auth,user_controller.get_diary)

router.put('/diary',utility.auth,user_controller.update_diary)

router.delete('/diary',utility.auth,user_controller.delete_diary)

module.exports=router