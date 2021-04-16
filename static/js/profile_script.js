window.onload=()=>{
	$('#save_file_btn').on('click',save_changes)

	$('#save_des_btn').on('click',save_des)

	$('#image-file').change(()=>{
		var size=$('#image-file').prop('files')[0].size/1024/1024
		if(size>2.0){
			//svuoto il file
			$('#image-file').val('')
			M.toast({html:"Il file non deve superare la grandezza di 2MB"})
		}
	})

	$('#pr_update_btn').on('click',update_pr)

	//materialize update text inputs
  	M.textareaAutoResize($('#description-area'));

  	//init text area counter
  	$('textarea').characterCounter();

  	//init collapsible
  	$('.collapsible').collapsible()

  	//init fixed-btn
    var instances = M.FloatingActionButton.init($('.fixed-action-btn'),{direction:'left', hoverEnabled:false});

    //init sidebar for mobile devices
    $('.sidenav').sidenav();
}


function save_changes(){
	var id=$('#id_value').html()
	console.log(id)
	var file = $("#image-file")[0].files[0];
    var form_data = new FormData();
    form_data.append("file", file);

	$.ajax({
		type:'put',
		url:'/user/'+id+'/pic',
		data:form_data,
		success:(res)=>{
			console.log(res)
			M.toast({html:res.msg})
		},
		error:(obj,status,err)=>{
			console.log(err)
			M.toast({html:obj.responseJSON.msg})
		},
	 	cache: false,
        contentType: false,
        processData: false,
        enctype: 'multipart/form-data'
	})
}

function save_des(){
	var id=$('#id_value').html()
	$.ajax({
		type:'put',
		url:'/user/'+id+'/des',
		data:{
			description:$('#description-area').val()
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

function update_pr(){
	var id=$('#id_value').html()
	$.ajax({
		type:'put',
		url:'/user/'+id+'/pr',
		data:{
			exercise_id:$("#pr_select option:selected").prop("value"),
			value:$('#pr_add_number').val()
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