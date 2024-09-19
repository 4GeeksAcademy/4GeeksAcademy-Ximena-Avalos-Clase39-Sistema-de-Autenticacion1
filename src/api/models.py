from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(120), nullable=False)  # Agregado campo de nombre
    last_name = db.Column(db.String(120), nullable=False)   # Agregado campo de apellidos
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "first_name": self.first_name,  # Agregado al serializador
            "last_name": self.last_name,    # Agregado al serializador
            "email": self.email,
            # do not serialize the password, its a security breach
        }