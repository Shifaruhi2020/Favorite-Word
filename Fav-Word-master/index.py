# from distutils.command.config import config
# from email import message
# from http import client
# import imp
from ast import And, Or
from cmath import e
from genericpath import exists


from sqlalchemy import ForeignKey,UniqueConstraint, null
from flask import Flask,request,jsonify
from flask_sqlalchemy import SQLAlchemy 
from flask_cors import CORS,cross_origin
from sqlalchemy import true
import werkzeug
from werkzeug.security import generate_password_hash, check_password_hash
# import smtplib
# from flask_mail import Mail, Message
# from email.mime.text import MIMEText
from sqlalchemy.exc import IntegrityError
# from werkzeug import TypeError
# from werkzeug.debug import TypeError

# import sendgrid
# import os
# from sendgrid.helpers.mail import *
# import mailchimp_transactional as MailchimpTransactional
# from mailchimp_transactional.api_client import ApiClientError





app = Flask(__name__)
# mail = Mail(app)
cors = CORS(app)
app.config['SECRET_KEY'] = '!9m@S-dThyIlW[pHQbN^'
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///word.db'
# app.config['MAil_SERVER'] = 'samyu.2k1@gmail.com'
# app.config['MAIL_PORT'] = 465
# app.config['MAIL_USE_SSL'] = true
# app.config.from_pyfile('config.cfg')






db = SQLAlchemy(app)

class User(db.Model):

    _tablename_ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    name= db.Column(db.String(15))
    username = db.Column(db.String(30))
    email = db.Column(db.String(50), unique=True)
    password = db.Column(db.String(256), unique=True)
    

    def __init__(self,name,username,email,password):
        self.name = name
        self.username=username
        self.email=email
        self.password=password


    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "username":self.username,
            "email":self.email
            }


class Word(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        sentence= db.Column(db.String(100),unique=True)

        def __init__(self,sentence):
            self.sentence=sentence

        def serialize(self):
            return{
                "id":self.id,
                "sentence":self.sentence
            }

# import mailchimp_transactional as MailchimpTransactional
# from mailchimp_transactional.api_client import ApiClientError


class Order(db.Model):
    _tablename_="order"
    id=db.Column(db.Integer,primary_key=True)
    user_id=db.Column(db.Integer,ForeignKey('user.id'))
    word_id=db.Column(db.Integer,ForeignKey('word.id')) 
    word=db.Column(db.String(100))
    db.UniqueConstraint(user_id,word_id)

    # def __init__(self,sentence,user_id,word_id):
    #     self.sentence = sentence
    #     # self.email = email
    #     self.user_id = user_id
    #     self.word_id =  word_id

    def serialize(self):
        return{
            "id":self.id,
            "sentence":self.word,
            "user_id":self.user_id,
            "word_id":self.word_id
        }

 

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"
# def mail():
#      msg = message("hello", sender="chsanavi@gmail.com", recipients=["chsanavi@gmail.com"])
#      mail.send(msg)
#      return "message sent!"

@app.route('/register', methods = ['POST'])
@cross_origin()
def register():

    if request.method == 'POST' :
        hashed_password = generate_password_hash(request.json['password'], method='sha256')
        new_user = User(
            name = request.json['name'], 
            username = request.json['username'] ,
            email = request.json['email'] ,
            password = hashed_password )
            # message = request.json['you have subscribed my email'],
            # server = smtplib.SMTP("smtp.gmail.com", 587)
            # server.starttls()
            # server.login("chsanavi@mail.com")
            # server.sendmail({"email"})

        try:
            db.session.add(new_user)
            db.session.commit()
            return jsonify({'user': new_user.serialize()}), 201
        except:
             return jsonify({"status": 400,
                        "message": "Failure to add user details.This may occur due to duplicate entry of userdetails"})


@app.route('/login', methods = ['POST'])
@cross_origin()
def login():
    if request.method == 'POST' :
        
        user = User.query.filter_by(email = request.json['email']).first()
        if user:
             
            if check_password_hash(user.password, request.json['password']):
               
               
                return jsonify({'user': user.serialize(),'message':"login Successful"}), 200
            else:
                return jsonify({"message": "user password wrong", "status": 400}),400
        else:
            return jsonify({"message": "user details doesnt exist", "status": 400}),400


@app.route("/word",methods=['POST','GET'])
def word():
    if(request.method=='GET'):
        return jsonify({'Word': list(map(lambda word: word.serialize(), Word.query.all()))})

    else:
        sentence=request.json['sentence']
        order=Word(sentence)
        db.session.add(order)
        db.session.commit()
        return jsonify({"status": 200, "message": "updated"})


@app.route("/srch/<string:word>",methods=['GET'])
def srch(word):
    return jsonify({'Word': list(map(lambda word: word.serialize(), Word.query.filter(Word.sentence.contains(word))))})


@app.route("/subs",methods=["POST","GET"])
def subs():
    if(request.method=="GET"):
         return jsonify({'Order': list(map(lambda word: word.serialize(), Order.query.all()))})


    else:   
        sentence=request.json['sentence']
        email=request.json['email']
        uid=request.json['user_id']
        wd=request.json['word_id']  
        subs=Order(sentence=sentence, email=email, user_id=uid, word_id=wd)
        db.session.add(subs)
        db.session.commit()
        return jsonify({"status": 200, "message": "updated"})


# @app.route('/subscribe',methods=['POST'])
# @cross_origin()
# def addsubscribe():
#     user_id=request.json['user_id']
#     word_id=request.json['word_id']
#     # word=request.json['word']
    
   
#     user_db=User.query.get(user_id)
#     if user_db is None:
#         return jsonify({"status":404,"message":"user not found, send a valid user_id"}),400

#     word_db=Word.query.get(word_id)
#     if word_db is None:
#         return jsonify({"status":404,"message":"word not found, send a valid word_id"}),404
    
#     word=word_db.sentence
#     subscribe=Order(user_id=user_id,word_id=word_id,word=word)
#     try:
#         db.session.add(subscribe)
#         db.session.commit()
#     except IntegrityError as ie:
#         print(ie)
#         return jsonify({"status":400,"message":"already subscribed"}),400
#     return jsonify({"status":200,"message":"subscribed successfully"}),200


@app.route('/subscribe',methods=['POST','DELETE'])
@cross_origin()
def add_and_delete_subscribe():
    
    if(request.method=="DELETE"):
        # id=request.json['sub_id']
        id=request.args
        print(id)
        # response = {}
        unscubscribe= Order.query.get(id)
        if unscubscribe is None:
            return jsonify({"status":404,"message":"already unsubscribed"}),404
        # response['id'] = todo.id sets the response id to the todo.id
        # response['id'] = unscubscribe.id
        print(unscubscribe)
        db.session.delete(unscubscribe)
        # db.session.delete(todo) calls SQL DELETE statement onto the database and deletes the todo that matches the same ID
        db.session.commit()
        return jsonify({"status":200,"message":"unsubscribed successfully"}),200

    else:
        user_id=request.json['user_id']
        word_id=request.json['word_id']
        user_db=User.query.get(user_id)
        if user_db is None:
            return jsonify({"status":404,"message":"user not found, send a valid user_id"}),404

        word_db=Word.query.get(word_id)
        if word_db is None:
            return jsonify({"status":404,"message":"word not found, send a valid word_id"}),404

        word=word_db.sentence
        subscribe=Order(user_id=user_id,word_id=word_id,word=word)
        try:
            db.session.add(subscribe)
            db.session.commit()
        except IntegrityError as ie:
            print(ie)
            return jsonify({"status":200,"message":"already subscribed"}),200
        return jsonify({"status":200,"message":"subscribed successfully"}),200


@app.route('/subscribe/<int:user_id>',methods=['GET'])
@cross_origin()
def getsubscribe(user_id):
 return jsonify({'Order': list(map(lambda order: order.serialize(), Order.query.filter(Order.user_id==user_id)))})


# page number and no.of rows per page--pagination
# no.of rows per page is taken as a glabal variable
# rows_per_page=2
@app.route('/subscribe/paginate/<int:page_num>/<int:page_size>/<int:user_id>',methods=['GET'])
@cross_origin()
def getsubscribewithpagination(page_num,page_size,user_id):
    paginateoObj=Order.query.filter(Order.user_id==user_id).order_by(Order.id).paginate(page_num,page_size)
    # .pages gives the total pages after pagination
    total_pages=paginateoObj.pages
    orderItemsforPagination=paginateoObj.items
    #  return jsonify({'Order': list(map(lambda order: order.serialize(), Order.query.filter(Order.user_id==user_id).order_by(Order.id).paginate(page_num,page_size).items))})
    jsonResult={'subscriptions_per_page':list(map(lambda order:order.serialize(),orderItemsforPagination))}
    jsonResult['total_pages']=total_pages
    return jsonify(jsonResult),200


@app.route('/subscribe/paginate',methods=['GET'])
@cross_origin()
def getsubscribewithpagination_with_query_params():
    user_id=int(request.args.get('user_id',None))
    page_num=int(request.args.get('page_num',1))
    page_size=int(request.args.get('page_size',1))
    print(page_num,page_size,user_id)
    check=User.query.get(user_id)
    if check is None:
        return jsonify({"status":400,"message":"User not present,SIGN UP first"}),400
    if user_id:
        if page_size==0 or page_num==0:
            return jsonify({"status":400,"message":"wrong arguments"}),400
        else:
            paginateoObj=Order.query.filter(Order.user_id==user_id).order_by(Order.id).paginate(page_num,page_size)
            # .pages gives the total pages after pagination
            total_pages=paginateoObj.pages
            orderItemsforPagination=paginateoObj.items
            res=len(orderItemsforPagination)
            print (res)
            if res:
                 #  return jsonify({'Order': list(map(lambda order: order.serialize(), Order.query.filter(Order.user_id==user_id).order_by(Order.id).paginate(page_num,page_size).items))})
                jsonResult={'subscriptions_per_page':list(map(lambda order:order.serialize(),orderItemsforPagination))}
                jsonResult['total_pages']=total_pages
                return jsonify(jsonResult),200
            else:
                return ("page is emtpy"),404
             
                    
   

  

# previous pagination code
@app.route('/subscribe/paginate/<int:page_num>/<int:page_size>/<int:user_id>',methods=['GET'])
@cross_origin()
def getsubscribewithpagination1(page_num,page_size,user_id):
     return jsonify({'Order': list(map(lambda order: order.serialize(), Order.query.filter(Order.user_id==user_id).order_by(Order.id).paginate(page_num,page_size).items))})
 

@app.route("/unsubscribe/<int:id>", methods=["DELETE"])
def subscription_delete(id):
    # response = {} setting a variable named response to an empty dictionary to take in full todos.
    response = {}
    unscubscribe= Order.query.get(id)
    # response['id'] = todo.id sets the response id to the todo.id
    response['id'] = unscubscribe.id
    print(unscubscribe)
    db.session.delete(unscubscribe)
    # db.session.delete(todo) calls SQL DELETE statement onto the database and deletes the todo that matches the same ID
    db.session.commit()

    return jsonify({"status":200,"message":"unsubscribed successfully"}),200



if __name__=="__main__":
    db.create_all()
    app.run(debug=True, port=8000)
    

