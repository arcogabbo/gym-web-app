window.onload=()=>{
	//aggiunta eventi
	$('#login_btn').on('click',login)

	$('#register_btn').on('click',()=>{
		//semplice redirect
		window.open('/register','_self')
	})

	//update field di testo (materialize)
	M.updateTextFields();
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
			M.toast({html:obj.responseJSON.msg})
		}
	})
}

//da aggiungere i controlli sui campi