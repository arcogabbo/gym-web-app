//ROUTER RELATIVO ALLE AZIONI CHE L'UTENTE PUO' SVOLGERE

const user_controller=require('../controllers/user_controller.js')
const express=require('express')
const utility=require('../utility/utility.js')
const router=express.Router()
const { check, validationResult } = require('express-validator');

router.post('/login',user_controller.create_session)

router.post('/user',
	// check mail
  	check('mail','Email errata').isEmail(),
  	// password deve essere lunga minimo 4 caratteri
  	check('password','La password deve essere formata da almeno 4 caratteri').isLength({ min: 4 }),
  	check('name','Il nome deve essere inserito').notEmpty(),
  	check('surname','Il cognome deve essere inserito').notEmpty(),
  	check('gender','Parametro errato').custom((value) => value >= 0 && value <= 1),
  	user_controller.create_user)

//il middleware auth controlla che l'utente sia loggato
//prima di soddisfare la richiesta
router.get('/user/:id',utility.auth, user_controller.get_profile_info)

router.get('/user/:id/des',utility.auth,user_controller.get_des)

router.put('/user/:id/des',utility.auth,user_controller.update_des)

router.get('/user/:id/pic',utility.auth,user_controller.get_pic)

router.put('/user/:id/pic',utility.auth,user_controller.update_pic)

router.get('/user/:id/pr',utility.auth, user_controller.get_pr)

router.put('/user/:id/pr',utility.auth, user_controller.update_pr)

//l'endpoint user serve per le operazioni sull'utente, profile serve solo lato client

router.get('/profile/:id',utility.auth,user_controller.get_profile_by_id)

router.get('/news',utility.auth,user_controller.get_all_news)

router.get('/news/:id',utility.auth,user_controller.get_news)

router.get('/diary/:id',utility.auth,user_controller.get_diary)

router.put('/diary/:id',utility.auth,user_controller.update_diary)

router.delete('/diary/:id',utility.auth,user_controller.delete_diary_page)

module.exports=router