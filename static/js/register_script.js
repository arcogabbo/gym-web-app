window.onload=()=>{
	$('#register_btn').on('click',register)

	//update field di testo (materialize)
	M.updateTextFields();
}


function register(){
	$.ajax({
		type:'post',
		url:'/profile',
		data:{
			mail: $('#mail_field').val(),
			password: $('#password_field').val(),
			name: $('#name_field').val(),
			surname: $('#surname_field').val()
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