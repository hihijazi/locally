from app import app
from models import db, State, Place, Review

def seed_data():
    with app.app_context():
        db.drop_all()
        db.create_all()

        print("Seeding states...")
        states = [
            State(name="California"),
            State(name="New York"),
            State(name="Florida"),
            State(name="Texas"),
            State(name="Hawaii")
            # Add more states if needed
        ]

        db.session.add_all(states)
        db.session.commit()

        print("Seeding places...")
        places = [
            Place(name="Disneyland", description="A famous theme park in California.", state_id=1),
            Place(name="Yosemite National Park", description="A national park in California.", state_id=1),
            Place(name="Statue of Liberty", description="A famous landmark in New York.", state_id=2),
            Place(name="Central Park", description="A large public park in New York City.", state_id=2),
            Place(name="Walt Disney World", description="A famous theme park in Florida.", state_id=3),
            Place(name="South Beach", description="A popular beach in Miami, Florida.", state_id=3),
            Place(name="The Alamo", description="A historic site in San Antonio, Texas.", state_id=4),
            Place(name="Waikiki Beach", description="A famous beach in Honolulu, Hawaii.", state_id=5)
            # Add more places if needed
        ]

        db.session.add_all(places)
        db.session.commit()

        print("Seeding reviews...")
        reviews = [
            Review(rating=5, comment="Amazing place! Had a great time.", place_id=1),
            Review(rating=4, comment="Beautiful scenery and great hiking trails.", place_id=2),
            Review(rating=4, comment="A must-visit landmark.", place_id=3),
            Review(rating=5, comment="Perfect place for a relaxing day out.", place_id=4),
            Review(rating=5, comment="Kids loved it! So much fun.", place_id=5),
            Review(rating=4, comment="Great beach, but it can get crowded.", place_id=6),
            Review(rating=3, comment="Interesting historical site.", place_id=7),
            Review(rating=5, comment="Absolutely stunning beach!", place_id=8)
            # Add more reviews if needed
        ]

        db.session.add_all(reviews)
        db.session.commit()

        print("Seeding completed!")

if __name__ == '__main__':
    seed_data()
