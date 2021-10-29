var containerEl = document.getElementById('events');
var Draggable = FullCalendar.Draggable;
new Draggable(containerEl, {
                    itemSelector: '.calendar-event',
                    eventData: function(eventEl) {
                    return {
                        title: eventEl.innerText
                    };
                    }
                });
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
    const csrftoken = getCookie('csrftoken');

var eventos_selector = [];
function myFunction() {
    // Obtener selección y mostrar información respectiva a selección.

    var x = document.getElementById("selector").value;
    $.ajax({
        method: 'POST',
        url:    "/get_especialistas/",
        dataType: "json",
        data: {'id':x},   
        headers:{
        "X-CSRFToken": getCookie('csrftoken'),

            },
        success: function(response){

            document.getElementById("codsirh").innerHTML = response.sirh;
            document.getElementById("rut").innerHTML = response.rut;
            document.getElementById("servicio").innerHTML = response.especialidad;
            document.getElementById("horas").innerHTML = response.contrato;        
            var calendarEl = document.getElementById('calendar');

            var eventos = response.eventos;
            eventos = Object.values(eventos);
            eventos_selector = [];
            for (evento of eventos ){
                date_time = evento.start;

                eventos_selector.push({
                                id: evento.id,
                                title: evento.title,
                                start: evento.start,
                                end: evento.end
                            })


            }

            toastr.options = {
                                    "closeButton": true,
                                    "debug": true,
                                    "newestOnTop": true,
                                    "progressBar": true,
                                    "positionClass": "toast-bottom-right",
                                    "preventDuplicates": false,
                                    "onclick": null,
                                    "showDuration": "300",
                                    "hideDuration": "1000",
                                    "timeOut": "5000",
                                    "extendedTimeOut": "1000",
                                    "showEasing": "swing",
                                    "hideEasing": "linear",
                                    "showMethod": "fadeIn",
                                    "hideMethod": "fadeOut"
                                    }
            var calendar = new FullCalendar.Calendar(calendarEl, {
                initialView: 'timeGridWeek',
                
                customButtons:{
                    anterior: {
                        text: 'Anterior',
                        click: function(){
                            calendar.prev();
                            




                            calcularContador();

                        }
                    },
                    siguiente: {
                        text: 'Siguiente',
                        click: function(){
                            calendar.next();
                            calcularContador();
                        }
                    },
                    hoy: {
                        text: 'Hoy',
                        click: function(){
                            calendar.today();
                            calcularContador();
                        }
                    }
                },
                headerToolbar: {
                    left: 'anterior,siguiente hoy',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    },
                editable: true,
                defaultTimedEventDuration: '00:30',
                forceEventDuration: true,
                locale: 'es',
                hiddenDays: [0],
                slotMaxTime: "22:00:00",
                slotMinTime: "08:00:00",
                businessHours: {
                        // days of week. an array of zero-based day of week integers (0=Sunday)
                        dow: [ 1, 2, 3, 4, 5], // Monday - Thursday
                    
                        startTime: '8:00', // a start time (10am in this example)
                        endTime: '17:30' // an end time (6pm in this example)
                    },
                droppable: true, // this allows things to be dropped onto the calendar
                eventResize: function(info){
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
    
                        }
                        })
                    
                       calendar.refetchEvents()
    
    
                },
                eventReceive: function(info) {
    
                    //get the bits of data we want to send into a simple object
                                
                    
    
                                                                            
                        
                        $.ajax({
                            method: 'POST',
                            url: "/addevent/",
                            dataType: "json",
                            data: {
                                'id_especialista': x,
                                'title': info.event.title,
                                'start': info.event.startStr,
                                'end': info.event.endStr
    
                            },
                            headers:{
                            "X-CSRFToken": getCookie('csrftoken'),
    
                                 },
                            success: function(response){
                                idStr = response.toString();
                                eventos_selector.push({
                                id: idStr,
                                title: info.event.title,
                                start:info.event.startStr,
                                end: info.event.endStr
                                 });
                                  info.event.setProp( 'id' , idStr)                                                               
                                 calcularContador();
                                   toastr["success"]("Evento añadido exitosamente!")
    
    
                                },
                            error: function (jqXHR, exception) {
                                toastr["error"]("Acción no se pudo realizar en BD. Consultar con especialista.")
                                // Your error handling logic here..
                            }
                            
                        });        
                        
    
                        },
                // Función al soltar un external-event en calendar
    
                // Función al mover un evento dentro del calendario
    
                 eventClick: function(info) {
    
                        
    
                        
    
                        const data = new FormData();
                        data.append('id', info.event.id);
    
                        $.ajax({
                             method: 'POST',
                             url: "/delevent/",
                             dataType: "json",
                             data: {
                                'id': info.event.id
    
                             },
                             headers:{
                             "X-CSRFToken": getCookie('csrftoken'),
    
                                 },
                             success: function(response){
                                                                                            
                                 
                                info.event.remove();
                                toastr["error"]("Evento eliminado exitosamente!")
                                eventos_selector = eventos_selector.filter(function(obj){
                                        return obj.id !==info.event.id;
                                    });
                                calcularContador();
                                
    
    
    
                                },
                             error: function (jqXHR, exception) {
                                toastr["error"]("Acción no se pudo realizar en BD. Consultar con especialista.")
                                // Your error handling logic here..
                             }
                            
                        });
    
                    
                        
                        
    
                        
    
                    // change the border color just for fu
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
    
    
                        $.ajax({
                             method: 'POST',
                             url: "/updevent/",
                             dataType: "json",
                             data: {
                                'id': info.event.id,
                                'start': info.event.startStr,
                                'end': info.event.endStr
    
                             },
                             headers:{
                             "X-CSRFToken": getCookie('csrftoken'),
    
                                 },
                             success: function(response){
                                                                                            
                                 
                                toastr["warning"]("Evento modificado exitosamente!")
                                
                                
    
    
    
                                },
                             error: function (jqXHR, exception) {
                                 toastr["error"]("Acción no se pudo realizar en BD. Consultar con especialista.")
                                // Your error handling logic here..
                             }
                            
                        });
    
                    
                        
    
    
                    },
                events: eventos_selector
                    });
                    calcularContador();
    
                        
                        calendar.render();
                        function clearContador(){
                            document.getElementById("procedimientos").innerHTML = "-";
                            document.getElementById("intervenciones").innerHTML = "-";
                            document.getElementById("consultas").innerHTML = "-";
                            document.getElementById("visitas").innerHTML = "-";
                            document.getElementById("colacion").innerHTML = "-";
                            
                        }

                        function calcularContador(){
                            clearContador();
                            var view= calendar.view;
                            var from = Date.parse((view.activeStart).toDateString());
    
                            var to= Date.parse((view.activeEnd).toDateString());
    
    
                            var cProcedimientos=0;
                            var cConsultas=0;
                            var cVisitas=0;
                            var cColacion=0;
                            var cIntervenciones=0;
                            var cTotal=0;
                            for (const x of eventos_selector) { 
                                var check = new Date(x.start);
                                check = Date.parse(check.toDateString());
    
                                if((check <= to && check >= from)) {
                                        if(x.title == "Procedimientos"){
    
                                          cProcedimientos = cProcedimientos + .5;
                                          cTotal = cTotal + .5;
                                        }else if(x.title =="Consultas"){
                                            cConsultas = cConsultas + .5;
                                            cTotal = cTotal + .5;
                                        }else if(x.title =="Visitas"){
                                            cVisitas= cVisitas +.5;
                                            cTotal = cTotal + .5;
                                        }else if(x.title == "Colación"){
                                            cColacion = cColacion+.5;
                                            cTotal = cTotal + .5;
    
                                        }else if(x.title=="Intervenciones"){
                                            cIntervenciones=cIntervenciones+.5;
                                            cTotal = cTotal + .5;
                                        }
                                    }
                                    document.getElementById("procedimientos").innerHTML = cProcedimientos;
                                    document.getElementById("consultas").innerHTML = cConsultas;
                                    document.getElementById("visitas").innerHTML = cVisitas;
                                    document.getElementById("colacion").innerHTML = cColacion;
                                    document.getElementById("intervenciones").innerHTML = cIntervenciones;
                                    document.getElementById("cTotal").innerHTML = cTotal;
    
                                    
    
    
    
                                }
    
    
    
    
                        }
                                    

                    },
                         //},
        error: function (xhr) {
            
                              }

            });
        } 
function precargar(){
    var x = document.getElementById("selector").value;
    $.ajax({
        method: 'POST',
        url:    "/precargar/",
        dataType: "json",
        data: {'id':x},   
        headers:{
        "X-CSRFToken": getCookie('csrftoken'),

            },
        success: function(response){
            var eventos_selector = [];
            console.log(eventos_selector);
            var eventos = Object.values(response);
            for (evento of eventos ){

                eventos_selector.push({
                                id: null,
                                title: evento.title,
                                start: evento.start,
                                end: evento.end
                            })


            }
            myFunction();

        },
        error: function (xhr) {

             }
            });

}


    //{% for especialista in especialistas_context %}
    //    if ( "{{especialista.id}}" == x){
    //        document.getElementById("codsirh").innerHTML = "{{ especialista.sirh }}";
    //        document.getElementById("rut").innerHTML = "{{ especialista.rut }}";
    //        document.getElementById("servicio").innerHTML = "{{ especialista.especialidad_id }}";
    //        document.getElementById("horas").innerHTML = "{{ especialista.contrato_id }}";
    //
    //        }
    //        
    // {%endfor%}  
     
     //Esto no me parece eficiente, quizás es mejor tomar el id y hacer un request a la bd en vez de buscar id x id con if (SOLVED)
    // Mostrar calendario respectiva a selección





