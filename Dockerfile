FROM python:3.8
ENV PYTHONUNBUFFERED=1

WORKDIR /code

# Install python dependencies
COPY ./requirements.txt /code/requirements.txt
RUN pip install -r requirements.txt

# Copy backend code
COPY ./backend/ /code/backend/
COPY ./manage.py /code/manage.py
COPY ./media/ /code/media/

# Apply Migrations / Create DB
RUN python manage.py migrate
# Add dummy data
RUN python manage.py seed_db

# Run development server on startup
CMD python manage.py runserver_plus 0.0.0.0:8000 --cert-file /tmp/cert.crt
