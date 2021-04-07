const db=require('./db.js')
const bcrypt=require('bcrypt')

module.exports={
	read_by_mail:async(mail)=>{
		var query="SELECT * FROM users WHERE mail=? AND is_accepted=1"

		var result=await db.query(query,[mail])

		if(result){
			return result
		}
		return false
	},

	read_info_by_mail:async (mail)=>{
		var query="SELECT users.*,descriptions.description FROM users LEFT JOIN descriptions ON users.id=descriptions.user_id WHERE users.mail=? AND is_accepted=1"
		var result=await db.query(query,[mail])
		
		if(result){
			return result
		}
		return false
	},

	read_info_by_id:async(id)=>{
		var query="SELECT users.*,descriptions.description FROM users LEFT JOIN descriptions ON users.id=descriptions.user_id WHERE id=? AND is_accepted=1"
		var result=await db.query(query,[id])
		
		if(result){
			return result
		}
		return false
	},

	create:async(mail,name,surname,plain_text_password,gender)=>{
		var query="INSERT INTO users(mail,name,surname,password,join_date,gender) VALUES (?,?,?,?,CURDATE(),?)"
		//hash della password
		var promessa=new Promise((resolve,reject)=>{
			bcrypt.hash(plain_text_password,10,(err,hash)=>{
				if(err) return reject(err)

				resolve(hash)
			})
		})
		
		try{
			var digest=await promessa
			var result=db.query(query,[mail,name,surname,digest,gender])

			return result
		}catch(er){
			console.log(er)
			return false
		}
	},

	validate_user:async(password,digest)=>{
		var promessa=new Promise((resolve,reject)=>{
			bcrypt.compare(password,digest,(err,result)=>{
				if(err) reject(err)

				if(result){
					resolve(true)
				}else{
					reject(false)
				}
			})
		})

		try{
			var flag=await promessa
			return flag
		}catch(e){
			console.log("errore hash compare: "+e)
			return e
		}
	},

	get_description_by_id:async(id)=>{
		var query="SELECT description FROM descriptions WHERE user_id=?"
		var result=await db.query(query,[id])
		
		if(result){
			return result
		}
		return false
	},

	update_description:async(id,des)=>{
		var query="UPDATE descriptions SET description=? WHERE user_id=?"
		var result=await db.query(query,[des,id])

		if(result){
			return result
		}
		return false
	},

	insert_description:async(id,des)=>{
		var query="INSERT INTO descriptions (user_id,description) VALUES (?,?)"
		var result=await db.query(query,[id,des])

		if(result){
			return result
		}
		return false
	},

	get_lessons:async()=>{
		var query="SELECT DATE_FORMAT(start_date, '%d/%m') AS date,DATE_FORMAT(start_date, '%H:%i') AS time, capacity-n_books AS free_spots,id FROM lessons WHERE start_date >= DATE_ADD(CURRENT_TIMESTAMP(),INTERVAL 20 MINUTE) ORDER BY start_date"

		var result=await db.query(query,[])

		if(result)
			return result
		return null
	},

	get_prs_by_id:async(id)=>{
		var query="SELECT prs.exercise_id as id,exercises.name,prs.value FROM exercises INNER JOIN prs ON exercises.id=prs.exercise_id WHERE prs.user_id=? ORDER BY prs.exercise_id"

		var result=await db.query(query,[id])

		if(result)
			return result
		return null
	},

	get_exercises:async()=>{
		var query="SELECT id,name FROM exercises ORDER BY id"

		var result=await db.query(query,[])

		if(result)
			return result
		return null
	},

	get_user_prs_by_exercise_id:async(user_id,exercise_id)=>{
		var query="SELECT exercise_id,value FROM prs WHERE user_id=? AND exercise_id=?"

		var result=await db.query(query,[user_id,exercise_id])

		if(result)
			return result
		return null
	},

	update_pr:async(exercise_id,user_id,gender,value)=>{
		var query="UPDATE prs SET value=? WHERE exercise_id=? AND user_id=? AND gender=?"

		var result=await db.query(query,[value,exercise_id,user_id,gender])

		if(result)
			return result
		return null
	},

	insert_pr:async(exercise_id,user_id,gender,value)=>{
		var query="INSERT INTO prs (exercise_id,user_id,gender,value) VALUES(?,?,?,?)"

		var result=await db.query(query,[exercise_id,user_id,gender,value])

		if(result)
			return result
		return null
	}
}