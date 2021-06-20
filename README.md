# Products Catalog

First, the project has to be started. Then, it has to be initialized with data. 


## 1) Getting the project started

There are two ways to start the project 

### 1.1) Using docker

cd into the project root (where docker-compose.yml is)

```bash
run `docker-compose build`
```

then,

### `docker-compose up`

This will start the Django backend and react frontend and link them together

### 1.2) Using virtual environment

### create a virtual environment

### `py -m venv env`


### activate the environment

### `source env/Scripts/activate`


### cd into `projectroot/backend` and run:

### `pip install -r requirements.txt`


### cd into `projectroot/backend/api-site` and run:

### `python manage.py makemigrations`
### `python manage.py migrate`
### `python manage.py runserver`

### From another terminal, cd into `projectroot/frontend` and run:

### `npm install`
### `npm start`

By now both Django backend and Reactjs frontend will have started.

# 2) Initializing the project with data

To properly browse the project, you first need to create some products from the admin panel.

### cd into `projectroot/backend/api-site` and run:

### `python manage.py createsuperuser`

### After creating the user, navigate to `http://127.0.0.1:8000/admin` and login using the created superuser

### Add product objects from the admin panel as you see fit. You can also create more users


## Done! You can now navigate to `http://127.0.0.1:3000` and check the project
