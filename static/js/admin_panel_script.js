window.onload=()=>{
	$('.accept-btn').on('click',accept)
}

function accept(){
	var id=this.id.split("_")[0]

	$.ajax({
		type:'put',
		url:'/user',
		data:{
			id:id
		},

		success:(res)=>{
			console.log(res)
			M.toast({html:res.msg})
		},

		error:(obj,status,err)=>{
			console.log(err)
			M.toast({html:obj.responseJSON.msg})
		}
	})
}