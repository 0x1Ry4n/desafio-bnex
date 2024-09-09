FROM python:3.12.4-slim

ARG DJANGO_SU_NAME
ARG DJANGO_SU_EMAIL
ARG DJANGO_SU_PASSWORD
ARG DJANGO_DB_NAME
ARG API_LOCAL_PORT

WORKDIR /api

COPY requirements.txt /api/
RUN pip install --no-cache-dir -r requirements.txt

COPY requirements-dev.txt /api/
RUN pip install --no-cache-dir -r requirements-dev.txt

ENV DJANGO_SETTINGS_MODULE=project.settings
ENV DJANGO_DB_NAME=${DJANGO_DB_NAME}
ENV DJANGO_SU_NAME=${DJANGO_SU_NAME}
ENV DJANGO_SU_EMAIL=${DJANGO_SU_EMAIL}
ENV DJANGO_SU_PASSWORD=${DJANGO_SU_PASSWORD}
ENV API_LOCAL_PORT=${API_LOCAL_PORT}

COPY . /api/

CMD ["sh", "-c", "python manage.py makemigrations && python manage.py migrate && python manage.py createsuperuser --noinput && python manage.py test && python manage.py runserver 0.0.0.0:${API_LOCAL_PORT}"]
