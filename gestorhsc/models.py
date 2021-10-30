from django.db import models

class Especialidad(models.Model):
    nombre= models.CharField(max_length=30)
    tasa_crecimiento= models.FloatField()
    ausentismo= models.FloatField()
    
    def __str__(self): # __unicode__ en Python 2
        return self.nombre
    
class MetasConsultas(models.Model):
    especialidad = models.ForeignKey(Especialidad, on_delete=models.CASCADE)
    nuevas = models.IntegerField()
    controles= models.IntegerField()
    total = models.IntegerField()
    def __str__(self):
        return self.especialidad

class MetasTotales(models.Model):
    totalNuevas = models.IntegerField()
    totalControles = models.IntegerField()
    totalTotal = models.IntegerField()
    def __str__(self):
         return self.totalTotal
     
class ConsultasCumplimiento(models.Model):
    name = models.CharField(max_length=15)
    ene= models.IntegerField()
    feb= models.IntegerField()
    mar=models.IntegerField()
    abr=models.IntegerField()
    may=models.IntegerField()
    jun=models.IntegerField()
    jul=models.IntegerField()
    ago=models.IntegerField()
    sep=models.IntegerField()
    oct=models.IntegerField()
    nov=models.IntegerField()
    dic=models.IntegerField()
    tot=models.IntegerField()
    def __str__(self):
        return self.name



class Contrato(models.Model):
    nombre=models.CharField(max_length=15)
    horas_contrato=models.FloatField()
    tipo_contrato= models.CharField(max_length=15)
    
    def __str__(self): # __unicode__ en Python 2
        return self.nombre
    
class Especialista(models.Model):
    nombre = models.CharField(max_length=30)
    especialidad = models.ForeignKey(Especialidad,  on_delete=models.CASCADE)
    sirh= models.IntegerField()
    rut = models.CharField(max_length=12)
    telefono = models.IntegerField()
    contrato= models.ForeignKey(Contrato,  on_delete=models.CASCADE)
    
    def __str__(self): # __unicode__ en Python 2
        return self.nombre
    

class Agenda(models.Model):
    especialista = models.ForeignKey(Especialista, on_delete=models.CASCADE)
    title = models.CharField(max_length=25)
    start = models.CharField(max_length=25)
    end = models.CharField(max_length=25)
    
    def __str__(self):
        return self.title

class EspecialidadnoGES(models.Model):
    nombre= models.CharField(max_length=30)
    tasa_crecimiento= models.FloatField()
    ausentismo= models.FloatField()
    
    def __str__(self): # __unicode__ en Python 2
        return self.nombre

class nogesMES(models.Model):
    nombre = models.CharField(max_length=30)
    especialidad = models.ForeignKey(EspecialidadnoGES,  on_delete=models.CASCADE) 
    ene= models.IntegerField()
    feb= models.IntegerField()
    mar=models.IntegerField()
    abr=models.IntegerField()
    may=models.IntegerField()
    jun=models.IntegerField()
    jul=models.IntegerField()
    ago=models.IntegerField()
    sep=models.IntegerField()
    oct=models.IntegerField()
    nov=models.IntegerField()
    dic=models.IntegerField()
    tot=models.IntegerField()
    def __str__(self):
        return self.nombre
    
    
    
    
    
# Create your models here.

