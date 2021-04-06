const admin=require('../models/admin_model.js')
const utility=require('../utility/utility.js')

module.exports={
	admin_panel:async(req,res)=>{
		//check se l'utente in sessione e' admin
		if(!admin.is_admin(req.user.id)) return utility.json_response(res,401,{msg:"Non autorizzato"})
		
		var result=await admin.get_to_accept()

		res.render('admin_panel.ejs',{user:req.user, to_accept:result})
	},

	admin_lessons:async(req,res)=>{
		if(!admin.is_admin(req.user.id)) return utility.json_response(res,401,{msg:"Non autorizzato"})

		var result=await admin.get_lessons()

		res.render('admin_lessons.ejs',{lessons:result})
	},

	accept_user:async(req,res)=>{
		if(!admin.is_admin(req.user.id)) return utility.json_response(res,401,{msg:"Non autorizzato"})
		const params=utility.get_parameters(req)

		var result=await admin.accept_user(params.id)

		if(result){
			utility.json_response(res,200,{msg:"Utente accettato correttamente"})
		}else{
			utility.json_response(res,500,{msg:"Errore accettazione utente"})
		}
	},

	book:async(req,res)=>{
		if(!admin.is_admin(req.user.id)) return utility.json_response(res,401,{msg:"Non autorizzato"})
		const params=utility.get_parameters(req)

		switch(params.type){
			case "multiple":
				var result = await admin.multiple_book(params.capacity,params.initial_timestamp)
				if(result){
					utility.json_response(res,200,{msg:"Lezioni aggiunte correttamente"})
				}else{
					utility.json_response(res,500,{msg:"Errore inserimento lezioni"})
				}
				break
			case "single":
				var result = await admin.single_book(params.capacity,params.initial_timestamp)
				if(result){
					utility.json_response(res,200,{msg:"Lezioni aggiunte correttamente"})
				}else{
					utility.json_response(res,500,{msg:"Errore inserimento lezioni"})
				}
				break
			default:
				utility.json_response(res,400,{msg:"Errore parsing parametri"})
		}
		
	},

	delete_lesson:async(req,res)=>{
		if(!admin.is_admin(req.user.id)) return utility.json_response(res,401,{msg:"Non autorizzato"})
		const params=utility.get_parameters(req)

		var result=await admin.delete_lesson(params.id)

		if(result){
			await admin.delete_books_on_lesson(params.id)
			utility.json_response(res,200,{msg:"Lezione rimossa correttamente"})
		}else{
			utility.json_response(res,500,{msg:"Errore rimozione lezione"})
		}
	},

	show_certificates:async(req,res)=>{
		if(!admin.is_admin(req.user.id)) return utility.json_response(res,401,{msg:"Non autorizzato"})
		
		var certificates=await admin.get_certificates()
		var users=await admin.get_users()

		res.render('admin_certificates.ejs',{certificates,users})
	},

	update_certificates:async(req,res)=>{
		if(!admin.is_admin(req.user.id)) return utility.json_response(res,401,{msg:"Non autorizzato"})
		const params=utility.get_parameters(req)
		console.log(params)
		//controllo se l'utente al quale si vuole inserire l'abbonamento abbia
		//gia' il record sul db
		var certificates=await admin.get_certificates()
		var to_update=false
		for(var i in certificates){
			if(certificates[i].id==params.id){
				to_update=true
				break
			}
		}

		switch(params.type){
			case 'certificate':
				var result=to_update ? await admin.update_certificate(params.date,params.id) : await admin.create_certificate(params.date,params.id)
				if(result){
					utility.json_response(res,200,{msg:"Certificato aggiunto correttamente"})
				}else{
					utility.json_response(res,500,{msg:"Errore inserimento certificato"})
				}
				break
			case 'subscription':
				var result=to_update ? await admin.update_subscription(params.date,params.id) : await admin.create_subscription(params.date,params.id)
				if(result){
					utility.json_response(res,200,{msg:"Abbonamento aggiunto correttamente"})
				}else{
					utility.json_response(res,500,{msg:"Errore inserimento abbonamento"})
				}
				break
			default:
				utility.json_response(res,400,{msg:"Errore parsing parametri"})
		}
	},

	delete_certificates:async(req,res)=>{
		if(!admin.is_admin(req.user.id)) return utility.json_response(res,401,{msg:"Non autorizzato"})
		const params=utility.get_parameters(req)
		
		var result=await admin.delete_certificates(params.id)

		if(result){
			utility.json_response(res,200,{msg:"Certificati rimossi correttamente"})
		}else{
			utility.json_response(res,500,{msg:"Errore rimozione certificati"})
		}
	}
}