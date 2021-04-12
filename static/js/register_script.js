window.onload=()=>{
	$('#register_btn').on('click',register)

	//update field di testo (materialize)
	M.updateTextFields();
}


function register(){
	$.ajax({
		type:'post',
		url:'/user',
		data:{
			mail: $('#mail_field').val(),
			password: $('#password_field').val(),
			name: $('#name_field').val(),
			surname: $('#surname_field').val(),
			gender: $("#gender_field option:selected").prop("value")
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