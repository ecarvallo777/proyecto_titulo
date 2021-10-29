var tabla = "NSP";
cargarPorcentaje(tabla);
tabla = "a";
cargarPorcentaje(tabla);
    
function cargarPorcentaje(value){
        //$("#ausentismo""").html("");

        var meses = {0: "ene", 1:"feb", 2:"mar", 3:"abr", 4:"may", 5:"jun", 6:"jul", 7:"ago", 8:"sep", 9:"oct", 10:"nov",11:"dic",12:"tot"};
        var ejecutada;
        var nsp;
        var percent;
        var eje; 
        var ns;
        var contenido = '<tr>'+
                        '<th scope="row">Porcentaje</th>';
        var content;
        for (var i = 0; i<13; i++){
            eje = 'Total_'+meses[i]+'_'; //AQUI
            ejecutada = document.getElementById(eje).innerHTML;
            ns = value+"_"+meses[i];
            nsp = document.getElementById(ns).innerHTML;
            percent =  Math.round((nsp * 100)/ejecutada);
            content = '<td id="percent_'+value+"_"+meses[i]+'"+>'+percent+'%</td>';
            contenido = contenido+content;
           


    
        } 
        value = "#"+value;
        contenido = contenido +'</tr>' 
        $(value).append(contenido);
        
}



function reCargarPorcentaje(row, value, key){
    var total = parseInt(document.getElementById("Total_"+row+"_").innerHTML); // AQUI
    var percent = Math.round((value * 100)/total);
    document.getElementById("percent_"+key+"_"+row).innerHTML = percent+"%";

    var totalNuevoNSP = document.getElementById(key+"_tot").innerHTML;
    var totalNuevoEJ = document.getElementById("Total_tot").innerHTML; //AQUI
    percent = Math.round((totalNuevoNSP*100)/totalNuevoEJ);
    document.getElementById("percent_"+key+"_tot").innerHTML = percent+"%";
    
}



