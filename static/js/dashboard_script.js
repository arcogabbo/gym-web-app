window.onload=()=>{
	$('.book-btn').on('click',book)

	$('.remove-btn').on('click',free_spot)

	//init fixed-btn
    var instances = M.FloatingActionButton.init($('.fixed-action-btn'),{direction:'left', hoverEnabled:false});

    //init sidebar for mobile devices
    $('.sidenav').sidenav();
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
			M.toast({html:res.msg})
		},

		error:(obj,status,err)=>{
			console.log(obj)
			M.toast({html:obj.responseJSON.msg})
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
			M.toast({html:res.msg})
		},

		error:(obj,status,err)=>{
			console.log(obj)
			M.toast({html:obj.responseJSON.msg})
		}
	})
}