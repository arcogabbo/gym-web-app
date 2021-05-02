window.onload=()=>{
	//aggiunta evento
	$('.accept-btn').on('click',accept)

	//init sidebar for mobile devices
    $('.sidenav').sidenav();
	
	//init fixed-btn
    var instances = M.FloatingActionButton.init($('.fixed-action-btn'),{direction:'left', hoverEnabled:false});
}

function accept(){
	var id=this.id

	$.ajax({
		type:'put',
		url:'/user/'+id,
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