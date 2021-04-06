window.onload=()=>{
	$('.book-btn').on('click',book)

	$('.remove-btn').on('click',free_spot)
}

function book(){
	var lesson_id=this.id.split('_')[0]

	$.ajax({
		type:'post',
		url:'/book',
		data:{
			lesson_id
		},

		success:(res)=>{
			console.log(res)
		},

		error:(obj,status,err)=>{
			console.log(obj)
		}
	})
}

function free_spot(){
	var lesson_id=this.id.split('_')[0]

	$.ajax({
		type:'delete',
		url:'/book',
		data:{
			lesson_id
		},

		success:(res)=>{
			console.log(res)
		},

		error:(obj,status,err)=>{
			console.log(obj)
		}
	})
}