window.onload=()=>{

	$('#news_add_btn').on('click',add_news)

	$('select').on('change',get_news)

	$('#news_update_btn').on('click',update_news)

	$('.remove-btn').on('click',delete_news)

	//update field di testo (materialize)
	M.updateTextFields();

	//init collapsible
	$('.collapsible').collapsible()

  	//init text area counter
  	$('textarea').characterCounter();
}

function add_news(){
	$.ajax({
		type:'post',
		url:'/news',
		data:{
			expire_date:$('#expire_date_add_input').val(),
			title:$('#title_add_input').val(),
			content:$('#content_add_input').val()
		},
		success:(res)=>{
			M.toast({html:res.msg})
		},
		error:(obj,status,err)=>{
			console.log(obj)
			M.toast({html:obj.responseJSON.msg})
		}
	})
}

function get_news(){
	var id=$("#news_select option:selected").prop("value").split('_')[0]

	$.ajax({
		type:'get',
		url:'/news',
		data:{
			id
		},
		success:(res)=>{
			$('#expire_date_update_input').val(res.data[0].expire_date.split('T')[0])
			$('#title_update_input').val(res.data[0].title)
			$('#content_update_input').val(res.data[0].content)

			M.updateTextFields();
		},
		error:(obj,status,err)=>{
			console.log(obj)
			M.toast({html:obj.responseJSON.msg})
		}
	})
}

function update_news(){
	var id=$("#news_select option:selected").prop("value").split('_')[0]
	$.ajax({
		type:'put',
		url:'/news',
		data:{
			id,
			expire_date:$('#expire_date_update_input').val(),
			title:$('#title_update_input').val(),
			content:$('#content_update_input').val()
		},
		success:(res)=>{
			M.toast({html:res.msg})
		},
		error:(obj,status,err)=>{
			console.log(obj)
			M.toast({html:obj.responseJSON.msg})
		}
	})
}

function delete_news(){
	var id=this.id
	console.log(id)
	$.ajax({
		type:'delete',
		url:'/news',
		data:{
			id
		},
		success:(res)=>{
			M.toast({html:res.msg})
		},
		error:(obj,status,err)=>{
			console.log(obj)
			M.toast({html:obj.responseJSON.msg})
		}
	})
}