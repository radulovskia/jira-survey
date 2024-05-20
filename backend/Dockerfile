FROM python:3.11 AS development
RUN pip install poetry==1.7.1
ENV POETRY_NO_INTERACTION=1 \
    POETRY_VIRTUALENVS_IN_PROJECT=1 \
    POETRY_VIRTUALENVS_CREATE=1 \
    POETRY_CACHE_DIR=/tmp/poetry_cache

WORKDIR /workspace/backend
COPY ./pyproject.toml ./poetry.lock ./
RUN poetry install --no-root
# RUN --mount=type=cache,target=$POETRY_CACHE_DIR poetry install --no-root

FROM python:3.11 AS production
ENV VIRTUAL_ENV=/workspace/backend/.venv \
    PATH="/workspace/backend/.venv/bin:$PATH"

WORKDIR /workspace/backend
COPY --from=development ${VIRTUAL_ENV} ${VIRTUAL_ENV}
COPY main.py main.py
EXPOSE 8000
CMD [ "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000" ]