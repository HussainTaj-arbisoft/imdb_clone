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
