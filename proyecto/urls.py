"""proyecto URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from gestorhsc.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('inicio/', inicio),
    path('agenda/', calendario),
    path('consultas/', consultas),
    path('noges/', noges),
    path('calendar/', calendars),
    path('especialista/', especialista),
    path('especialidades/', especialidad),
    path('agregarEspecialista/', agregarEspecialista),
    path('agregarEspecialidad/', agregarEspecialidad),
    path('addevent/', addEvent),
    path('updevent/', updEvent),
    path('delevent/', delEvent),
    path('post/', post),
    path('post_consultas/', postconsultas),
    path('get_dashboard/', getdash),
    path('get_eventos/', get_eventos),
    path('modificarEspecialista/', modificarEspecialista),
    path('eliminarEspecialista/', eliminarEspecialista),
    
    path('modificarEspecialidad/', modificarEspecialidad),
    path('eliminarEspecialidad/', eliminarEspecialidad),
    
    path('get_especialistas/', get_especialistas),
    path('post_ausentismo/', post_ausentismo),
    path('get_ausentismo/', get_ausentismo),
    
    path('post_a/', post_altas),
    path('get_programacion/', get_programacion),
    
    path('precargar/', precargar),
    path('post_noges/', post_noges),
    
    path('post_horas/', post_horas),

]
