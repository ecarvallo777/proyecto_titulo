$(function(value){

    //ajax mocks
    
   
    
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
    
    $('#CMF_ene').editable();
    $('#CMF_feb').editable();
    $('#CMF_mar').editable();
    $('#CMF_abr').editable();
    $('#CMF_may').editable();
    $('#CMF_jun').editable();
    $('#CMF_jul').editable();
    $('#CMF_ago').editable();
    $('#CMF_sep').editable();
    $('#CMF_oct').editable();
    $('#CMF_nov').editable();
    $('#CMF_dic').editable();

    $('#CMF\\ Infantil_ene').editable();
    $('#CMF\\ Infantil_feb').editable();
    $('#CMF\\ Infantil_mar').editable();
    $('#CMF\\ Infantil_abr').editable();
    $('#CMF\\ Infantil_may').editable();
    $('#CMF\\ Infantil_jun').editable();
    $('#CMF\\ Infantil_jul').editable();
    $('#CMF\\ Infantil_ago').editable();
    $('#CMF\\ Infantil_sep').editable();
    $('#CMF\\ Infantil_oct').editable();
    $('#CMF\\ Infantil_nov').editable();
    $('#CMF\\ Infantil_dic').editable();

    $('#Cirugia\\ General_ene').editable();
    $('#Cirugia\\ General_feb').editable();
    $('#Cirugia\\ General_mar').editable();
    $('#Cirugia\\ General_abr').editable();
    $('#Cirugia\\ General_may').editable();
    $('#Cirugia\\ General_jun').editable();
    $('#Cirugia\\ General_jul').editable();
    $('#Cirugia\\ General_ago').editable();
    $('#Cirugia\\ General_sep').editable();
    $('#Cirugia\\ General_oct').editable();
    $('#Cirugia\\ General_nov').editable();
    $('#Cirugia\\ General_dic').editable();

    $('#Cirugia\\ Vascular_ene').editable();
    $('#Cirugia\\ Vascular_feb').editable();
    $('#Cirugia\\ Vascular_mar').editable();
    $('#Cirugia\\ Vascular_abr').editable();
    $('#Cirugia\\ Vascular_may').editable();
    $('#Cirugia\\ Vascular_jun').editable();
    $('#Cirugia\\ Vascular_jul').editable();
    $('#Cirugia\\ Vascular_ago').editable();
    $('#Cirugia\\ Vascular_sep').editable();
    $('#Cirugia\\ Vascular_oct').editable();
    $('#Cirugia\\ Vascular_nov').editable();
    $('#Cirugia\\ Vascular_dic').editable();


    $('#Cirugia\\ Infantil_ene').editable();
    $('#Cirugia\\ Infantil_feb').editable();
    $('#Cirugia\\ Infantil_mar').editable();
    $('#Cirugia\\ Infantil_abr').editable();
    $('#Cirugia\\ Infantil_may').editable();
    $('#Cirugia\\ Infantil_jun').editable();
    $('#Cirugia\\ Infantil_jul').editable();
    $('#Cirugia\\ Infantil_ago').editable();
    $('#Cirugia\\ Infantil_sep').editable();
    $('#Cirugia\\ Infantil_oct').editable();
    $('#Cirugia\\ Infantil_nov').editable();
    $('#Cirugia\\ Infantil_dic').editable();


    $('#Ginecología_ene').editable();
    $('#Ginecología_feb').editable();
    $('#Ginecología_mar').editable();
    $('#Ginecología_abr').editable();
    $('#Ginecología_may').editable();
    $('#Ginecología_jun').editable();
    $('#Ginecología_jul').editable();
    $('#Ginecología_ago').editable();
    $('#Ginecología_sep').editable();
    $('#Ginecología_oct').editable();
    $('#Ginecología_nov').editable();
    $('#Ginecología_dic').editable();    

    
    $('#Oftalmología_ene').editable();
    $('#Oftalmología_feb').editable();
    $('#Oftalmología_mar').editable();
    $('#Oftalmología_abr').editable();
    $('#Oftalmología_may').editable();
    $('#Oftalmología_jun').editable();
    $('#Oftalmología_jul').editable();
    $('#Oftalmología_ago').editable();
    $('#Oftalmología_sep').editable();
    $('#Oftalmología_oct').editable();
    $('#Oftalmología_nov').editable();
    $('#Oftalmología_dic').editable();

    $('#Obstetricia_ene').editable();
    $('#Obstetricia_feb').editable();
    $('#Obstetricia_mar').editable();
    $('#Obstetricia_abr').editable();
    $('#Obstetricia_may').editable();
    $('#Obstetricia_jun').editable();
    $('#Obstetricia_jul').editable();
    $('#Obstetricia_ago').editable();
    $('#Obstetricia_sep').editable();
    $('#Obstetricia_oct').editable();
    $('#Obstetricia_nov').editable();
    $('#Obstetricia_dic').editable(); 

    $('#Otorrinolaringología\\ Infantil_ene').editable();
    $('#Otorrinolaringología\\ Infantil_feb').editable();
    $('#Otorrinolaringología\\ Infantil_mar').editable();
    $('#Otorrinolaringología\\ Infantil_abr').editable();
    $('#Otorrinolaringología\\ Infantil_may').editable();
    $('#Otorrinolaringología\\ Infantil_jun').editable();
    $('#Otorrinolaringología\\ Infantil_jul').editable();
    $('#Otorrinolaringología\\ Infantil_ago').editable();
    $('#Otorrinolaringología\\ Infantil_sep').editable();
    $('#Otorrinolaringología\\ Infantil_oct').editable();
    $('#Otorrinolaringología\\ Infantil_nov').editable();
    $('#Otorrinolaringología\\ Infantil_dic').editable(); 

    $('#TMT\\ Infantil_ene').editable();
    $('#TMT\\ Infantil_feb').editable();
    $('#TMT\\ Infantil_mar').editable();
    $('#TMT\\ Infantil_abr').editable();
    $('#TMT\\ Infantil_may').editable();
    $('#TMT\\ Infantil_jun').editable();
    $('#TMT\\ Infantil_jul').editable();
    $('#TMT\\ Infantil_ago').editable();
    $('#TMT\\ Infantil_sep').editable();
    $('#TMT\\ Infantil_oct').editable();
    $('#TMT\\ Infantil_nov').editable();
    $('#TMT\\ Infantil_dic').editable();
    
    $('#Traumatología_ene').editable();
    $('#Traumatología_feb').editable();
    $('#Traumatología_mar').editable();
    $('#Traumatología_abr').editable();
    $('#Traumatología_may').editable();
    $('#Traumatología_jun').editable();
    $('#Traumatología_jul').editable();
    $('#Traumatología_ago').editable();
    $('#Traumatología_sep').editable();
    $('#Traumatología_oct').editable();
    $('#Traumatología_nov').editable();
    $('#Traumatología_dic').editable(); 

    $('#Urología_ene').editable();
    $('#Urología_feb').editable();
    $('#Urología_mar').editable();
    $('#Urología_abr').editable();
    $('#Urología_may').editable();
    $('#Urología_jun').editable();
    $('#Urología_jul').editable();
    $('#Urología_ago').editable();
    $('#Urología_sep').editable();
    $('#Urología_oct').editable();
    $('#Urología_nov').editable();
    $('#Urología_dic').editable(); 

    $('#Urología\\ Infantil_ene').editable();
    $('#Urología\\ Infantil_feb').editable();
    $('#Urología\\ Infantil_mar').editable();
    $('#Urología\\ Infantil_abr').editable();
    $('#Urología\\ Infantil_may').editable();
    $('#Urología\\ Infantil_jun').editable();
    $('#Urología\\ Infantil_jul').editable();
    $('#Urología\\ Infantil_ago').editable();
    $('#Urología\\ Infantil_sep').editable();
    $('#Urología\\ Infantil_oct').editable();
    $('#Urología\\ Infantil_nov').editable();
    $('#Urología\\ Infantil_dic').editable(); 
    

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