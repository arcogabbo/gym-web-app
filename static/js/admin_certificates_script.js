window.onload=()=>{
	$('#certificate_btn').on('click',add_certificate)

	$('#subscription_btn').on('click',add_subscription)

	$('.remove-btn').on('click',remove_certificates)

	//update field di testo (materialize)
	M.updateTextFields();

	//init collapsible
	$('.collapsible').collapsible()

	//init sidebar for mobile devices
    $('.sidenav').sidenav();
	
	//init fixed-btn
    var instances = M.FloatingActionButton.init($('.fixed-action-btn'),{direction:'left', hoverEnabled:false});
}

function add_certificate(){
	var user=$("#certificate_select option:selected").prop("value").split('_')
	$.ajax({
		type:'put',
		url:'/certificates/'+user[0],
		data:{
			type:'certificate',
			date:$('#certificate_input').val()
		},
		success:(res)=>{
			console.log(res)
			M.toast({html:res.msg})
		},
		error:(obj,status,err)=>{
			console.log(obj)
			M.toast({html:obj.responseJSON.msg})
		}
	})
}

function add_subscription(){
	var user=$("#subscription_select option:selected").prop("value").split('_')
	$.ajax({
		type:'put',
		url:'/certificates/'+user[0],
		data:{
			type:'subscription',
			date:$('#subscription_input').val()
		},
		success:(res)=>{
			console.log(res)
			M.toast({html:res.msg})
		},
		error:(obj,status,err)=>{
			console.log(obj)
			M.toast({html:obj.responseJSON.msg})
		}
	})
}

function remove_certificates(){
	var id=this.id
	$.ajax({
		type:'delete',
		url:'/certificates/'+id,
		success:(res)=>{
			console.log(res)
			M.toast({html:res.msg})
		},
		error:(obj,status,err)=>{
			console.log(obj)
			M.toast({html:obj.responseJSON.msg})
		}
	})
}