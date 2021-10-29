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

function checkRut(rut) {
toastr.options = {
                "positionClass": "toast-top-center"
                }
// Despejar Puntos
var valor = rut.replace('.','');
// Despejar Guión
valor = valor.replace('-','');

// Aislar Cuerpo y Dígito Verificador
cuerpo = valor.slice(0,-1);
dv = valor.slice(-1).toUpperCase();

// Formatear RUN
rut.value = cuerpo + '-'+ dv

// Si no cumple con el mínimo ej. (n.nnn.nnn)
if(cuerpo.length < 7) {toastr["error"]("Rut incompleto!"); return false;}

// Calcular Dígito Verificador
suma = 0;
multiplo = 2;

// Para cada dígito del Cuerpo
for(i=1;i<=cuerpo.length;i++) {

    // Obtener su Producto con el Múltiplo Correspondiente
    index = multiplo * valor.charAt(cuerpo.length - i);
    
    // Sumar al Contador General
    suma = suma + index;
    
    // Consolidar Múltiplo dentro del rango [2,7]
    if(multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }

}

// Calcular Dígito Verificador en base al Módulo 11
dvEsperado = 11 - (suma % 11);

// Casos Especiales (0 y K)
dv = (dv == 'K')?10:dv;
dv = (dv == 0)?11:dv;

// Validar que el Cuerpo coincide con su Dígito Verificador
if(dvEsperado != dv) {toastr["error"]("Rut inválido!"); return false; }

// Si todo sale bien, eliminar errores (decretar que es válido)
return true;
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
if($("#input-sirh").val() == ""){
    toastr["error"]("El campo SIRH no puede estar vacío!")
    $("#input-sirh").focus();
    return false;
}
if($("#input-rut").val() == ""){
    toastr["error"]("El campo Dirección no puede estar vacío!")
    $("#input-rut").focus();
    return false;
}
if($("#input-telefono").val() == ""){
    toastr["error"]("El campo teléfono no puede estar vacío!")
    $("#input-telefono").focus();
    return false;
}
if(checkRut($("#input-rut").val())){



return true;
} // Si todo está correcto
}            
function agregar(){
                toastr.options = {

                "positionClass": "toast-bottom-right"
                }


    if(validaForm()){

            $.ajax({
                    method: 'POST',
                    url: "/agregarEspecialista/",
                    dataType: "json",
                    data: { 'input-nombre': $("#input-nombre").val(),
                            'especialidad': $("#especialidad").val(),
                            'contrato' : $("#contrato").val(),
                            'input-sirh': $("#input-sirh").val(),
                            'input-rut': $("#input-rut").val(),
                            'input-telefono': $("#input-telefono").val(),

                    },
                    headers:{
                    "X-CSRFToken": getCookie('csrftoken'),

                        },
                    success: function(response){
                                                                                
                        $("#cerrar").click();
                        
                        toastr["success"]("Especialista ingresado exitosamente!")
                        location.reload();




                    },
                    error: function (data) {
                    // Your error handling logic here..
                        toastr["error"]("No se pudo ingresar especialista!")
                    }
                
            });
                        }
}
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
if($("#input-sirhM").val() == ""){
    toastr["error"]("El campo SIRH no puede estar vacío!")
    $("#input-sirhM").focus();
    return false;
}
if($("#input-rutM").val() == ""){
    toastr["error"]("El campo Dirección no puede estar vacío!")
    $("#input-rutM").focus();
    return false;
}
if($("#input-telefonoM").val() == ""){
    toastr["error"]("El campo teléfono no puede estar vacío!")
    $("#input-telefonoM").focus();
    return false;
}
if(checkRut($("#input-rutM").val())){



return true;
} // Si todo está correcto
}
var id;
function modif(formss){

    var espec= formss.especialidad.value;
    var objeto_esp = document.getElementById(espec);
    objeto_esp.setAttribute("selected", "");

    document.getElementById("bmodificar").click();
    document.getElementById("input-nombreM").value =formss.nombre.value;

    document.getElementById("input-sirhM").value = formss.sirh.value;
    document.getElementById("input-rutM").value = formss.rut.value;
    document.getElementById("input-telefonoM").value = formss.telefono.value;

    var contrato = formss.contrato.value;
    console.log(contrato);
    var objeto_contr= document.getElementById(contrato);
    console.log(objeto_contr);
    objeto_contr.setAttribute("selected", "");

    id = formss.modificarid.value;

    }
function enviar(){
    toastr.options = {

                "positionClass": "toast-bottom-right"
                }

        if(validaFormM()){

            $.ajax({
            method: 'POST',
            url: "/modificarEspecialista/",
            dataType: "text",
            data: { 'input-nombre': $("#input-nombreM").val(),
                    'especialidad': $("#especialidadM").val(),
                    'contrato' : $("#contratoM").val(),
                    'input-sirh': $("#input-sirhM").val(),
                    'input-rut': $("#input-rutM").val(),
                    'input-telefono': $("#input-telefonoM").val(),
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

function eliminate(forms){
        var ID =forms.eliminarid.value;
        $.ajax({
            method: 'POST',
            url: "/eliminarEspecialista/",
            dataType: "text",
            data: { 'id': ID,
                  },
            headers:{
            "X-CSRFToken": getCookie('csrftoken'),

                    },
            success: function(response){
                                                                        

                


                toastr["success"]("Especialista eliminado exitosamente!")

                location.reload();


                                        },
            error: function (data) {
            // Your error handling logic here..
                toastr["error"]("No se pudo eliminar especialista!")
                                    }
        
                     });


                    }
