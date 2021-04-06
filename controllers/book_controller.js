const utility=require('../utility/utility.js')
const book=require('../models/book_model.js')

module.exports={
	create_book:async(req,res)=>{
		const params=utility.get_parameters(req)

		//prima controllo se la lezione esiste
		var l=await book.get_lesson_capacity(params.lesson_id)
		if(!l) return utility.json_response(res,404,{msg:"La lezione non esiste"})

		//ottengo la data della lezione a cui si vuole registrare
		var les=await book.get_lesson(params.lesson_id)

		//un utente non puo' prenotarsi a due lezioni lo stesso giorno
		//il primo controllo da fare e' vedere se l'utente e' gia' prenotato
		//ad un altra lezione dello stesso giorno
		var day_lessons=await book.check_day_book(req.user.id,les[0].start_date)

		if(day_lessons){
			//l'utente e' gia' prenotato ad un altra lezione del giorno
			utility.json_response(res,400,{msg:"Sei gia' prenotato ad una lezione sul giorno scelto"})
		}else{
			//continuo con la prenotazione
			//trovo id e nome sulla sessione
			//prima controllo se ci sono posti liberi per poter prenotare
			var result=await book.get_lesson_capacity(params.lesson_id)

			if( result[0].capacity > result[0].n_books ){
				var pren=await book.insert_book(params.lesson_id,req.user.id,req.user.name)

				if(pren){
					await book.add_book_on_lesson(params.lesson_id)
					utility.json_response(res,200,{msg:"Prenotazione avvenuta con successo"})
				}else{
					utility.json_response(res,500,{msg:"Errore prenotazione"})
				}
			}else{
				utility.json_response(res,400,{msg:"Lezione piena"})
			}
		}
	},

	delete_book:async(req,res)=>{
		const params=utility.get_parameters(req)
		
		//controllo esistenza lezione
		var l=await book.get_lesson_capacity(params.lesson_id)
		if(!l) return utility.json_response(res,404,{msg:"La lezione non esiste"})

		//rimuovo la prenotazione
		var result=await book.delete_book(params.lesson_id,req.user.id)

		if(result){
			//scalo il numero di prenotati
			await book.subtract_book_from_lesson(params.lesson_id)
			utility.json_response(res,200,{msg:"Rimozione prenotazione avvenuta"})
		}else{
			utility.json_response(res,500,{msg:"Non sei prenotato a questa lezione"})
		}
	},

	get_future_lessons:async(req,res)=>{
		var lessons=await book.get_future_lessons()

		if(lessons){
			utility.json_response(res,200,{lessons})
		}else{
			utility.json_response(res,500,{msg:"Errore caricamento lezioni"})
		}
	}
}