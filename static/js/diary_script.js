window.onload=()=>{
    //init sidebar for mobile devices
    $('.sidenav').sidenav();

    //init collapsible
	$('.collapsible').collapsible()

  	//init text area counter
  	$('textarea').characterCounter();

	$('#lesson_update_select').on('change',get_diary_page)

	fetch_diary()

	$('#diary_add_btn').on('click',add_page)

	$('#diary_update_btn').on('click',update_page)

	//init fixed-btn
    var instances = M.FloatingActionButton.init($('.fixed-action-btn'),{direction:'left', hoverEnabled:false});
}

function get_diary_page(){
	var id=$('.id').html()
	var lesson_id=$("#lesson_update_select option:selected").prop("value").split('_')[0]

	$.ajax({
		type:'get',
		url:'/diary/'+id,
		data:{
			lesson_id
		},
		success:(res)=>{
			$('#content-update-area').val(res.data[0].content)
			M.updateTextFields();
		},
		error:(obj,status,err)=>{
			console.log(obj)
			M.toast({html:obj.responseJSON.msg})
		}
	})
}

function fetch_diary(){
	var id=$('.id').html()
	$.ajax({
		type:'get',
		url:'/diary/'+id,
		success:(res)=>{
			for(var i in res.data){
				$('#page_view').append('<li><div class="collapsible-header"><i class="material-icons">description</i>'+res.data[i].start_date+'</div><div class="collapsible-body">'+res.data[i].content+'<br><button id="'+res.data[i].lesson_id+'" class="remove-btn btn-floating waves-light waves-effect red"><i class="material-icons">delete</i></button></div></li>')
			}
			$('.remove-btn').on('click',delete_page)

			M.updateTextFields();
		},
		error:(obj,status,err)=>{
			console.log(obj)
			M.toast({html:obj.responseJSON.msg})
		}
	})
}

function add_page(){
	var id=$('.id').html()
	var lesson_id=$("#lesson_select option:selected").prop("value").split('_')[0]
	var date=$("#lesson_select option:selected").prop("value").split('_')[1]

	$.ajax({
		type:'put',
		url:'/diary/'+id,
		data:{
			lesson_id,
			content:$('#content-area').val(),
			date
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

function update_page(){
	var id=$('.id').html()
	var lesson_id=$("#lesson_update_select option:selected").prop("value").split('_')[0]
	$.ajax({
		type:'put',
		url:'/diary/'+id,
		data:{
			lesson_id,
			content:$('#content-update-area').val()
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

function delete_page(){
	var id=$('.id').html()
	var lesson_id=this.id
	$.ajax({
		type:'delete',
		url:'/diary/'+id,
		data:{
			lesson_id
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