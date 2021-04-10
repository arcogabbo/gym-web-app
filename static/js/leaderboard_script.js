window.onload=()=>{
    //init sidebar for mobile devices
    $('.sidenav').sidenav();

    //init fixed-btn
    var instances = M.FloatingActionButton.init($('.fixed-action-btn'),{direction:'left', hoverEnabled:false});
}