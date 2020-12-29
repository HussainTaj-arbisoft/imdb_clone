FROM nikolaik/python-nodejs:python3.8-nodejs14
ENV PYTHONUNBUFFERED=1

WORKDIR /code

# Install python dependencies
COPY ./requirements.txt /code/requirements.txt
RUN pip install -r requirements.txt

# Install node dependencies 
COPY ./package.json /code/package.json
RUN npm install

COPY . /code/

# Build React Source
RUN npm run build

# Apply Migrations / Create DB
RUN python manage.py migrate
# Add dummy data
RUN python manage.py seed_db

# Run development server on startup
CMD python manage.py runserver_plus 0.0.0.0:8000 --cert-file /tmp/cert.crt
