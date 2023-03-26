from django.urls import path
from .views import *

urlpatterns = [

     path('',home,name='home'),
     path('save_student/',save_student,name='save_student'),
     path('delete_student/',delete_student,name='delete_student'),
     path('edit_student/',edit_student, name='edit_student')
]
