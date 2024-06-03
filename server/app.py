from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests from frontend
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tourism.db'  # Use your preferred database
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class State(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    places = db.relationship('Place', backref='state', lazy=True)

class Place(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(200), nullable=True)
    state_id = db.Column(db.Integer, db.ForeignKey('state.id'), nullable=False)

@app.route('/states', methods=['GET'])
def get_states():
    states = State.query.all()
    return jsonify([{'id': state.id, 'name': state.name} for state in states])

@app.route('/states/<int:state_id>/places', methods=['GET'])
def get_places(state_id):
    places = Place.query.filter_by(state_id=state_id).all()
    return jsonify([{'id': place.id, 'name': place.name, 'description': place.description} for place in places])

@app.route('/places/<int:place_id>', methods=['GET'])
def get_place_details(place_id):
    place = Place.query.get_or_404(place_id)
    return jsonify({'id': place.id, 'name': place.name, 'description': place.description, 'state_id': place.state_id})

if __name__ == '__main__':
    with app.app_context():
        db.create_all()

        if not State.query.first():
            print("Seeding database...")
            states = [
                State(name="California"),
                State(name="New York"),
                State(name="Florida"),
                # Add more states
            ]

            db.session.add_all(states)
            db.session.commit()

            places = [
                Place(name="Disneyland", description="A famous theme park in California.", state_id=1),
                Place(name="Yosemite National Park", description="A national park in California.", state_id=1),
                Place(name="Statue of Liberty", description="A famous landmark in New York.", state_id=2),
                # Add more places
            ]

            db.session.add_all(places)
            db.session.commit()

            print("Database seeded!")

    app.run(debug=True)
