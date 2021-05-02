const admin=require('../models/admin_model.js')
const utility=require('../utility/utility.js')
const user=require('../models/user_model.js')

module.exports={
	admin_panel:async(req,res)=>{
		//check se l'utente in sessione e' admin
		if(!req.user.is_admin) return utility.json_response(res,401,{msg:"Non autorizzato"})
		
		var result=await admin.get_to_accept()
		var image=await utility.find_pic_by_id(req.user.id)
		var news_count=await user.news_count()

		//renderizzo attraverso ejs
		res.render('admin_panel.ejs',{user:req.user, to_accept:result,pic: image?image.name+"."+image.extension:"default.png",news_count})
	},

	admin_lessons:async(req,res)=>{
		if(!req.user.is_admin) return utility.json_response(res,401,{msg:"Non autorizzato"})

		var result=await admin.get_lessons()
		var partecipants={}
		//per ogni lezione futura ottengo i partecipanti
		for(var i in result){
			var x=await admin.get_lessons_partecipants(result[i].id)
			//creo un array relativo alla lezione
			
			partecipants['lesson_'+result[i].id]=[]
			if(x){
				for(var j in x){
					partecipants['lesson_'+x[0].lesson_id].push({name:x[j].user_name,surname:x[j].user_surname})
				}
			}
		}

		var image=await utility.find_pic_by_id(req.user.id)
		var news_count=await user.news_count()

		//render
		res.render('admin_lessons.ejs',{lessons:result,partecipants,user:req.user, pic: image?image.name+"."+image.extension:"default.png",news_count})
	},

	accept_user:async(req,res)=>{
		if(!req.user.is_admin) return utility.json_response(res,401,{msg:"Non autorizzato"})

		var result=await admin.accept_user(req.params.id)

		if(result){
			utility.json_response(res,200,{msg:"Utente accettato correttamente"})
		}else{
			utility.json_response(res,500,{msg:"Errore accettazione utente"})
		}
	},

	book:async(req,res)=>{
		if(!req.user.is_admin) return utility.json_response(res,401,{msg:"Non autorizzato"})
		const params=utility.get_parameters(req)

		//switch in base al type passato come parametro per capire l'azione da intraprendere
		switch(params.type){
			case "multiple":
				var result = await admin.multiple_book(params.capacity,params.initial_timestamp)
				if(result){
					utility.json_response(res,200,{msg:"Lezioni aggiunte correttamente",ids:result})
				}else{
					utility.json_response(res,500,{msg:"Errore inserimento lezioni"})
				}
				break
			case "single":
				var result = await admin.single_book(params.capacity,params.initial_timestamp)
				if(result){
					utility.json_response(res,200,{msg:"Lezioni aggiunte correttamente",id:result})
				}else{
					utility.json_response(res,500,{msg:"Errore inserimento lezioni"})
				}
				break
			default:
				utility.json_response(res,400,{msg:"Errore parsing parametri"})
		}
		
	},

	delete_lesson:async(req,res)=>{
		if(!req.user.is_admin) return utility.json_response(res,401,{msg:"Non autorizzato"})

		var result=await admin.delete_lesson(req.params.id)

		if(result){
			await admin.delete_books_on_lesson(req.params.id)
			utility.json_response(res,200,{msg:"Lezione rimossa correttamente"})
		}else{
			utility.json_response(res,500,{msg:"Errore rimozione lezione"})
		}
	},

	get_certificates:async(req,res)=>{
		if(!req.user.is_admin) return utility.json_response(res,401,{msg:"Non autorizzato"})

		var certificates=await admin.get_certificates()

		if(certificates){
			utility.json_response(res,200,{data:certificates})
		}else{
			utility.json_response(res,200,{data:null})
		}
	},

	show_certificates:async(req,res)=>{
		if(!req.user.is_admin) return utility.json_response(res,401,{msg:"Non autorizzato"})
		
		var certificates=await admin.get_certificates()
		var users=await admin.get_users()

		var image=await utility.find_pic_by_id(req.user.id)
		var news_count=await user.news_count()
		res.render('admin_certificates.ejs',{certificates,users,user:req.user, pic: image?image.name+"."+image.extension:"default.png",news_count})
	},

	update_certificates:async(req,res)=>{
		if(!req.user.is_admin) return utility.json_response(res,401,{msg:"Non autorizzato"})
		const params=utility.get_parameters(req)
		//controllo se l'utente al quale si vuole inserire l'abbonamento abbia
		//gia' la entry sul db
		var certificates=await admin.get_certificates()
		var to_update=false
		for(var i in certificates){
			if(certificates[i].id==req.params.id){
				to_update=true
				break
			}
		}

		switch(params.type){
			case 'certificate':
				var result=to_update ? await admin.update_certificate(params.date,req.params.id) : await admin.create_certificate(params.date,req.params.id)
				if(result){
					utility.json_response(res,200,{msg:"Certificato aggiunto correttamente"})
				}else{
					utility.json_response(res,500,{msg:"Errore inserimento certificato"})
				}
				break
			case 'subscription':
				var result=to_update ? await admin.update_subscription(params.date,req.params.id) : await admin.create_subscription(params.date,req.params.id)
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

	//elimino tutti i certificati di uno specifico utente
	delete_certificates:async(req,res)=>{
		if(!req.user.is_admin) return utility.json_response(res,401,{msg:"Non autorizzato"})
		
		var result=await admin.delete_certificates(req.params.id)

		if(result){
			utility.json_response(res,200,{msg:"Certificati rimossi correttamente"})
		}else{
			utility.json_response(res,500,{msg:"Errore rimozione certificati"})
		}
	},

	admin_news:async(req,res)=>{
		if(!req.user.is_admin) return utility.json_response(res,401,{msg:"Non autorizzato"})
		
		var news=await user.get_future_news()
		var all_news=await admin.get_all_news()

		var image=await utility.find_pic_by_id(req.user.id)
		var news_count=await user.news_count()

		res.render("admin_news.ejs",{news,all_news,user:req.user, pic: image?image.name+"."+image.extension:"default.png",news_count})
	},

	delete_news:async(req,res)=>{
		if(!req.user.is_admin) return utility.json_response(res,401,{msg:"Non autorizzato"})
		
		var result=await admin.delete_news(req.params.id)
		if(result){
			utility.json_response(res,200,{msg:"Notizia rimossa correttamente"})
		}else{
			utility.json_response(res,500,{msg:"Errore rimozione notizia"})
		}
	},

	create_news:async(req,res)=>{
		if(!req.user.is_admin) return utility.json_response(res,401,{msg:"Non autorizzato"})
		const params=utility.get_parameters(req)
		
		var result=await admin.insert_news(params.expire_date,params.title,params.content)
		if(result){
			utility.json_response(res,200,{msg:"Notizia aggiunta correttamente",id:result})
		}else{
			utility.json_response(res,500,{msg:"Errore aggiunta notizia"})
		}
	},

	//update di una news(possibile fare l'update di tutte le componenti o alcune scelte)
	update_news:async(req,res)=>{
		if(!req.user.is_admin) return utility.json_response(res,401,{msg:"Non autorizzato"})
		const params=utility.get_parameters(req)

		if(params.title != null){
			var result1=await admin.update_news_title(req.params.id,params.title)
		}
		if(params.expire_date != null){
			var result2=await admin.update_news_date(req.params.id,params.expire_date)
		}
		if(params.content != null){
			var result3=await admin.update_news_content(req.params.id,params.content)
		}

		if(result1 || result2 || result3){
			utility.json_response(res,200,{msg:"Notizia aggiornata correttamente"})
		}else{
			utility.json_response(res,500,{msg:"Errore aggiornamento notizia"})
		}
	}
}