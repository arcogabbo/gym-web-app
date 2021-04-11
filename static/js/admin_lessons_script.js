window.onload=()=>{
	$('#book_assurance_btn').on('click',multiple_books)

	$('#book_single_btn').on('click',single_book)

	$('.remove-btn').on('click',remove_lesson)

	//update field di testo (materialize)
	M.updateTextFields();

	//init collapsible
	$('.collapsible').collapsible()

	//init modals
	$('.modal').modal({
      
    });
}


function multiple_books(){
	$.ajax({
		type:'post',
		url:'/lesson',
		data:{
			type:'multiple',
			initial_timestamp:$('#book_assurance').val(),
			capacity:$('#book_assurance_number').val()
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

function single_book(){
	$.ajax({
		type:'post',
		url:'/lesson',
		data:{
			type:'single',
			initial_timestamp:$('#book_single').val(),
			capacity:$('#book_single_number').val()
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

function remove_lesson(){
	var id=this.id.split("_")[0]
	$.ajax({
		type:'delete',
		url:'/lesson',
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