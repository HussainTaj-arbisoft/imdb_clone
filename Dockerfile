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

# Copy startup scripts
COPY ./web_entrypoint.sh /code/web_entrypoint.sh
RUN chmod +x ./web_entrypoint.sh
COPY ./wait-for-it.sh /code/wait-for-it.sh
RUN chmod +x ./wait-for-it.sh
