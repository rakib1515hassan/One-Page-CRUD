from django.shortcuts import render, redirect
from .models import *
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


def home(request):
    student = Student.objects.all()

    context = {
        "student": student
    }
    return render(request, 'home.html', context)

@csrf_exempt
def save_student(request):
    if request.method == "POST":
        sid = request.POST.get("stuid")
        # print("Student ID: ", sid)
        name = request.POST.get("name")
        # print("Student Name: ", name)
        email = request.POST.get("email")
        major = request.POST.get("major")

        if sid == "":
            student = Student(name=name, email=email, major=major)
        else:
            student = Student(id=sid, name=name, email=email, major=major)
        student.save()

        student_val = Student.objects.values()
        student_data = list(student_val)

        return JsonResponse({"status": "Saved", "student_data": student_data})
    else:
        return JsonResponse({"status": "Not Saved"})

@csrf_exempt
def delete_student(request):
    if request.method == "POST":
        id = request.POST.get("prod_id")
        student = Student.objects.get(pk=id)
        student.delete()

        student_val = Student.objects.values()
        student_data = list(student_val)
        return JsonResponse({"status": 1, "student_data": student_data})
    else:
        return JsonResponse({"status": 0})


@csrf_exempt
def edit_student(request):
    if request.method == "POST":
        id = request.POST.get("sid")
        student = Student.objects.get(pk=id)

        student_data = {"id": student.id, "name": student.name, "email":student.email, "major":student.major}

        return JsonResponse(student_data)
