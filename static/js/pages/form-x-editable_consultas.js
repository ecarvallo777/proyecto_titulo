$(function(value){

    //ajax mocks
    $.mockjaxSettings.responseTime = 500; 
    
    $.mockjax({

        url: '/post',
        response: function(settings) {
            log(settings, this);
        }
    });

    $.mockjax({
        url: '/error',
        status: 400,
        statusText: 'Bad Request',
        response: function(settings) {
            this.responseText = 'Please input correct value'; 
            log(settings, this);
        }        
    });
    
    $.mockjax({
        url: '/status',
        status: 500,
        response: function(settings) {
            this.responseText = 'Internal Server Error';
            log(settings, this);
        }        
    });
  
    $.mockjax({
        url: '/groups',
        response: function(settings) {
            this.responseText = [ 
             {value: 0, text: 'Guest'},
             {value: 1, text: 'Service'},
             {value: 2, text: 'Customer'},
             {value: 3, text: 'Operator'},
             {value: 4, text: 'Support'},
             {value: 5, text: 'Admin'}
           ];
           log(settings, this);
        }        
    });
    
    function log(settings, response) {
            var s = [], str;
            s.push(settings.type.toUpperCase() + ' url = "' + settings.url + '"');
            for(var a in settings.data) {
                if(settings.data[a] && typeof settings.data[a] === 'object') {
                    str = [];
                    for(var j in settings.data[a]) {str.push(j+': "'+settings.data[a][j]+'"');}
                    str = '{ '+str.join(', ')+' }';
                } else {
                    str = '"'+settings.data[a]+'"';
                }
                s.push(a + ' = ' + str);
            }
            s.push('RESPONSE: status = ' + response.status);

            if(response.responseText) {
                if($.isArray(response.responseText)) {
                    s.push('[');
                    $.each(response.responseText, function(i, v){
                       s.push('{value: ' + v.value+', text: "'+v.text+'"}');
                    }); 
                    s.push(']');
                } else {
                   s.push($.trim(response.responseText));
                }
            }
            s.push('--------------------------------------\n');
            $('#console').val(s.join('\n') + $('#console').val());
    }    
  
   //defaults
   $.fn.editable.defaults.url = '/post'; 

            var c = window.location.href.match(/c=inline/i) ? 'inline' : 'popup';
            $.fn.editable.defaults.mode = c === 'inline' ? 'inline' : 'popup';

                $('#c').val(c);
    //enable / disable
   $('#enable').click(function() {
       $('#user .editable').editable('toggleDisabled');
   });    
    
    //editables 
    $('#usernamee').editable({
           url: '/post',
           type: 'text',
           pk: 1,
           name: 'username',
           title: 'Enter username'
    });
    
    $('#firstname').editable({
        validate: function(value) {
           if($.trim(value) == '') return 'This field is required';
        }
    });
    
       
// INGRESAR TODAS LAS ESPECIALIDADES
    
    $('#a_ene').editable();
    $('#a_feb').editable();
    $('#a_mar').editable();
    $('#a_abr').editable();
    $('#a_may').editable();
    $('#a_jun').editable();
    $('#a_jul').editable();
    $('#a_ago').editable();
    $('#a_sep').editable();
    $('#a_oct').editable();
    $('#a_nov').editable();
    $('#a_dic').editable();    
    $('#Pediatría_nuevas').editable();   
    $('#Pediatría_controles').editable();  

    $('#Cirugía\\ Pediátrica_nuevas').editable();   
    $('#Cirugía\\ Pediátrica_controles').editable();  

    $('#Medicina\\ Interna_controles').editable();  
    $('#Medicina\\ Interna_nuevas').editable();   

    $('#Enfermedad\\ Respiratoria\\ Adulto_controles').editable();  
    $('#Enfermedad\\ Respiratoria\\ Adulto_nuevas').editable();  

    $('#Cardiología_nuevas').editable();   
    $('#Cardiología_controles').editable();  

    $('#Geriatría_nuevas').editable();   
    $('#Geriatría_controles').editable();  

    $('#Neurología\\ Adulto_nuevas').editable();   
    $('#Neurología\\ Adulto_controles').editable();  

    $('#Cirugía\\ General\\ Adulto_nuevas').editable();   
    $('#Cirugía\\ General\\ Adulto_controles').editable();  

    $('#Anestesiología_nuevas').editable();   
    $('#Anestesiología_controles').editable();  

    $('#Obstetricia_nuevas').editable();   
    $('#Obstetricia_controles').editable();  

    $('#Ginecología\\ Adulto_nuevas').editable();   
    $('#Ginecología\\ Adulto_controles').editable();  

    $('#Oftalmología_nuevas').editable();   
    $('#Oftalmología_controles').editable();  

    $('#Otorrinolaringología_nuevas').editable();   
    $('#Otorrinolaringología_controles').editable();  

    $('#Traumatología\\ y\\ Ortopedia_nuevas').editable();   
    $('#Traumatología\\ y\\ Ortopedia_controles').editable();  

    $('#Urología\\ Adulto_nuevas').editable();   
    $('#Urología\\ Adulto_controles').editable();  

    $('#Nuevas_ene').editable();  
    $('#Nuevas_feb').editable();  
    $('#Nuevas_mar').editable();  
    $('#Nuevas_abr').editable();  
    $('#Nuevas_may').editable();  
    $('#Nuevas_jun').editable();  
    $('#Nuevas_jul').editable();  
    $('#Nuevas_ago').editable();  
    $('#Nuevas_sep').editable();  
    $('#Nuevas_oct').editable();  
    $('#Nuevas_nov').editable();  
    $('#Nuevas_dic').editable();  
    $('#Nuevas_tot').editable();  
    $('#Controles_ene').editable();  
    $('#Controles_feb').editable();  
    $('#Controles_mar').editable();  
    $('#Controles_abr').editable();  
    $('#Controles_may').editable();  
    $('#Controles_jun').editable();  
    $('#Controles_jul').editable();  
    $('#Controles_ago').editable();  
    $('#Controles_sep').editable();  
    $('#Controles_oct').editable();  
    $('#Controles_nov').editable();  
    $('#Controles_dic').editable();  
    $('#Controles_tot').editable(); 
    $('#NSP_ene').editable();
    $('#NSP_feb').editable();
    $('#NSP_mar').editable();
    $('#NSP_abr').editable();
    $('#NSP_may').editable();
    $('#NSP_jun').editable();
    $('#NSP_jul').editable();
    $('#NSP_ago').editable();
    $('#NSP_sep').editable();
    $('#NSP_oct').editable();
    $('#NSP_nov').editable();
    $('#NSP_dic').editable();

   $('#user .editable').on('hidden', function(e, reason){
        if(reason === 'save' || reason === 'nochange') {
            var $next = $(this).closest('tr').next().find('.editable');
            if($('#autoopen').is(':checked')) {
                setTimeout(function() {
                    $next.editable('show');
                }, 300); 
            } else {
                $next.focus();
            } 
        }
   });
});