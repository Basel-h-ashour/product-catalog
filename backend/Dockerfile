FROM python:3.7-alpine
LABEL maintainer="Basel H. Ashour"

ENV PYTHONUNBUFFERED 1

COPY ./requirements.txt /requirements.txt
RUN apk add --update --no-cache jpeg-dev
RUN apk add --update --no-cache --virtual .temp-deps \
    gcc musl-dev zlib zlib-dev
RUN pip install -r /requirements.txt
RUN apk del .temp-deps

RUN mkdir /api-site
WORKDIR /api-site
COPY ./api-site /api-site

RUN mkdir -p /vol/web/media
RUN mkdir -p /vol/web/static

RUN adduser -D user
RUN chown -R user:user /vol/
RUN chmod -R 755 /vol/web
USER user