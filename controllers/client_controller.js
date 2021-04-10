const utility=require('../utility/utility.js')
const user=require('../models/user_model.js')

module.exports={
	home:(req,res)=>{
		if(utility.is_auth(req)){
			res.redirect('/dashboard')
		}else{
			res.redirect('/login.html')
		}
	},

	dashboard:async(req,res)=>{
		if(!utility.is_auth(req)){
			res.redirect('/login.html')
		}
		else{

			var lessons=await user.get_lessons()
			var image=await utility.find_pic_by_id(req.user.id)
			var news_count=await user.news_count()
			res.render('dashboard.ejs',{lessons,user:req.user, pic: image?image.name+"."+image.extension:"default.png",news_count})
		}
	},
	
	register:(req,res)=>{
		res.redirect('/register.html')
	},

	news_page:async(req,res)=>{
		if(!utility.is_auth(req)){
			res.redirect('/login.html')
		}else{
			var news=await user.get_future_news()
			var image=await utility.find_pic_by_id(req.user.id)
			var news_count=news.length
			res.render('dashboard_news.ejs',{news,user:req.user, pic: image?image.name+"."+image.extension:"default.png",news_count})
		}
	},

	leaderboard_page:async(req,res)=>{
		if(!utility.is_auth(req)){
			res.redirect('/login.html')
		}else{
			var image=await utility.find_pic_by_id(req.user.id)
			var news_count=await user.news_count()

			//clasifica di ogni esercizio filtrata solo maschi
			var leaderboard_m=[]
			//clasifica di ogni esercizio filtrata solo femmine
			var leaderboard_f=[]
			//ciclo per gli 11 esercizi e seleziono
			for(let i=1;i<=11;i++){
				leaderboard_m.push(await user.obtain_leaderboard_by_exercise_id(i,1))
				leaderboard_f.push(await user.obtain_leaderboard_by_exercise_id(i,0))
			}

			//console.log(leaderboard_m)
			//console.log(leaderboard_f)
			res.render('dashboard_leaderboard.ejs',{news_count,user:req.user, pic: image?image.name+"."+image.extension:"default.png",leaderboard_m,leaderboard_f})
		}
	},

	diary_page:async(req,res)=>{
		if(!utility.is_auth(req)){
			res.redirect('/login.html')
		}else{
			//partecipated_lessons ha le lezioni partecipate dall'utente fino alla settimana scorsa
			var partecipated_lessons=await user.get_past_lessons_by_user_id(req.user.id)
			
			var to_update=[]
			var to_insert=[]

			if(partecipated_lessons){
				//per ogni lezione cui l'utente ha partecipato vedo se ha la entry sul diario
				for(var i in partecipated_lessons){
					var x=await user.get_lesson_diary(partecipated_lessons[i].id,req.user.id)
					if(x){
						//l'utente ha la entry sul diario
						to_update.push({id:partecipated_lessons[i].id,format_date:partecipated_lessons[i].format_date,content: x[0].content})
					}else{
						to_insert.push({id:partecipated_lessons[i].id,format_date:partecipated_lessons[i].format_date,start_date:partecipated_lessons[i].start_date})	
					}
				}
			}

			var image=await utility.find_pic_by_id(req.user.id)
			var news_count=await user.news_count()

			res.render('dashboard_diary.ejs',{to_insert,to_update,user:req.user,pic: image?image.name+"."+image.extension:"default.png",news_count})
		}
	}
}