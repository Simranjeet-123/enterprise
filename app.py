from flask import Flask, render_template,request,redirect,url_for # For flask implementation
from bson import ObjectId # For ObjectId to work
from pymongo import MongoClient
import os

app = Flask(__name__)
title = " Student Collection with Flask and MongoDB"
heading = "Get,put,post and delete in student collection"

client = MongoClient("mongodb://127.0.0.1:27017") #host uri
db = client.collegeDatabase    #Select the database
students = db.student #Select the collection name

def redirect_url():
    return request.args.get('next') or \
           request.referrer or \
           url_for('index')

@app.route("/list")
def lists ():
	#Display the all Tasks
	student_1 = students.find()
	a1="active"
	return render_template('index.html',a1=a1,students=student_1,t=title,h=heading)






@app.route("/insert", methods=['POST'])
def action ():
	#Adding a Task
	stu_id=request.values.get("student_id")
	stu_name=request.values.get("student_name")
	stu_phone=request.values.get("student_phone")
	stu_address=request.values.get("student_address")
	stu_email=request.values.get("student_email")
	cour_taken=request.values.get("courses_taken")

	students.insert({ "student_id":stu_id, "student_name":stu_name, "student_phone":stu_phone,"student_address":stu_address, "student_email":stu_email,"courses_taken":cour_taken})
	return redirect("/list")

@app.route("/remove")
def remove ():
	#Deleting a student with various references
	key=request.values.get("_id")
	students.remove({"_id":ObjectId(key)})
	return redirect("/list")

@app.route("/update")
def update ():
	id=request.values.get("_id")
	student_1=students.find({"_id":ObjectId(id)})
	return render_template('update.html',tasks=student_1,h=heading,t=title)

@app.route("/action3", methods=['POST'])  
def action3 ():
	stu_id=request.values.get("id")
	stu_name=request.values.get("name")
	stu_phone=request.values.get("phone")
	stu_address=request.values.get("address")
	stu_email=request.values.get("email")
	cour_taken=request.values.get("courses")
	id=request.values.get("_id")
	students.update({"_id":ObjectId(id)}, {'$set':{ "student_id":stu_id, "student_name":stu_name, "student_phone":stu_phone, "student_address":stu_address, "student_email":stu_email,"courses_taken":cour_taken }})  
	return redirect("/list")  


@app.route("/search", methods=['GET'])
def search():
	#Searching a Task with various references

	key=request.values.get("key")
	refer=request.values.get("refer")
	if(key=="_id"):
		student_l = students.find({refer:ObjectId(key)})
	else:
		student_l = students.find({refer:key})
	return render_template('searchlist.html',students=student_l,t=title,h=heading)

if __name__ == "__main__":

    app.run()