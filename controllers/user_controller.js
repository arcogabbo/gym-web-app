const user=require('../models/user_model.js')
const utility=require('../utility/utility.js')
const config=require('../utility/config.js')

module.exports={
	create_session:async(req,res)=>{
		var params=utility.get_parameters(req)
		var utente=await user.read_by_mail(params.mail)
		//se l'utente esiste
		if(utente)
		{
			//procedo con il check della password
			//utente[0].password contiene l'hash della password
			var flag=await user.validate_user(params.password,utente[0].password)
			if(flag){
				//log-in corretto, creo il token e lo ritorno
				var token_data={
					id:utente[0].id,
					mail:utente[0].mail,
					name:utente[0].name,
					surname:utente[0].surname,
					mail:utente[0].mail,
					is_accepted:utente[0].is_accepted,
					is_admin:utente[0].is_admin,
					gender:utente[0].gender
				}
				//questa funzione si occuperà anche di mandare la risposta
				utility.jwt_sign(res,token_data)
			}else{
				//password errata
				utility.json_response(res,400,{msg:'Parametri errati'})
			}
		}else
		{
			utility.json_response(res,400,{msg:'Atleta non accettato'})
		}
	},

	create_user:async(req,res)=>{
		var params=utility.get_parameters(req)
		var utente=await user.read_by_mail(params.mail)
		
		//se l'utente esiste già
		if(utente){
			utility.json_response(res,409,{msg:'mail già usata'})
		}else{
			//procedo con la registrazione
			var result=await user.create(params.mail,params.name,params.surname,params.password,params.gender)
			if(result){
				//registrazione avvenuta senza errori
				utility.json_response(res,200,{msg:'registrazione avvenuta'})
			}else{
				utility.json_response(res,500,{msg:'Errore registrazione'})
			}
		}
	},

	get_profile_by_mail:async(req,res)=>{
		var params=utility.get_parameters(req)
		var utente=await user.read_info_by_mail(params.mail)

		let file=await utility.find_pic_by_id(utente[0].id)

		var exercises=await user.get_exercises()
		if(utente){
			var prs=await user.get_prs_by_id(utente[0].id)
			var profile_img=await utility.find_pic_by_id(req.user.id)
			var news_count=await user.news_count()
			var obj={
				requested:{
					name:utente[0].name,
					id:utente[0].id,
					surname:utente[0].surname,
					description:utente[0].description,
					file_info:file ? file : {name:"default",extension:"png"}
				},
				prs,
				exercises,
				user:req.user,
				pic: profile_img?profile_img.name+"."+profile_img.extension:"default.png",
				news_count
			}
			res.render('profile.ejs',obj)
		}else{
			utility.json_response(res,404,{msg:'Utente inesistente'})
		}
	},

	get_profile_by_id:async(req,res)=>{
		var utente=await user.read_info_by_id(req.params.id)

		let file=await utility.find_pic_by_id(req.params.id)
		
		var exercises=await user.get_exercises()
		if(utente){
			var prs=await user.get_prs_by_id(utente[0].id)
			var profile_img=await utility.find_pic_by_id(req.user.id)
			var news_count=await user.news_count()
			var obj={
				requested:{
					name:utente[0].name,
					id:utente[0].id,
					surname:utente[0].surname,
					description:utente[0].description,
					file_info:file ? file : {name:"default",extension:"png"}
				},
				prs,
				exercises,
				user:req.user,
				pic: profile_img?profile_img.name+"."+profile_img.extension:"default.png",
				news_count
			}
			res.render('profile.ejs',obj)
		}else{
			utility.json_response(res,404,{msg:'Utente inesistente'})
		}
	},

	get_profile_info:async(req,res)=>{
		const params=utility.get_parameters(req)

		if(params.id){
			var utente=await user.read_info_by_id(params.id)
			var pic=await utility.find_pic_by_id(params.id)
			var prs=await user.get_prs_by_id(utente[0].id)
			var obj={
				utente:{
					name:utente[0].name,
					id:utente[0].id,
					surname:utente[0].surname,
					description:utente[0].description,
				},
				pic,
				prs
			}
			utility.json_response(res,200,{data:obj})
		}else{
			utility.json_response(res,400,{msg:"Parametri errati"})
		}
	},

	get_des:async(req,res)=>{
		const params=utility.get_parameters(req)

		var result=await user.get_description_by_id(params.id)

		if(result){
			utility.json_response(res,200,{data:result})
		}else{
			utility.json_response(res,500,{msg:"Errore ottenimento descrizione"})
		}
	},

	update_des:async(req,res)=>{
		const params=utility.get_parameters(req)


		let result=await user.get_description_by_id(req.user.id)

		if(result){
			result=await user.update_description(req.user.id,params.description)
		}else{
			result=await user.insert_description(req.user.id,params.description)
		}

		//refresh (da implementare i flash dopo)
		utility.json_response(res,200,{msg:"Descrizione salvata correttamente"})
	},

	get_pic:async(req,res)=>{
		const params=utility.get_parameters(req)

		if(params.id){
			var file_info=await utility.find_pic_by_id(params.id)

			utility.json_response(res,200,{data:file_info?'/images/'+file_info.name+'.'+file_info.extension:"/images/default.png"})
		}else{
			utility.json_response(res,400,{msg:"Parametri errati"})
		}
	},

	update_pic:async(req,res)=>{
		//elimino la pic precedente se esistente
		var file_info=await utility.find_pic_by_id(req.user.id)
		var flag=false

		if(file_info)
			flag=utility.delete_pic_by_path(file_info)
		
		//prendo l'id dalla sessione
		let utente=await user.read_info_by_id(req.user.id)
		
		if(req.files){
			//console.log(req.files)
			var file = req.files.file;
			var extension=file.name.split('.').pop()

			var path=config.path_to_images+utente[0].id+"."+extension
			file.mv(path,(err)=>{
			    if (err) return utility.json_response(res,500,{msg:"Impossibile caricare l'immagine"})

			    //refresh (da implementare i flash dopo)
		    	utility.json_response(res,200,{msg:"Immagine caricata correttamente"})
			})
		}
	},

	get_pr:async(req,res)=>{
		const params=utility.get_parameters(req)

		var prs=await user.get_user_prs_by_exercise_id(params.id,params.exercise_id)

		if(prs){
			utility.json_response(res,200,{data:prs})
		}else{
			utility.json_response(res,500,{msg:"Errore ottenimento record"})
		}
	},

	update_pr:async(req,res)=>{
		const params=utility.get_parameters(req)

		//controllo se l'utente ha già inserito il pr di quell'esercizio
		var prs=await user.get_user_prs_by_exercise_id(req.user.id,params.exercise_id)

		if(prs){
			//bisogna fare l'update
			var result=await user.update_pr(params.exercise_id,req.user.id,req.user.gender,params.value)
			if(result){
				utility.json_response(res,200,{msg:"PR aggiornato correttamente"})
			}else{
				utility.json_response(res,500,{msg:"Errore aggiornamento PR"})
			}
		}else{
			//bisogna fare l'inserimento
			var result=await user.insert_pr(params.exercise_id,req.user.id,req.user.gender,params.value)
			if(result){
				utility.json_response(res,200,{msg:"PR aggiornato correttamente"})
			}else{
				utility.json_response(res,500,{msg:"Errore aggiornamento PR"})
			}
		}
	},

	get_news:async(req,res)=>{
		const params=utility.get_parameters(req)
		if(params.id){
			var result=await user.get_news_by_id(params.id)

			if(result){
				utility.json_response(res,200,{data:result})
			}else{
				utility.json_response(res,500,{msg:"Errore fetch delle news"})
			}
		}else{
			var result=await user.get_future_news()

			if(result){
				utility.json_response(res,200,{data:result})
			}else{
				utility.json_response(res,500,{msg:"Errore fetch delle news"})
			}
		}
	},

	get_diary:async(req,res)=>{
		const params=utility.get_parameters(req)

		if(params.lesson_id){
			var result=await user.get_lesson_diary(params.lesson_id,req.user.id)

			if(result){
				utility.json_response(res,200,{data:result})
			}else{
				utility.json_response(res,500,{msg:"Errore fetch del diario"})
			}
		}else{
			var result=await user.get_diaries(req.user.id)

			if(result){
				utility.json_response(res,200,{data:result})
			}else{
				utility.json_response(res,500,{msg:"Diario vuoto o errore fetch"})
			}
		}
	},

	update_diary:async(req,res)=>{
		const params=utility.get_parameters(req)
		//controllo se l'utente aveva gia' una entry per quella lezione
		var result=await user.get_lesson_diary(params.lesson_id,req.user.id)

		if(result){
			//aggiornamento diario
			var result2=await user.update_diary_content(params.lesson_id,req.user.id,params.content)
			
			if(result2){
				utility.json_response(res,200,{msg:"Pagina aggiornata"})
			}else{
				utility.json_response(res,500,{msg:"Errore aggiornamento pagina"})
			}
		}else{
			//inserimento diario
			var result2=await user.insert_to_diary(params.lesson_id,params.date,req.user.id,params.content)
			
			if(result2){
				utility.json_response(res,200,{msg:"Inserito nel diario"})
			}else{
				utility.json_response(res,500,{msg:"Errore inserimento nel diario"})
			}
		}
	},

	delete_diary:async(req,res)=>{
		const params=utility.get_parameters(req)
		if(params.lesson_id){
			var result=await user.delete_diary(params.lesson_id,req.user.id)

			if(result){
				utility.json_response(res,200,{msg:"Pagina eliminata"})
			}else{
				utility.json_response(res,500,{msg:"Errore rimozione pagina"})
			}
		}else{
			utility.json_response(res,400,{msg:"Parametri errati"})
		}
	}
}