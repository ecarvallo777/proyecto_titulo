calculatePercent();
function calculatePercent(){
    var proyeccion_nuevas = parseInt(document.getElementById("metaNuevas").innerHTML);
    var ejecutadas_nuevas = parseInt(document.getElementById("Nuevas").innerHTML);
    var percentNuevas = Math.round((ejecutadas_nuevas * 100 )/ proyeccion_nuevas) +"%" ;
    document.getElementById("resultados_nuevas").innerHTML= percentNuevas;

    var proyeccion_controles = parseInt(document.getElementById("metaControles").innerHTML);
    var ejecutadas_controles = parseInt(document.getElementById("Controles").innerHTML);
    var percentControles = Math.round((ejecutadas_controles * 100 )/ proyeccion_controles) +"%" ;
    document.getElementById("resultados_controles").innerHTML= percentControles;

    var proyeccion_total = parseInt(document.getElementById("metaTotal").innerHTML);
    var ejecutadas_total = parseInt(document.getElementById("Total").innerHTML);
    var percentTotal = Math.round((ejecutadas_total * 100 )/ proyeccion_total) +"%" ;
    document.getElementById("resultados_total").innerHTML= percentTotal;



}