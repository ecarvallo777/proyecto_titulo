
            $(document).ready(function () {
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

            //CAJAS INDICADORES 
                $.ajax({
                    method: 'GET',
                    url:    "/get_programacion/",
                    dataType: "json",
                    
                    headers:{
                    "X-CSRFToken": getCookie('csrftoken'),

                        },
                    success: function(response){
                        var contenido = '<h4 class="widget-title">Proyección de comportamiento consultas 2021.</h4>'+
                        '<p>Se estima que desde el último mes que se actualizó en consultas realizadas:</p>'+
                        '<p>Se logrará alcanzar un <b>'+response.proyeccionFinal+'</b> de la proyección si se continua con la fuerza laboral actual, pues, es necesario satisfacer <b>'+response.restantesConsultas+' </b>consultas.</p>'+
                        '<br></br>'+
                        '<p><b>Fuerza de trabajo actual: </b>'+response.promedioConsultas+' consultas realizadas en promedio en el mes.</p>'
                        $('#proyeccions').append(contenido);
                    },
                    error: function (data) {
                    }
                
            });                








            //CAJAS INDICADORES

                // Enviar submitvalue + suma meses backend
                $.ajax({
                    method: 'GET',
                    url:    "/get_dashboard/",
                    dataType: "json",
                    
                    headers:{
                    "X-CSRFToken": getCookie('csrftoken'),

                        },
                    success: function(response){
                        dash(response);
                       },
                    error: function (data) {
                    }
                
            });

            function dash(response){
                let consultas_proyeccion = [];
                let especialidades = [];
                let totalTotal = [];
                for (var i=0; i< response.length; i++){
                    if(response[i].model == "gestorhsc.especialidad"){
                        especialidades.push(response[i]);
                    }else if(response[i].model== "gestorhsc.metasconsultas"){
                        consultas_proyeccion.push(response[i]);
                    }else if(response[i].model == "gestorhsc.metastotales"){
                        totalTotal.push(response[i]);
                    }
                }


                var get_especialidad;
                var get_especialidad_ ;
                let especialidad =[];
                for(var i=0; i<especialidades.length; i++){
                    get_especialidad = especialidades[i];
                    get_especialidad_ = Object.values(get_especialidad);
                    especialidad.push(get_especialidad_[2].nombre);
                }
                
                var get_proyeccion;
                var get_proyeccion_;
                let proyeccioncontroles = [];
                let proyeccionnuevas = [];
                for (var i=0; i<consultas_proyeccion.length; i++){
                    get_proyeccion = consultas_proyeccion[i];
                    get_proyeccion_ = Object.values(get_proyeccion);
                    proyeccionnuevas.push(get_proyeccion_[2].nuevas);
                    proyeccioncontroles.push(get_proyeccion_[2].controles);
                }

                for (var i=0; i<5; i++){  
                    if(response[i].pk == 1){var nuevas = response[i];}
                    else if(response[i].pk == 2){var controles = response[i];}
                    else if(response[i].pk == 3){var totales = response[i];}
                    
                                        }
                var nuevas_ = Object.values(nuevas);
                var controles_ = Object.values(controles);
                var totales_ = Object.values(totales);

                var totalTotal_ = Object.values(totalTotal[0]);
                
                // Indicador porcentaje cumplido en relación a lo proyectado
                var ejecutadas_total = parseInt(totales_[2].tot);
                var TotalTotal = parseInt(totalTotal_[2].totalTotal);
                var percent = Math.round((ejecutadas_total*100)/TotalTotal);
                document.getElementById('Percent').innerHTML = percent;

            'use strict';

            Highcharts.chart('chrt1', {
            colors: ['#dadada','#67ba5f'],
            chart: {
                type: 'area',
                backgroundColor: "#3B4047",
                borderColor: "#535353"
            },
            legend: {
                enabled: false
            },
            title: {
                text: 'Comportamiento mes a mes de consultas nuevas y control',
                style: { "color": "#ffff", "fontSize": "12px" }
            },
            xAxis: {
                minorGridLineColor: '#535353',
                categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sept', 'Oct', 'Nov', 'Dic'],
                labels: {
                    style: {
                        color: '#fff'
                    }
                }
            },
            yAxis: {
                labels: {
                    style: {
                        color: '#fff'
                    }
                }
            },
            credits: {
                enabled: false
            },
            tooltip: {
                pointFormat: 'Se realizaron <b>{point.y:,.0f}</b> Consultas <b>{series.name}</b>'
            },      
            plotOptions: {
                area: {
                    categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sept', 'Oct', 'Nov', 'Dic'],
                    marker: {
                        enabled: false,
                        symbol: 'circle',
                        radius: 2,
                        states: {
                            hover: {
                                enabled: true
                            }
                        }
                    }
                }
            },
            series: [{
                name: 'Nuevas',
                data: [nuevas_[2].ene, nuevas_[2].feb, nuevas_[2].mar, nuevas_[2].abr, nuevas_[2].may, nuevas_[2].jun, nuevas_[2].jul, nuevas_[2].ago, nuevas_[2].sep, nuevas_[2].oct, nuevas_[2].nov, nuevas_[2].dic]
            }, {
                name: 'Controles',
                data: [controles_[2].ene, controles_[2].feb, controles_[2].mar, controles_[2].abr, controles_[2].may, controles_[2].jun, controles_[2].jul, controles_[2].ago, controles_[2].sep, controles_[2].oct, controles_[2].nov, controles_[2].dic]
            }]


            
        });
        Highcharts.chart('chart5', {
            colors: ['#fc4b6c', '#26c6da', '#1e88e5'],
            chart: {
                type: 'column',
                backgroundColor: "#3B4047",
                borderColor: "#535353"
            },
            xAxis: {
                categories: especialidad,
                labels: {
                    style: {
                        color: '#fff'
                    }
                }
            },
            yAxis: {
                min: 0,
                labels: {
                    style: {
                        color: '#fff'
                    }
                }
            },
            title: {text: null},
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
                shared: true
            },
            plotOptions: {
                column: {stacking: 'percent'}

            },
            legend: {
            align: 'right',
            verticalAlign: 'top',
            symbolRadius: 0,
            itemStyle: {
                color: '#ede',
                fontSize: '13px',
                fontWeight: '300'
            },
            itemHoverStyle: {
                color: '#fff'
            },
        },
            series: [{
                name: 'Nuevas',
                data: proyeccionnuevas
            }, {
                name: 'Controles',
                data: proyeccioncontroles
            }]
        });


        // Chart 1 horas

        $.ajax({
            method: 'GET',
            url:    "/get_chart1/",
            dataType: "json",
            
            headers:{
            "X-CSRFToken": getCookie('csrftoken'),

                },
            success: function(response){
                //llenarChart1(response);
                llenarChart1(response.Anterior, response.Actual);
            },
            error: function (data) {
            }
        
    }); 

    function llenarChart1(anterior, actual){
        var ctx1 = document.getElementById("chart1").getContext("2d");
        var data1 = {
            labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
            
            datasets: [
                {
                    label: "2020",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: anterior
                    
                },
                {
                    label: "2021",
                    fillColor: "rgba(34,186,160,0.2)",
                    strokeColor: "rgba(34,186,160,1)",
                    pointColor: "rgba(34,186,160,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(18,175,203,1)",
                    data: actual
                }
            ]
        };
        
        var chart1 = new Chart(ctx1).Line(data1, {
            scaleShowGridLines : true,
            scaleGridLineColor : "rgba(0,0,0,.05)",
            scaleGridLineWidth : 1,
            scaleShowHorizontalLines: true,
            scaleShowVerticalLines: true,
            bezierCurve : true,
            bezierCurveTension : 0.4,
            pointDot : true,
            pointDotRadius : 4,
            pointDotStrokeWidth : 1,
            pointHitDetectionRadius : 20,
            datasetStroke : true,
            datasetStrokeWidth : 2,
            datasetFill : true,
            legendTemplate : '<table>'
            +'<% for (var i=0; i<datasets.length; i++) { %>'
            +'<tr><td><div class=\"boxx\" style=\"background-color:<%=datasets[i].fillColor %>\"></div></td>'
            +'<% if (datasets[i].label) { %><td><%= datasets[i].label %></td><% } %></tr><tr height="5"></tr>'
            +'<% } %>'
            +'</table>',
            multiTooltipTemplate: "<%= datasetLabel %> - <%= value %>",
            responsive: true,

           
        });

    }
        // chart 2
    var ctx2 = document.getElementById("chart2").getContext("2d");
    var data2 = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,0.8)",
                highlightFill: "rgba(220,220,220,0.75)",
                highlightStroke: "rgba(220,220,220,1)",
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: "My Second dataset",
                fillColor: "rgba(34,186,160,0.5)",
                strokeColor: "rgba(34,186,160,0.8)",
                highlightFill: "rgba(34,186,160,0.75)",
                highlightStroke: "rgba(34,186,160,1)",
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    };
    
    var chart2 = new Chart(ctx2).Bar(data2, {
        scaleBeginAtZero : true,
        scaleShowGridLines : true,
        scaleGridLineColor : "rgba(0,0,0,.05)",
        scaleGridLineWidth : 1,
        scaleShowHorizontalLines: true,
        scaleShowVerticalLines: true,
        barShowStroke : true,
        barStrokeWidth : 2,
        barDatasetSpacing : 1,
        legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
        responsive: true
    });

    

    // 

        //===== ToolTip =====//
        if ($.isFunction($.fn.tooltip)) {
            $('[data-toggle="tooltip"]').tooltip();
        }


                             
            }

                

                

                
            });