//NOTE: in jwt se la callback è inserita viene richiamata in modo asincrono

const config=require('../utility/config.js')
const jwt=require('jsonwebtoken')
const fs_promises=require('fs').promises
const path=require('path')

module.exports={
	//funzione utile per prendere i parametri dalla richiesta indipendentemente dal metodo
	get_parameters:(req)=>{
		switch(req.method)
		{
			case 'GET':
				return req.query
				break
			default:
				return req.body
		}
	},

	//metodo veloce per rispondere con un json e con un codice passato come parametro
	json_response:(res,code,message)=>{
		res.type('json')
		res.status(code).json(message)
	},

	//MIDDLEWARE per verificare se il token e' presente nella richiesta
	auth:(req,res,next)=>{
		var token = req.cookies.token;
		
		if(!token)
			return res.status(401).json({msg:"Non autorizzato"})

		jwt.verify(token,config.secret_key,(err,data)=>{
			if(err) return res.status(403).json({msg:"Errore token"})
			
			if(!data.is_accepted) return res.status(401).json({msg:"Non autorizzato"})

			req.user={
				id:data.id,
				name:data.name,
				surname:data.surname,
				mail:data.mail,
				is_accepted:data.is_accepted,
				is_admin:data.is_admin,
				gender:data.gender
			}
			
			next()
		})
	},

	//is auth a differenza di auth non manda la risposta e non è un middleware
	//consente quindi di decidere successivamente cosa fare nel caso il token sia corretto o sbagliato
	is_auth:(req)=>{
		var token = req.cookies.token;
		
		if(!token)
			return false

		let data=jwt.verify(token,config.secret_key)

		if(!data.is_accepted) return false

		if(data){
			req.user={
				id:data.id,
				name:data.name,
				surname:data.surname,
				mail:data.mail,
				is_accepted:data.is_accepted,
				is_admin:data.is_admin,
				gender:data.gender
			}
			return true
		}

		return false
	},

	//jwt_sign viene utilizzata nella creazione della sessione e crea il token
	jwt_sign:(res,obj)=>{
		// tempo diviso 1000 perchè la libreria lo vuole espresso in secondi quando viene passato un intero
		jwt.sign(obj,config.secret_key,{expiresIn:config.cookie_time_expire_in_ms/1000},(err,token)=>{
			if(err){
				if(config.debug)
					console.log("errore generazione token jwt: "+err)
			}

			//mando una risposta di tipo set-cookie(impone la registrazione del cookie al browser client)
			res.cookie('token', token, {
			    expires: new Date(Date.now() + config.cookie_expire_time_in_ms),
			    secure: false, // true se usi https
			    httpOnly: true // true per ottenere la segretezza(ovvero cookie non ottenibile lato client con javascript)
			})

			res.json({token:token})
		})
	},

	//funzione di supporto che ritorna il nome e l'estensione dell'immagine profilo di un determinato utente
	find_pic_by_id:async(id)=>{
		var images_path=path.join(__dirname, '../static/images');

		try{
			var files=await fs_promises.readdir(images_path)

			for(var index in files){
				if(files[index].includes(id)){
					var array=files[index].split('.')
					return {name:array[0],extension:array[1]}
				}
			}
		}catch(e){
			if(config.debug)
				console.log("ERRORE PROMESSA RICERCA FILE: "+e)
			return null
		}
	},

	//funzione di supporto per l'eliminazione di una foto profilo
	delete_pic_by_path:async(file)=>{
		var images_path=path.join(__dirname, '../static/images');

		try {
		  	await fs_promises.unlink(images_path+"/"+file.name+"."+file.extension)

		  	return true
		} catch (error) {
			console.error('there was an error:', error.message)
			return false
		}
	}
}