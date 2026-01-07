
FROM python:3.9


WORKDIR /code


COPY ./pyproject.toml /code/pyproject.toml


RUN poetry install --no-cache-dir --upgrade -r /code/pyproject.toml


COPY . /code/app


CMD ["poetry", "run", "fastapi", "run", "app/main.py", "--port", "3000"]
