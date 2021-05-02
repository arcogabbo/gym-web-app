//OPERAZIONI BASE SUI DATI PER LE PRENOTAZIONI

const db=require('./db.js')

module.exports={
	insert_book:async(lesson_id,user_id,user_name,user_surname)=>{
		var query="INSERT INTO books(lesson_id,user_id,user_name,user_surname) VALUES(?,?,?,?)"
		var res=await db.query(query,[lesson_id,user_id,user_name,user_surname])

		if(res)
			return res
		return null
	},

	delete_book:async(lesson_id,user_id)=>{
		var query="DELETE FROM books WHERE lesson_id=? AND user_id=? LIMIT 1"
		var res=await db.query(query,[lesson_id,user_id])

		if(res)
			return res
		return null
	},

	check_day_book:async(user_id,date)=>{
		var query="SELECT lessons.* FROM lessons INNER JOIN books ON lessons.id=books.lesson_id WHERE DATE(lessons.start_date)=DATE(?) AND books.user_id=?"
		var res=await db.query(query,[date,user_id])

		if(res)
			return res
		return null
	},

	get_lesson_capacity:async(lesson_id)=>{
		//aggiungo la possibilita' di non potersi prenotare ad una lezione
		//20 minuti prima che cominci
		var query="SELECT capacity,n_books FROM lessons WHERE id=? AND start_date >= DATE_ADD(CURRENT_TIMESTAMP(),INTERVAL 20 MINUTE)"
		var res=await db.query(query,[lesson_id])

		if(res)
			return res
		return null
	},

	add_book_on_lesson:async(lesson_id)=>{
		//non faccio il check sulla capacity perche' eseguo questa funzione
		//solo se trovo almeno un posto libero
		var query="UPDATE lessons SET n_books=n_books+1 WHERE id=?"
		var res=await db.query(query,[lesson_id])

		if(res)
			return res
		return null
	},

	subtract_book_from_lesson:async(lesson_id)=>{
		var query="UPDATE lessons SET n_books=n_books-1 WHERE id=?"
		var res=await db.query(query,[lesson_id])

		if(res)
			return res
		return null
	},

	get_future_lessons:async()=>{
		//se la lezione inizia tra 20 minuti non posso vederla ne' prenotarmi
		var query="SELECT * FROM lessons WHERE start_date >= DATE_ADD(CURRENT_TIMESTAMP(),INTERVAL 20 MINUTE) ORDER BY start_date"
		var res=await db.query(query,[])

		if(res)
			return res
		return null
	},

	get_lesson:async(lesson_id)=>{
		var query="SELECT * FROM lessons WHERE id=?"
		var res=await db.query(query,[lesson_id])

		if(res)
			return res
		return null
	}
}