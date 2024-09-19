"""empty message

Revision ID: 9aff5746c068
Revises: 2f77ee6d541d
Create Date: 2024-09-19 19:50:28.089374

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9aff5746c068'
down_revision = '2f77ee6d541d'
branch_labels = None
depends_on = None


def upgrade():
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('first_name', sa.String(length=120), nullable=False, server_default="Unknown"))
        batch_op.add_column(sa.Column('last_name', sa.String(length=120), nullable=False, server_default="Unknown"))

def downgrade():
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_column('first_name')
        batch_op.drop_column('last_name')

    # ### end Alembic commands ###
