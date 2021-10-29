percentIndicator();
function percentIndicator(){
    var proyeccion_total = parseInt(document.getElementById(consultasproyectadas).innerHTML);
    var realizadas_total = parseInt(document.getElementById(consultasrealizadas).innerHTML);
    var percentAvance = Math.round((realizadas_total * 100)/proyeccion_total);
     var prueba= 1;
    document.getElementById(prueba).innerHTML = percentAvance;


}