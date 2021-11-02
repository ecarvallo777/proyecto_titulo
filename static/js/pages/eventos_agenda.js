function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
    // Enviar submitvalue + suma meses backend
    $.ajax({
        method: 'GET',
        url:    "/get_eventos/",
        dataType: "json",
        
        headers:{
        "X-CSRFToken": getCookie('csrftoken'),

            },
        success: function(response){
            var total;
            var suma=0;
            var contenido;

            $("#eventos_cons").html("");
            for(var i=0; i< response.length; i++){
            suma = parseInt(response[i].Conteo)+suma;
            contenido = "<tr>"+
                "<th scope='row'>"+response[i].Especialidad+"</th>"+
            
                "<td>"+(response[i].Conteo*2)+"</td>"+ //Se multiplica la cantidad de eventos por especialidad por 2 ya que el rendimiento es 2 x bloque
            

                "</tr>";
            
            $("#eventos_cons").append(contenido);
            }
            total = "<tr>"+
            "<th scope='row'>Total</th>"+
        
            "<td>"+(suma*2)+"</td>"+
        

            "</tr>";
            $("#eventos_cons").append(total);

                    
                        //document.getElementById("eventos_cons").innerHTML = contenido;
                         },
        error: function (xhr) {
            
        }
    
});

