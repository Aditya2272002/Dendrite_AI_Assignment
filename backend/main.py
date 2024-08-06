from flask import Flask, request, jsonify, redirect
from flask_cors import CORS
from graphene import ObjectType, Schema, Field, Int, String, List, Mutation, Boolean
from datetime import datetime
import stripe
import os
from dotenv import load_dotenv
load_dotenv()
from schemas.schema import Todo 
from mutations.mutations import TodoMutation, Query

stripe.api_key = os.getenv('STRIPE_API_KEY') or ''
YOUR_DOMAIN = os.getenv('BACKEND_DOMAIN') or 'http://localhost:5000'
price_id = os.getenv("PRICE_ID") or ''

app = Flask(__name__)
CORS(app)


schema = Schema(query=Query, mutation=TodoMutation)


@app.route('/')
def hello():
    return 'Welcome!'


@app.route('/create-checkout-session', methods=['POST'])
def create_checkout_session():
    try:
        checkout_session = stripe.checkout.Session.create(
            line_items=[
                {
                    'price': price_id,
                    'quantity': 1,
                },
            ],
            mode='payment',
            success_url=YOUR_DOMAIN + '?success=true',
            cancel_url=YOUR_DOMAIN + '?canceled=true',
        )
    except Exception as e:
        return str(e)

    return redirect(checkout_session.url, code=303)


@app.route('/graphql', methods=["POST"])
def graphql_server():
    data = request.get_json()
    query = data.get('query')
    # print(query)
    result = schema.execute(query)
    return jsonify(result.data)


if __name__ == '__main__':
    app.run(debug=True)
