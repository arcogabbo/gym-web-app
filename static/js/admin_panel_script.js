window.onload=()=>{
	$('.accept-btn').on('click',accept)
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