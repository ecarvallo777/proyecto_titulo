from django.http.response import HttpResponse, JsonResponse
from django.shortcuts import render
from gestorhsc.models import Especialista, Contrato, Especialidad, Agenda, MetasConsultas, MetasTotales, ConsultasCumplimiento
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
from datetime import date, timedelta, datetime
import json
def calendars(request):
    return render(request, 'calendars.html' )
@csrf_exempt

def inicio(request):

    
    
    indicadores_json = {}
    #Indicador 1: Consultas realizadas / proyectado
    consultasRealizadas = ConsultasCumplimiento.objects.get(id=3).tot
    consultasProyectadas = MetasTotales.objects.get(id=1).totalTotal
    indicadores_json['1'] = round((consultasRealizadas/consultasProyectadas)*100)
   # print(indicadores_json['1'])
   
    #Indicador 2: Consultas nuevas / consultas realizadas
    nuevasRealizadas = ConsultasCumplimiento.objects.get(id=1).tot   
    indicadores_json['2'] = round((nuevasRealizadas/consultasRealizadas)*100)
    
   # print(indicadores_json['2'])
   
   
   #Indicador 3: consultas en Alta / consultas realizadas
    altasRealizadas = ConsultasCumplimiento.objects.get(id=5).tot
    indicadores_json['3'] = round((altasRealizadas/consultasRealizadas)*100)
   # print(indicadores_json['3'])
    
    #Indicador 4: NSP / consultas realizadas
    nsp = ConsultasCumplimiento.objects.get(id=4).tot
    indicadores_json['4'] = round((nsp/consultasRealizadas)*100)
   # print(indicadores_json['4'])
    #indicadores_json = json.dumps(indicadores_json)
    
    indicadores_json['proyectadas'] = consultasProyectadas

    
    
    return render(request, 'inicio.html', {'indicadores':indicadores_json})

def calendario(request):

    especialidad_queryset = Especialidad.objects.all()
    especialistas_queryset = Especialista.objects.all()
    agenda_queryset= Agenda.objects.all()

    context={'especialidad_context':especialidad_queryset, 'especialistas_context':especialistas_queryset, 'agenda_context':agenda_queryset}
    
    return render(request, 'agenda.html', context)
@csrf_exempt
def get_especialistas(request):
    id = request.POST.get("id")
    especialista = Especialista.objects.get(id=id)

    
    especialidad = especialista.especialidad.nombre
    contrato = especialista.contrato.horas_contrato
    especialista = especialista.__dict__
    especialista['especialidad'] = especialidad
    especialista['contrato'] = contrato
    #especialista= especialista.replace("")
    especialista.pop('_state', None)
    #especialista = str(especialista)
    events = {}
    #eventos = serializers.serialize("json", Agenda.objects.filter(especialista_id=id))
    #eventos = eventos.replace("[", "")
    #eventos= eventos.replace("]", "")
    eventos = Agenda.objects.filter(especialista_id=id)
    i=0
    for evento in eventos:
        event = {}
        i=i+1
        event['id'] = evento.id
        event['title'] = evento.title
        event['start'] = evento.start
        event['end'] = evento.end
        events[i] = event
    especialista['eventos'] = events   
    
    #print(especialista)
    
    especialista_json = json.dumps(especialista)
    #print(especialista_json)
    return HttpResponse(especialista_json)

def guardar_meses(atributo, objeto, valueSubmit, totalTotal):

    if atributo == "ene":
        objeto.ene = valueSubmit
        objeto.save()
        objeto.tot = totalTotal
        objeto.save()

    elif atributo =="feb":
        objeto.feb = valueSubmit
        objeto.save()
        objeto.tot = totalTotal
        objeto.save()
    elif atributo == "mar":
        objeto.mar = valueSubmit
        objeto.save()
        objeto.tot = totalTotal
        objeto.save()
    elif atributo == "abr":
        objeto.abr = valueSubmit
        objeto.save()
        objeto.tot = totalTotal
        objeto.save()
    elif atributo == "may":
        objeto.may = valueSubmit
        objeto.save()
        objeto.tot = totalTotal
        objeto.save()
    elif atributo == "jun":
        objeto.jun = valueSubmit
        objeto.save()
        objeto.tot = totalTotal
        objeto.save()
    elif atributo == "jul":
        objeto.jul = valueSubmit
        objeto.save()
        objeto.tot = totalTotal
        objeto.save()
    elif atributo == "ago":
        objeto.ago = valueSubmit
        objeto.save()
        objeto.tot = totalTotal
    elif atributo == "sep":
        objeto.sep = valueSubmit
        objeto.save()
        objeto.tot = totalTotal
        objeto.save()
    elif atributo == "oct":
        objeto.oct = valueSubmit
        objeto.save()
        objeto.tot = totalTotal
        objeto.save()
    elif atributo == "nov":
        objeto.nov = valueSubmit
        objeto.save()
        objeto.tot = totalTotal
        objeto.save()
    elif atributo == "dic":
        objeto.dic = valueSubmit
        objeto.save()
        objeto.tot = totalTotal
        objeto.save()
    return 1
@csrf_exempt
def post_altas(request):
    atributo = request.POST.get('atributo')
    valueSubmit = request.POST.get('valueSubmit')
    totalTotal = request.POST.get('totalTotal')
    
    objeto = ConsultasCumplimiento.objects.get(id=5)
    guardar_meses(atributo, objeto, valueSubmit, totalTotal)
    
    return HttpResponse()


@csrf_exempt
def post(request):
    value = request.POST.get("value")
    row = request.POST.get("row")
    atributo = request.POST.get("atributo")
    sumaEspecialidad = request.POST.get("sumaEspecialidad")
    
    totalNuevas = request.POST.get("totalNuevas")
    totalControles = request.POST.get("totalControles")
    totalTotal = request.POST.get("totalTotal")
    

    
    t = Especialidad.objects.get(nombre=row)
    s = MetasConsultas.objects.get(especialidad=t.id)
    if atributo == "nuevas": 
        s.nuevas = value
        s.save()
    elif atributo == "controles":
        s.controles = value
        s.save()
    
    s.total = sumaEspecialidad
    s.save()
    
    totals = MetasTotales.objects.get(id=1)
    totals.totalNuevas = int(totalNuevas)
    totals.totalControles = int(totalControles)
    totals.totalTotal = int(totalTotal)
    totals.save()
    
    
    
    return HttpResponse(value)
@csrf_exempt
def postconsultas(request):
    row = request.POST.get("row")
    atributo = request.POST.get("atributo")
    valueTotal = request.POST.get("valueTotal")
    valueSubmit = request.POST.get("valueSubmit")
    sumaMes = request.POST.get("sumaMes")
    totalTotal = request.POST.get("totalTotal")
    t = ConsultasCumplimiento.objects.get(name=row)
    s = ConsultasCumplimiento.objects.get(name="Total")
    t.tot = valueTotal
    t.save
    if atributo == "ene":
        t.ene = valueSubmit
        t.save()
        s.ene = sumaMes
        s.save()

    elif atributo =="feb":
        t.feb = valueSubmit
        t.save()
        s.feb = sumaMes
        s.save()
    elif atributo == "mar":
        t.mar = valueSubmit
        t.save()
        s.mar = sumaMes
        s.save()
    elif atributo == "abr":
        t.abr = valueSubmit
        t.save()
        s.abr = sumaMes
        s.save()
    elif atributo == "may":
        t.may = valueSubmit
        t.save()
        s.may = sumaMes
        s.save()
    elif atributo == "jun":
        t.jun = valueSubmit
        t.save()
        s.jun = sumaMes
        s.save()
    elif atributo == "jul":
        t.jul = valueSubmit
        t.save()
        s.jul = sumaMes
        s.save()
    elif atributo == "ago":
        t.ago = valueSubmit
        t.save()
        s.ago = sumaMes
        s.save()
    elif atributo == "sep":
        t.sep = valueSubmit
        t.save()
        s.sep = sumaMes
        s.save()
    elif atributo == "oct":
        t.oct = valueSubmit
        t.save()
        s.oct = sumaMes
        s.save()
    elif atributo == "nov":
        t.nov = valueSubmit
        t.save()
        s.nov = sumaMes
        s.save()
    elif atributo == "dic":
        t.dic = valueSubmit
        t.save()
        s.dic = sumaMes
        s.save()
    s.tot = totalTotal
    s.save()
        
    return HttpResponse(valueTotal)
@csrf_exempt
def post_ausentismo(request):
    atributo = request.POST.get('atributo')
    valueSubmit = request.POST.get('valueSubmit')
    totalTotal = request.POST.get('totalTotal')
    
    objeto = ConsultasCumplimiento.objects.get(id=4)
    guardar_meses(atributo, objeto, valueSubmit, totalTotal)

    return HttpResponse()

@csrf_exempt
def get_ausentismo(request):
    
    ausentismo = ConsultasCumplimiento.objects.get(id=4)
    ausentismo = ausentismo.__dict__
    ausentismo.pop('_state',None)
    ausentismo_json = json.dumps(ausentismo)
    return HttpResponse(ausentismo_json)

@csrf_exempt
def getdash(request):
    cumplimiento = serializers.serialize("json", ConsultasCumplimiento.objects.all()) 
    cumplimiento_ = cumplimiento.replace("]",",")
    
    
    context = serializers.serialize("json", Especialidad.objects.only('nombre').order_by('id'))
    context_ = context.replace("[", "")
    context__ = context_.replace("]",",")
    
    proyeccion_total = serializers.serialize("json", MetasTotales.objects.only('totalTotal'))
    proyeccion_total_ = proyeccion_total.replace("[", "")
    proyeccion_total__ = proyeccion_total_.replace("]", ",")
    
    consultas_totales = serializers.serialize("json", MetasConsultas.objects.only('nuevas', 'controles', 'especialidad_id').order_by('especialidad_id'))
    consultas_totales_ = consultas_totales.replace("[", "")
    
    
    
    final = cumplimiento_ + context__ + proyeccion_total__+ consultas_totales_
    return HttpResponse(final)



@csrf_exempt
def get_programacion(request):
    realizadasMeses = ConsultasCumplimiento.objects.get(id=3)
    realizadasMeses = realizadasMeses.__dict__
    
    consultasProyectadas = MetasTotales.objects.get(id=1)
    consultasProyectadas = consultasProyectadas.__dict__
    
    
    
    
    def ultimoMes():
        meses = {'0':'ene','1':'feb','2':'mar','3':'abr','4':'may','5':'jun','6':'jul','7':'ago','8':'sep','9':'oct','10':'nov','11':'dic'}

        acumulador = 0
        resto = 0

        
        for mes in meses.values():
            #print(realizadasMeses[mes])
            if(realizadasMeses[mes] > 0):
                acumulador += 1 + resto
                resto=0
            else:
                resto+=1
        
        return acumulador
    def ultimaProyeccion():
        ultimomes = ultimoMes()
        restantes = consultasProyectadas['totalTotal']- realizadasMeses['tot'] 
        promedioConsultas= int(realizadasMeses['tot'] / ultimomes)
        proyeccionRestante = promedioConsultas * (12 -ultimomes )
        
        diferenciaProyeccion = realizadasMeses['tot'] + proyeccionRestante
        proyeccionFinal =  str(round((diferenciaProyeccion)/consultasProyectadas['totalTotal']*100))+"%"
        dict= {'proyeccionFinal':proyeccionFinal, 'promedioConsultas':promedioConsultas, 'restantesConsultas' : restantes}
        dict = json.dumps(dict)
        return dict

        
    

                 
                
    
    
    return HttpResponse(ultimaProyeccion())


@csrf_exempt
def get_eventos(request):

    eventos_queryset = Agenda.objects.filter(title='Consultas')   
    list =[]
    post = eventos_queryset.only('especialista_id')
    for e in post:
        especialidad = str(e.especialista.especialidad)

        i =0
        u='false'
        for dics in list:
            if especialidad in dics.values():
                u=i
                break

            
            i=i+1
        if isinstance(u, int):
            dic = list[u]
            conteo = int(dic.get("Conteo"))
            dic["Conteo"] = conteo + 1
        else: 
            dic = {'Especialidad': especialidad, 'Conteo': 1}
            list.append(dic)
         
    list_json = json.dumps(list)
    return HttpResponse(list_json)


@csrf_exempt
def addEvent(request):
    id_especialista = request.POST.get("id_especialista")
    
    title = request.POST.get("title")
    start = request.POST.get("start")
    end = request.POST.get("end")



    p = Agenda(title=title,
                especialista_id= id_especialista,
               start=start,
               end=end)
    
    p.save()   
    return HttpResponse(str(p.id))

@csrf_exempt
def updEvent(request):
    id_event = request.POST.get("id")
    start = request.POST.get("start")
    end = request.POST.get("end")

    t = Agenda.objects.get(id=int(id_event))
    t.start = start
    t.end = end
    t.save()
    return HttpResponse(id_event)
@csrf_exempt
def delEvent(request):
    id_event = int(request.POST.get("id"))

    s = Agenda.objects.get(id=id_event).delete()

    return HttpResponse(id_event)
@csrf_exempt

def consultas(request):
    consultas_meta_queryset = MetasConsultas.objects.all()
    consultas_totales = MetasTotales.objects.get(id=1)
    consultas_cumplimiento_queryset = ConsultasCumplimiento.objects.all().order_by('id')
    
    ## Consultas agendadas en agenda médica
    
    

    context = {'consultas_metas':consultas_meta_queryset, 'consultas_totales':consultas_totales, 'consultas_cumplimiento': consultas_cumplimiento_queryset}
    
    return render(request, 'consultas.html/', context)
def noges(request):
    
    
    return render(request, 'noges.html/')

@csrf_exempt


def especialista(request):
    especialista_queryset = Especialista.objects.all()
    contrato_queryset = Contrato.objects.all()
    especialidad_queryset = Especialidad.objects.all()
    
    context={'especialista_context':especialista_queryset, 'contrato_context': contrato_queryset, 'especialidad_context':especialidad_queryset}
    return render(request, 'especialistas.html/', context)
@csrf_exempt

def especialidad(request):
    especialidad_queryset = Especialidad.objects.all()
    
    context={'especialidad_context':especialidad_queryset}
    return render(request, 'especialidades.html/', context)
@csrf_exempt

def agregarEspecialista(request):
    nombre = request.POST.get("input-nombre")
    especialidad = request.POST.get("especialidad")
    especialidad_instance = Especialidad.objects.only('id').get(id=especialidad)
    
    contrato= request.POST.get("contrato")
    contrato_instance= Contrato.objects.only('id').get(id=contrato)
    sirh= request.POST.get("input-sirh")
    rut= request.POST.get("input-rut")
    telefono= request.POST.get("input-telefono")
    
    p = Especialista(nombre= nombre,
                     especialidad=especialidad_instance,
                     sirh=sirh,
                     rut=rut,
                     telefono=int(telefono),
                     contrato=contrato_instance)
    p.save()
    especialidad_instance = especialidad_instance.nombre
    contrato_instance = contrato_instance.nombre

    context = {}
    context['Especialidad'] = especialidad_instance
    context['Contrato'] = contrato_instance
    context['id'] = p.id
    context = json.dumps(context)
    return HttpResponse(context);

@csrf_exempt

def modificarEspecialista(request):
    nombre = request.POST.get("input-nombre")
    especialidad = request.POST.get("especialidad")
    especialidad_instance = Especialidad.objects.only('id').get(id=especialidad)

    contrato= request.POST.get("contrato")
    contrato_instance= Contrato.objects.only('id').get(id=contrato)
    sirh= request.POST.get("input-sirh")
    rut= request.POST.get("input-rut")
    telefono= request.POST.get("input-telefono")
    id = request.POST.get("id")
    
    modific= Especialista.objects.get(pk=id)
    modific.nombre = nombre
    modific.especialidad = especialidad_instance
    modific.contrato= contrato_instance
    modific.sirh = sirh
    modific.rut = rut
    modific.telefono = telefono
    modific.save()
    return HttpResponse(nombre)


@csrf_exempt

def eliminarEspecialista(request):
    id = int(request.POST.get("id"))
    s = Especialista.objects.get(id=id).delete()
    
    return HttpResponse()


@csrf_exempt


def agregarEspecialidad(request):
    nombre = request.POST.get("input-nombre")
    tasa_crecimiento = request.POST.get("input-tcrecimiento")
    ausentismo = request.POST.get("input-ausentismo")
    
    p= Especialidad(nombre=nombre,
                    tasa_crecimiento=tasa_crecimiento,
                    ausentismo=ausentismo).save()
    return HttpResponse()
    
    
@csrf_exempt

def modificarEspecialidad(request):
    nombre = request.POST.get("nombre")
    tasa_crecimiento = request.POST.get("tasa_crecimiento")
    ausentismo = request.POST.get("ausentismo")
    ID = request.POST.get("id")
    print(ID)
    
    p= Especialidad.objects.get(pk=ID)
    
    p.nombre = nombre
    p.tasa_crecimiento = tasa_crecimiento
    p.ausentismo = ausentismo
    p.save()
    return HttpResponse()
    
    
@csrf_exempt

def eliminarEspecialidad(request):
    id = int(request.POST.get("id"))
    s = Especialidad.objects.get(id=id).delete()
    
    return HttpResponse()

## Prueba github
##
@csrf_exempt

def precargar(request):
    #Recibe la fecha de semana 1
    semana1 = request.POST.get("semana1")
    semana1 = semana1.split(sep="T")
    semana1 = datetime.strptime(semana1[0], '%Y-%m-%d')
    
    semana1_numeric=semana1.weekday();
    id = request.POST.get("id")
    events = {}

    if semana1_numeric != 6:
        first_monday = semana1 - timedelta(semana1_numeric)
 
    else:
        first_monday = semana1 + timedelta(1)
        
    eventos = Agenda.objects.filter(especialista_id=id)
    i=0
    for evento in eventos:
        date_event = evento.start
        date_event=date_event.split(sep="T")
        date_event = datetime.strptime(date_event[0], '%Y-%m-%d')
        
        posicion_evento = first_monday + timedelta(date_event.weekday()) #Fecha original
        posicion_evento_ = str(posicion_evento).split(sep=" ")
        posicion_evento_ = posicion_evento_[0]
        #print("La fecha del evento es: "+str(date_event))
        #print("La fecha base del evento es: "+str(posicion_evento))
        if str(date_event) == str(posicion_evento):
            for u in range(1, 17): 
                semanaI= posicion_evento+timedelta(u*7)
                semanaI= str(semanaI).split(sep=" ")
                semanaI= semanaI[0]
                    
                    
                replaced_start = (evento.start).replace(str(posicion_evento_), semanaI)
                replaced_end = (evento.end).replace(str(posicion_evento_), semanaI)
                p= Agenda(title=evento.title,
                            especialista_id=evento.especialista_id,
                            start=replaced_start,
                            end=replaced_end)
                p.save()
                event = {}
                i=i+1
                event['title'] = evento.title
                event['start'] = replaced_start
                event['end'] = replaced_end
                events[i] = event
            
    events = json.dumps(events)           
        
    
    


    
    return HttpResponse(events)

# Create your views here.
