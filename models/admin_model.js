const db=require('./db.js')

module.exports={
	is_admin:async(id)=>{
		var query="SELECT is_admin FROM users WHERE id=?"
		var result=await db.query(query,[id])

		if(result){
			return result[0].is_admin ? true : false
		}

		return false
	},

	is_accepted:async(id)=>{
		var query="SELECT is_accepted FROM users WHERE id=?"
		var result=await db.query(query,[id])

		if(result){
			return result[0].is_accepted ? true : false
		}

		return false
	},

	accept_user:async(id)=>{
		var query="UPDATE users SET is_accepted=1 WHERE id=?"
		var result=await db.query(query,[id])

		if(result){
			return result.affectedRows
		}
		return false
	},

	accept_admin:async(id)=>{
		var query="UPDATE users SET is_admin=1 WHERE id=?"
		var result=await db.query(query,[id])

		if(result){
			return result
		}
		return false
	},

	get_to_accept:async()=>{
		var query="SELECT id,name,surname FROM users WHERE is_accepted=?"
		var result=await db.query(query,[0])

		if(result)
			return result
		return null
	},

	multiple_book:async(capacity,initial_timestamp)=>{
		var query="INSERT INTO lessons (capacity,start_date,end_date) VALUES(?,?,DATE_ADD(start_date, INTERVAL 1 HOUR))"
		var query2="INSERT INTO lessons (capacity,start_date,end_date) VALUES(?,DATE_ADD(?,INTERVAL 7 DAY),DATE_ADD(start_date, INTERVAL 1 HOUR))"
		var query3="INSERT INTO lessons (capacity,start_date,end_date) VALUES(?,DATE_ADD(?,INTERVAL 14 DAY),DATE_ADD(start_date, INTERVAL 1 HOUR))"
		var query4="INSERT INTO lessons (capacity,start_date,end_date) VALUES(?,DATE_ADD(?,INTERVAL 21 DAY),DATE_ADD(start_date, INTERVAL 1 HOUR))"

		var result1=await db.query(query,[capacity,initial_timestamp])
		var result2=await db.query(query2,[capacity,initial_timestamp])
		var result3=await db.query(query3,[capacity,initial_timestamp])
		var result4=await db.query(query4,[capacity,initial_timestamp])

		if(result1 && result2 && result3 &&result4)
			return (result1.affectedRows +result2.affectedRows+result3.affectedRows+result4.affectedRows)
		return null
	},

	single_book:async(capacity,initial_timestamp)=>{
		var query="INSERT INTO lessons (capacity,start_date,end_date) VALUES(?,?,DATE_ADD(start_date, INTERVAL 1 HOUR))"
		
		var result=await db.query(query,[capacity,initial_timestamp])

		if(result)
			return result
		return null
	},

	get_lessons:async()=>{
		var query="SELECT DATE_FORMAT(start_date, '%d/%m') AS date,DATE_FORMAT(start_date, '%H:%i') AS time,capacity,id FROM lessons WHERE start_date >= CURRENT_TIMESTAMP() ORDER BY start_date"

		var result=await db.query(query,[])

		if(result)
			return result
		return null
	},

	delete_lesson:async(id)=>{
		var query="DELETE FROM lessons WHERE id=?"
	
		var result=await db.query(query,[id])

		if(result)
			return result
		return null
	},

	delete_books_on_lesson:async(id)=>{
		var query="DELETE FROM books WHERE lesson_id=?"

		var result=await db.query(query,[id])

		if(result)
			return result
		return null
	},

	get_certificates:async()=>{
		var query="SELECT users.name, users.surname, DATE_FORMAT(certificates.certificate, '%d-%m-%Y') as certificate, DATE_FORMAT(certificates.subscription, '%d-%m-%Y') as subscription, users.id FROM certificates INNER JOIN users ON certificates.user_id=users.id"
		
		var result=await db.query(query,[])

		if(result)
			return result
		return null
	},

	get_users:async()=>{
		var query="SELECT id,name,surname FROM users"

		var result=await db.query(query,[])

		if(result)
			return result
		return null
	},

	create_certificate:async(date,id)=>{
		var query="INSERT INTO certificates(user_id,certificate) VALUES(?,?)"
	
		var result=await db.query(query,[id,date])

		if(result)
			return result
		return null
	},

	delete_certificates:async(id)=>{
		var query="DELETE FROM certificates WHERE user_id=?"
	
		var result=await db.query(query,[id])

		if(result)
			return result
		return null
	},

	create_subscription:async(date,id)=>{
		var query="INSERT INTO certificates(user_id,subscription) VALUES(?,?)"
	
		var result=await db.query(query,[id,date])

		if(result)
			return result
		return null
	},

	update_certificate:async(date,id)=>{
		var query="UPDATE certificates SET certificate=? WHERE user_id=?"
		var result=await db.query(query,[date,id])

		if(result){
			return result.affectedRows
		}
		return false
	},

	update_subscription:async(date,id)=>{
		var query="UPDATE certificates SET subscription=? WHERE user_id=?"
		var result=await db.query(query,[date,id])

		if(result){
			return result.affectedRows
		}
		return false
	},

	insert_news:async(expire_date,title,content)=>{
		var query="INSERT INTO news(expire_date,title,content) VALUES(?,?,?)"
	
		var result=await db.query(query,[expire_date,title,content])

		if(result)
			return result
		return null
	},

	delete_news:async(id)=>{
		var query="DELETE FROM news WHERE id=?"
	
		var result=await db.query(query,[id])

		if(result)
			return result
		return null
	},

	update_news_date:async(id,expire_date)=>{
		var query="UPDATE news SET expire_date=? WHERE id=?"
		var result=await db.query(query,[expire_date,id])

		if(result){
			return result.affectedRows
		}
		return false
	},

	update_news_title:async(id,title)=>{
		var query="UPDATE news SET title=? WHERE id=?"
		var result=await db.query(query,[title,id])

		if(result){
			return result.affectedRows
		}
		return false
	},

	update_news_content:async(id,content)=>{
		var query="UPDATE news SET content=? WHERE id=?"
		var result=await db.query(query,[content,id])

		if(result){
			return result.affectedRows
		}
		return false
	}
}