window.onload=()=>{
	$('.accept-btn').on('click',accept)

	$('#certificates_btn').on('click',redirect_c)

	$('#lessons_btn').on('click',redirect_l)
}

function redirect_c(){
	window.open('/administrate/certificates','_self')
}

function redirect_l(){
	window.open('/administrate/lessons','_self')
}

function accept(){
	var id=this.id.split("_")[0]

	$.ajax({
		type:'put',
		url:'/profile',
		data:{
			id:id
		},

		success:(res)=>{
			console.log(res)
		},

		error:(obj,status,err)=>{
			console.log(err)
		}
	})
}