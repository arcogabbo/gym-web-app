//OPERAZIONI BASE SUI DATI PER LE AZIONI CHE SVOLGE l'UTENTE

const db=require('./db.js')
const bcrypt=require('bcrypt')
const config=require('../utility/config.js')

module.exports={
	//verifica l'esistenza di un utente accettato
	read_by_mail:async(mail)=>{
		var query="SELECT * FROM users WHERE mail=? AND is_accepted=1"

		var result=await db.query(query,[mail])

		if(result){
			return result
		}
		return false
	},

	//verifica l'esistenza di un utente(accettato o meno)
	exist_by_mail:async(mail)=>{
		var query="SELECT * FROM users WHERE mail=?"

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

	//questa query crea l'utente e lo inserisce nel db con l'hash della password
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
			var result=await db.query(query,[mail,name,surname,digest,gender])

			return result.insertId
		}catch(er){
			if(config.debug)
				console.log(er)
			return false
		}
	},

	//compara l'hash della passwoord(digest) con la password inserita nella pagina di login
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
			if(config.debug)
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

	//ottengo le lezioni future(oltre 20 minuti dal tempo in cui viene fatta la query)
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

	//ottengo i record tramite l'id dell'utente e l'id dell'esercizio
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
	},

	get_future_news:async()=>{
		var query="SELECT id,title,content FROM news WHERE expire_date >= CURDATE()"

		var result=await db.query(query,[])

		if(result)
			return result
		return null
	},

	get_news_by_id:async(id)=>{
		var query="SELECT * FROM news WHERE id=?"

		var result=await db.query(query,[id])

		if(result)
			return result
		return null
	},

	news_count:async()=>{
		var query="SELECT COUNT(id) AS c FROM news WHERE expire_date >= CURDATE()"

		var result=await db.query(query,[])

		if(result)
			return result[0].c
		return null
	},

	//ottengo per un esercizio specificato la classifica dei primi 3 in base al valore nei Kg presente sul db(filtrato per gender)
	obtain_leaderboard_by_exercise_id:async(exercise_id,gender)=>{
		var query="SELECT exercises.name AS exercise_name,prs.gender,prs.value,users.name,users.surname, RANK() OVER (ORDER BY value DESC) AS rank FROM exercises INNER JOIN prs ON exercises.id=prs.exercise_id INNER JOIN users ON prs.user_id=users.id WHERE exercise_id=? AND prs.gender=? LIMIT 3"

		var result=await db.query(query,[exercise_id,gender])

		if(result)
			return result
		return null
	},

	get_diaries:async(user_id)=>{
		var query="SELECT DATE_FORMAT(start_date, '%d/%m - %H:%i') AS start_date,content,lesson_id FROM diaries WHERE user_id=? ORDER BY start_date DESC"
	
		var result=await db.query(query,[user_id])

		if(result)
			return result
		return null
	},

	get_lesson_diary:async(lesson_id,user_id)=>{
		var query="SELECT DATE_FORMAT(start_date, '%d/%m - %H:%i') AS start_date,content,lesson_id FROM diaries WHERE lesson_id=? AND user_id=?"
	
		var result=await db.query(query,[lesson_id,user_id])

		if(result)
			return result
		return null
	},

	insert_to_diary:async(lesson_id,date,user_id,content)=>{
		var query="INSERT INTO diaries(lesson_id,start_date,user_id,content) VALUES(?,?,?,?)"
		var result=await db.query(query,[lesson_id,date,user_id,content])

		if(result)
			return result
		return null
	},

	update_diary_content:async(lesson_id,user_id,content)=>{
		var query="UPDATE diaries SET content=? WHERE lesson_id=? AND user_id=?"

		var result=await db.query(query,[content,lesson_id,user_id])

		if(result)
			return result.affectedRows
		return null
	},

	delete_diary:async(lesson_id,user_id)=>{
		var query="DELETE FROM diaries WHERE lesson_id=? AND user_id=?"

		var result=await db.query(query,[lesson_id,user_id])

		if(result)
			return result
		return null
	},

	get_past_lessons_by_user_id:async(user_id)=>{
		//ritorno le lezioni (massimo fino ad una settimana prima) cui l'utente ha partecipato
		var query="SELECT lessons.id,DATE_FORMAT(lessons.start_date, '%d/%m - %H:%i') AS format_date,DATE_FORMAT(lessons.start_date, '%Y-%m-%d %H:%i:%s') AS start_date,books.user_id FROM lessons INNER JOIN books ON lessons.id=books.lesson_id WHERE books.user_id=? AND lessons.start_date <= CURRENT_TIMESTAMP() AND lessons.start_date >= DATE_SUB(CURRENT_TIMESTAMP(),INTERVAL 1 WEEK)"
		
		var result=await db.query(query,[user_id])

		if(result)
			return result
		return null
	}
}