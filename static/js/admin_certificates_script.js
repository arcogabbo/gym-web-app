window.onload=()=>{
	$('#certificate_btn').on('click',add_certificate)

	$('#subscription_btn').on('click',add_subscription)

	$('.remove-btn').on('click',remove_certificates)

	//update field di testo (materialize)
	M.updateTextFields();
}

function add_certificate(){
	var user=$("#certificate_select option:selected").prop("value").split('_')
	$.ajax({
		type:'put',
		url:'/certificate',
		data:{
			type:'certificate',
			date:$('#certificate_input').val(),
			id:user[0]
		},
		success:(res)=>{
			console.log(res)
		},
		error:(obj,status,err)=>{
			console.log(obj)
		}
	})
}

function add_subscription(){
	var user=$("#subscription_select option:selected").prop("value").split('_')
	$.ajax({
		type:'put',
		url:'/certificate',
		data:{
			type:'subscription',
			date:$('#subscription_input').val(),
			id:user[0]
		},
		success:(res)=>{
			console.log(res)
		},
		error:(obj,status,err)=>{
			console.log(obj)
		}
	})
}

function remove_certificates(){
	var id=$(this).prop("id").split("_")[0]
	$.ajax({
		type:'delete',
		url:'/certificate',
		data:{
			id
		},
		success:(res)=>{
			console.log(res)
		},
		error:(obj,status,err)=>{
			console.log(obj)
		}
	})
}