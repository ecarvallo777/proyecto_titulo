from django.http.response import HttpResponse
from django.shortcuts import render
from gestorhsc.models import Especialista, Contrato, Especialidad, Agenda
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse
def calendars(request):
    return render(request, 'calendars.html' )
def inicio(request):
    prueba = 'hola esteban'

    return render(request, 'inicio.html', {'prueba':prueba})

def calendario(request):

    especialidad_queryset = Especialidad.objects.all()
    especialistas_queryset = Especialista.objects.all()
    agenda_queryset= Agenda.objects.all()

    context={'especialidad_context':especialidad_queryset, 'especialistas_context':especialistas_queryset, 'agenda_context':agenda_queryset}
    
    print(especialidad_queryset)
    
    return render(request, 'agenda.html', context)

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
def updEvent(request):
    id_event = request.POST.get("id")
    start = request.POST.get("start")
    end = request.POST.get("end")

    t = Agenda.objects.get(id=int(id_event))
    t.start = start
    t.end = end
    t.save()
    return HttpResponse(id_event)

def delEvent(request):
    id_event = int(request.POST.get("id"))
    print(id_event)
    print(type(id_event))
    s = Agenda.objects.get(id=id_event).delete()

    return HttpResponse(id_event)



def especialista(request):
    especialista_queryset = Especialista.objects.all()
    contrato_queryset = Contrato.objects.all()
    especialidad_queryset = Especialidad.objects.all()
    
    context={'especialista_context':especialista_queryset, 'contrato_context': contrato_queryset, 'especialidad_context':especialidad_queryset}
    return render(request, 'especialistas.html/', context)

def especialidad(request):
    especialidad_queryset = Especialidad.objects.all()
    
    context={'especialidad_context':especialidad_queryset}
    return render(request, 'especialidades.html/', context)

def agregarEspecialista(request):
    nombre = request.GET["input-nombre"]
    especialidad = request.GET["especialidad"]
    especialidad_instance = Especialidad.objects.only('id').get(id=especialidad)

    contrato= request.GET["contrato"]
    contrato_instance= Contrato.objects.only('id').get(id=contrato)
    sirh= request.GET["input-sirh"]
    rut= request.GET["input-rut"]
    telefono= request.GET["input-telefono"]
    
    p = Especialista(nombre= nombre,
                     especialidad=especialidad_instance,
                     sirh=sirh,
                     rut=rut,
                     telefono=int(telefono),
                     contrato=contrato_instance)
    p.save()
    
    return render(request, 'especialistas.html')
@csrf_exempt 


def agregarEspecialidad(request):
    nombre = request.GET["input-nombre"]
    tasa_crecimiento = request.GET["input-tcrecimiento"]
    ausentismo = request.GET["input-ausentismo"]
    
    p= Especialidad(nombre=nombre,
                    tasa_crecimiento=tasa_crecimiento,
                    ausentismo=ausentismo).save()
    return render(request, 'especialidades.html')
    







# Create your views here.
