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
			res.render('dashboard.ejs',{lessons,user:req.user, pic: image.name+"."+image.extension})
		}
	},
	
	register:(req,res)=>{
		res.redirect('/register.html')
	}
}