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
			res.render('dashboard.ejs',{lessons,user:req.user})
		}
	},
	
	register:(req,res)=>{
		res.redirect('/register.html')
	}
}