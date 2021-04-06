const user=require('../models/user_model.js')
const utility=require('../utility/utility.js')

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
					is_accepted:utente[0].is_accepted
				}
				//questa funzione si occuperà anche di mandare la risposta
				utility.jwt_sign(res,token_data)
			}else{
				//password errata
				utility.json_response(res,400,{msg:'Parametri errati'})
			}
		}else
		{
			utility.json_response(res,400,{msg:'Parametri errati'})
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
			var result=await user.create(params.mail,params.name,params.surname,params.password)
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

		if(utente){
			//parte di EJS
			var obj={
				user:{
					name:req.user.name,
					id:req.user.id,
					surname:req.user.surname
				},
				requested:{
					name:utente[0].name,
					id:utente[0].id,
					surname:utente[0].surname,
					description:utente[0].description,
					file_info:file ? file : {name:"default",extension:"png"}
				}
			}
			res.render('profile.ejs',obj)
		}else{
			utility.json_response(res,404,{msg:'Utente inesistente'})
		}
	},

	get_profile_by_id:async(req,res)=>{
		var utente=await user.read_info_by_id(req.params.id)

		let file=await utility.find_pic_by_id(req.params.id)
		if(utente){
			//parte di EJS
			var obj={
				user:{
					name:req.user.name,
					id:req.user.id,
					surname:req.user.surname
				},
				requested:{
					name:utente[0].name,
					id:utente[0].id,
					surname:utente[0].surname,
					description:utente[0].description,
					file_info:file ? file : {name:"default",extension:"png"}
				}
			}
			res.render('profile.ejs',obj)
		}else{
			utility.json_response(res,404,{msg:'Utente inesistente'})
		}
	},

	update_des:async(req,res)=>{
		if(!utility.is_auth(req)){ 
			return utility.json_response(res,401,{msg:"Non autorizzato"})
		}

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

	update_pic:async(req,res)=>{
		if(!utility.is_auth(req)){ 
			return utility.json_response(res,401,{msg:"Non autorizzato"})
		}

		
		//elimino la pic precedente se esistente
		var file_info=await utility.find_pic_by_id(req.user.id)
		var flag=false

		if(file_info)
			flag=utility.delete_pic_by_path(file_info)
		
		//prendo l'id dalla sessione
		let utente=await user.read_by_id(req.user.id)
		
		if(req.files){
			//console.log(req.files)
			var file = req.files.file;
			var extension=file.name.split('.').pop()
			var path="/home/arcogabbo/Scrivania/cscarab_webapp/static/images/"+utente[0].id+"."+extension
			file.mv(path,(err)=>{
			    if (err) return utility.json_response(res,500,{msg:"Impossibile caricare l'immagine"})

			    //refresh (da implementare i flash dopo)
		    	utility.json_response(res,200,{msg:"Immagine caricata correttamente"})
			})
		}
	}
}