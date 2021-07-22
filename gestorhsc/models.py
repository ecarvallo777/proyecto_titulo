from django.db import models

class Especialidad(models.Model):
    nombre= models.CharField(max_length=30)
    tasa_crecimiento= models.FloatField()
    ausentismo= models.FloatField()
    
    def __str__(self): # __unicode__ en Python 2
        return self.nombre
    
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
        return self.id
# Create your models here.

