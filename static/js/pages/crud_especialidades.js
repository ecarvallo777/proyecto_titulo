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

function validaForm(){
    toastr.options = {
                    "positionClass": "toast-top-center"
                    }
    
    // Campos de texto
    if($("#input-nombre").val() == ""){
    
        toastr["error"]("El campo nombre no puede estar vacío!")
        $("#input-nombre").focus();       // Esta función coloca el foco de escritura del usuario en el campo Nombre directamente.
        return false;
    }
    if($("#input-tcrecimiento").val() == ""){
        toastr["error"]("El campo tasa de crecimiento no puede estar vacío!")
        $("#input-tcrecimiento").focus();
        return false;
    }
    if($("#input-ausentismo").val() == ""){
        toastr["error"]("El campo Ausentismo no puede estar vacío!")
        $("#input-ausentismo").focus();
        return false;
    }
    
    
    
    
        return true;
     // Si todo está correcto
    }            

    

// CRUD - CREATE

function agregar(){
    toastr.options = {

    "positionClass": "toast-bottom-right"
    }


    if(validaForm()){   

            $.ajax({
            method: 'POST',
            url: "/agregarEspecialidad/",
            dataType: "text",
            data: { 'input-nombre': $("#input-nombre").val(),
                    'input-tcrecimiento': $("#input-tcrecimiento").val(),
                    'input-ausentismo': $("#input-ausentismo").val(),


            },
            headers:{
            "X-CSRFToken": getCookie('csrftoken'),

                },
            success: function(response){
                                                                        
                $("#cerrar").click();
                


                toastr["success"]("Especialidad ingresada exitosamente!")
                window.setTimeout(function(){location.reload()},10000)



            },
            error: function (data) {
            // Your error handling logic here..
                toastr["error"]("No se pudo ingresar especialidad!")
            }

            });
                    }
}

// CRUD UPDATE

function validaFormM(){
    toastr.options = {
                    "positionClass": "toast-top-center"
                    }
    
    // Campos de texto
    if($("#input-nombreM").val() == ""){
    
        toastr["error"]("El campo nombre no puede estar vacío!")
        $("#input-nombreM").focus();       // Esta función coloca el foco de escritura del usuario en el campo Nombre directamente.
        return false;
    }
    if($("#input-tcrecimientoM").val() == ""){
        toastr["error"]("El campo tasa de crecimiento no puede estar vacío!")
        $("#input-tcrecimientoM").focus();
        return false;
    }
    if($("#input-ausentismoM").val() == ""){
        toastr["error"]("El campo Ausentismo no puede estar vacío!")
        $("#input-ausentismoM").focus();
        return false;
    }
    
    
    
    
        return true;
     // Si todo está correcto
    }            
    var id;
    function modif(formss){
    
    
        document.getElementById("bmodificar").click();
        document.getElementById("input-nombreM").value =formss.nombre.value;
        document.getElementById("input-tcrecimientoM").value = formss.tasa_crecimiento.value;
        document.getElementById("input-ausentismoM").value = formss.ausentismo.value;

        id = formss.modificarid.value;
    
        }
    function enviar(){
        toastr.options = {
    
                    "positionClass": "toast-bottom-right"
                    }
    
            if(validaFormM()){
    
                $.ajax({
                method: 'POST',
                url: "/modificarEspecialidad/",
                dataType: "text",
                data: { 'nombre': $("#input-nombreM").val(),
                        'tasa_crecimiento': $("#input-tcrecimientoM").val(),
                        'ausentismo' : $("#input-ausentismoM").val(),
                        
                        'id': id,
    
    
                },
                headers:{
                "X-CSRFToken": getCookie('csrftoken'),
    
                        },
                success: function(response){
                                                                            
                    $("#cerrarM").click();
                    
    
    
                    toastr["success"]("Especialista modificado exitosamente!")
                    location.reload();

    
    
                                            },
                error: function (data) {
                // Your error handling logic here..
                    toastr["error"]("No se pudo modificar especialista!")
                                        }
            
                         });
                            }
                    }

// CRUD DELETE

function eliminate(forms){
    var ID =forms.eliminarid.value;
    $.ajax({
        method: 'POST',
        url: "/eliminarEspecialidad/",
        dataType: "text",
        data: { 'id': ID,
              },
        headers:{
        "X-CSRFToken": getCookie('csrftoken'),

                },
        success: function(response){
                                                                    

            


            toastr["success"]("Especialidad eliminada exitosamente!")
            location.reload();



                                    },
        error: function (data) {
        // Your error handling logic here..
            toastr["error"]("No se pudo eliminar especialidad!")
                                }
    
                 });


                }


