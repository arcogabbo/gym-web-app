window.onload=()=>{
	$('#login_btn').on('click',login)

	$('#register_btn').on('click',()=>{
		window.open('/register','_self')
	})
}


function login(){
	$.ajax({
		type:'post',
		url:'/login',
		data:{
			mail: $('#mail_field').val(),
			password: $('#password_field').val()
		},

		success:(res)=>{
			console.log(res)
			window.open('/dashboard','_self')
		},
		error:(obj,status,err)=>{
			console.log(obj)
		}
	})
}

//da aggiungere i controlli sui campi