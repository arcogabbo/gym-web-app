window.onload=()=>{
	$('#save_file_btn').on('click',save_changes)

	$('#save_des_btn').on('click',save_des)

	$('#image-file').change(()=>{
		console.log(this)
		var size=$('#image-file').prop('files')[0].size/1024/1024
		if(size>2.0){
			//svuoto il file
			$('#image-file').val('')
			$('#settings-box').append("<h3>Il file non deve superare la grandezza di 2MB</h3>")
		}
	})
}


function save_changes(){
	var file = $("#image-file")[0].files[0];
    var form_data = new FormData();
    form_data.append("file", file);

	$.ajax({
		type:'put',
		url:'/profile/pic',
		data:form_data,
		success:(res)=>{
			console.log(res)
		},
		error:(obj,status,err)=>{
			console.log(err)
		},
	 	cache: false,
        contentType: false,
        processData: false,
        enctype: 'multipart/form-data'
	})
}

function save_des(){
	$.ajax({
		type:'put',
		url:'/profile/des',
		data:{
			description:$('#description-area').val()
		},
		success:(res)=>{
			console.log(res)
		},
		error:(obj,status,err)=>{
			console.log(err)
		}
	})
}