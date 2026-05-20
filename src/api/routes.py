"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from sqlalchemy import select

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route("/signup", methods=["POST"])
def user_signup():

    body = request.json
    if not body.get("email") or not body.get("password"):
        return jsonify({"msg": "Email and password required"}), 400
    
    user = User(
        email=body.get("email"),
        password=body.get("password"),
        is_active = True)
    db.session.add(user)
    db.session.commit()
    return jsonify(user.serialize()), 201


@api.route('/login', methods=['POST'])
def user_login():

    body = request.json
    email = body.get("email")
    password = body.get("password")

    statement = select(User).where(User.email == email)
    user = db.session.execute(statement).scalar_one_or_none()

    if user is None or user.password != password:
        return jsonify({"msg": "Bad email or password"}), 401
    
    access_token = create_access_token(identity=str(user.id))
    return jsonify({
        "msg": "Login success",
        "token": access_token,
        "user": user.serialize()
        }), 200


@api.route('/users', methods=['GET'])
def handle_hello():
    users = User.query.all()
    all_users = [user.serialize() for user in users]
    return jsonify(all_users), 200


@api.route('/private', methods=['GET'])
@jwt_required()
def private_route():
    current_user_id = get_jwt_identity()
    user = db.session.get(User, int(current_user_id))
 
    if user is None:
        return jsonify({"msg": "User not found"}), 404
 
    return jsonify({
        "msg": "Access granted",
        "user": user.serialize()
    }), 200