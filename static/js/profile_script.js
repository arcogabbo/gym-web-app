window.onload=()=>{
	//aggiunta eventi
	$('#save_file_btn').on('click',save_changes)

	$('#save_des_btn').on('click',save_des)

	$('#pr_update_btn').on('click',update_pr)

	//controllo lato client per la grandezza del file
	$('#image-file').change(()=>{
		var size=$('#image-file').prop('files')[0].size/1024/1024
		if(size>2.0){
			//svuoto il file
			$('#image-file').val('')
			M.toast({text:"Il file non deve superare la grandezza di 2MB"})
		}
	})

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
	var id=$('.id').html()
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
			M.toast({text:res.msg})
		},
		error:(obj,status,err)=>{
			console.log(err)
			M.toast({text:obj.responseJSON.msg})
		},
	 	cache: false,
        contentType: false,
        processData: false,
        enctype: 'multipart/form-data'
	})
}

function save_des(){
	var id=$('.id').html()
	$.ajax({
		type:'put',
		url:'/user/'+id+'/des',
		data:{
			description:$('#description-area').val()
		},
		success:(res)=>{
			console.log(res)
			M.toast({text:res.msg})
		},
		error:(obj,status,err)=>{
			console.log(err)
			M.toast({text:obj.responseJSON.msg})
		}
	})
}

function update_pr(){
	var id=$('.id').html()
	$.ajax({
		type:'put',
		url:'/user/'+id+'/pr',
		data:{
			exercise_id:$("#pr_select option:selected").prop("value"),
			value:$('#pr_add_number').val()
		},
		success:(res)=>{
			console.log(res)
			M.toast({text:res.msg})
		},
		error:(obj,status,err)=>{
			console.log(err)
			M.toast({text:obj.responseJSON.msg})
		}
	})
}