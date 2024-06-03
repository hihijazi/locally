from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)


class State(db.Model, SerializerMixin):
    __tablename__ = 'states'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

    # Relationship
    places = db.relationship('Place', back_populates='state', cascade='all, delete-orphan')

    # Serialization
    serialize_rules = ('-places.state',)

    def __repr__(self):
        return f'<State {self.id} - {self.name}>'


class Place(db.Model, SerializerMixin):
    __tablename__ = 'places'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
    state_id = db.Column(db.Integer, db.ForeignKey('states.id'), nullable=False)

    # Relationship
    state = db.relationship('State', back_populates='places')
    reviews = db.relationship('Review', back_populates='place', cascade='all, delete-orphan')

    # Serialization
    serialize_rules = ('-state.places', '-reviews.place')

    def __repr__(self):
        return f'<Place {self.id} - {self.name}>'


class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String)
    place_id = db.Column(db.Integer, db.ForeignKey('places.id'), nullable=False)

    # Relationship
    place = db.relationship('Place', back_populates='reviews')

    # Serialization
    serialize_rules = ('-place.reviews',)

    # Validation
    @validates('rating')
    def validate_rating(self, key, rating):
        if not (1 <= rating <= 5):
            raise ValueError('Rating must be between 1 and 5')
        return rating

    def __repr__(self):
        return f'<Review {self.id} - Rating: {self.rating}>'
