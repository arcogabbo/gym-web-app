//NOTE: in jwt se la callback è inserita viene richiamata in modo asincrono

const config=require('../utility/config.js')
const jwt=require('jsonwebtoken')
const fs_promises=require('fs').promises
const path=require('path')

module.exports={
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
	//consente quindi di decidere cosa fare nel caso il token sia corretto o inserito
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

	//jwt_sign viene utilizzata nella creazione della sessione
	//
	jwt_sign:(res,obj)=>{
		jwt.sign(obj,config.secret_key,{expiresIn:"20m"},(err,token)=>{
			if(err){
				console.log("errore generazione token jwt: "+err)
			}

			//mando una risposta di tipo set-cookie
			res.cookie('token', token, {
			    expires: new Date(Date.now() + 1200000),
			    secure: false, // true se usi https
			    httpOnly: true
			})

			res.json({token:token})
		})
	},

	find_pic_by_id:async(id)=>{
		//console.log(__dirname)
		var images_path=path.join(__dirname, '../static/images');

		try{
			var files=await fs_promises.readdir(images_path)
			//console.log(files)
			for(var index in files){
				if(files[index].includes(id)){
					var array=files[index].split('.')
					return {name:array[0],extension:array[1]}
				}
			}
		}catch(e){
			console.log("ERRORE PROMESSA RICERCA FILE: "+e)
			return null
		}
	},

	delete_pic_by_path:async(file)=>{
		//console.log(file)
		var images_path=path.join(__dirname, '../static/images');
		//console.log(images_path+"/"+file.name+"."+file.extension)
		try {
		  	await fs_promises.unlink(images_path+"/"+file.name+"."+file.extension)
		  	console.log('successfully deleted')
		  	return true
		} catch (error) {
			console.error('there was an error:', error.message)
			return false
		}
	}
}