function myFunction() {
    // Obtener selección y mostrar información respectiva a selección.
    var x = document.getElementById("selector").value;

    {% for especialista in especialistas_context %}
        if ( "{{especialista.id}}" == x){
            document.getElementById("codsirh").innerHTML = "{{ especialista.sirh }}";
            document.getElementById("rut").innerHTML = "{{ especialista.rut }}";
            document.getElementById("servicio").innerHTML = "{{ especialista.especialidad_id }}";
            document.getElementById("horas").innerHTML = "{{ especialista.contrato_id }}";

            }
            
     {%endfor%}
    // Mostrar calendario respectiva a selección
        var calendarEl = document.getElementById('calendar');

        
        var especialista = parseInt(x); 
        var eventos_selector = [];
        // initialize the external events
                // -----------------------------------------------------------------

       
        
        {% for agenda in agenda_context %}
            if ({{agenda.especialista_id}} == especialista){
                var startStr = formatDate("{{agenda.start}}");
                eventos_selector.push({
                    id: "{{agenda.id}}",
                    title: "{{agenda.title}}",
                    start: startStr
                })
            }
        {%endfor%}
        
        var calendar = new FullCalendar.Calendar(calendarEl, {
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
                },
            editable: true,
            
            droppable: true, // this allows things to be dropped onto the calendar
            eventReceive: function(info) {

                //get the bits of data we want to send into a simple object
                var eventData = {
                    title: info.event.title,
                    start: info.event.startStr,
                    end: info.event.endStr,
                    especialista_id: x
                };
                    const data = new FormData();
                    data.append('id_especialista', eventData.especialista_id);
                    data.append('title', eventData.title);
                    data.append('start', eventData.start);
                    data.append('end', eventData.start);                                                        
                
                    fetch("/addevent/", {
                    method: "POST",
                    dataType: "text",
                    
                    body: data,
                    headers:{
                        "X-CSRFToken": getCookie('csrftoken'),

                    },
                    success: function(response) {
                                if(response == true) {
                                    alert("HOLA");
                                }
                    }})
                    },
            // Función al soltar un external-event en calendar

            // Función al mover un evento dentro del calendario
             eventClick: function(info) {
                    const data = new FormData();
                    data.append('id', info.event.id);
              
                
                    fetch("/delevent/", {
                    method: "POST",
                    dataType: "text",
                    
                    body: data,
                    headers:{
                        "X-CSRFToken": getCookie('csrftoken'),

                    },
                    success: function(response) {
                                if(response == true) {
                                    alert("HOLA");
                                }
                    }})
                    info.event.remove();

                // change the border color just for fun
                },
            eventDrop: function(info){
                    var eventData = {
                        id: info.event.id,
                        start: info.event.startStr,
                        end: info.event.endStr,
                    };
                    const data = new FormData();
                    data.append('id', eventData.id);
                    data.append('start', eventData.start);
                    data.append('end', eventData.end);                                                        
                    fetch("/updevent/", {
                    method: "POST",
                    dataType: "text",
                    
                    body: data,
                    headers:{
                        "X-CSRFToken": getCookie('csrftoken'),

                    },
                    success: function(response) {
                                if(response == true) {
                                    alert("HOLA");
                                }
                    }})
                
                        
                },
            events: eventos_selector
                });
             
                calendar.render();


}