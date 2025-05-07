.PHONY: install
install:
	poetry install

.PHONY: start-app
start-app:
	poetry run python -m src.manage startapp $(name)

.PHONY: run-server
run-server:
	poetry run python -m src.manage runserver 8000

.PHONY: migrations
migrations:
	poetry run python -m src.manage makemigrations

.PHONY: migrate
migrate:
	poetry run python -m src.manage migrate

.PHONY: show-migrations
show-migrations:
	poetry run python -m src.manage showmigrations

.PHONY: super-user
super-user:
	poetry run python -m src.manage createsuperuser

.PHONY: install-pre-commit
install-pre-commit:
	poetry run pre-commit uninstall; poetry run pre-commit install

.PHONY: lint
lint:
	poetry run pre-commit run --all-files

.PHONY: flake8
flake8:
	poetry run flake8

.PHONY: up-dependencies-only
up-dependencies-only:
	test -f .env || touch .env
	docker-compose -f docker-compose.dev.yml up --force-recreate db

.PHONY: update
update:	install migrate

.PHONY: shell
shell:
	poetry run python -m src.manage shell;

# Reset migrations (Deletes migration files and re-runs them)
.PHONY: reset-migrations
reset-migrations:
	find src -path "*/migrations/*.py" ! -name "__init__.py" -delete
	poetry run python -m src.manage makemigrations
	poetry run python -m src.manage migrate --fake-initial

# Fake migrate to sync Django with DB without applying migrations
.PHONY: fake-migrate
fake-migrate:
	poetry run python -m src.manage migrate --fake

# Check if "options" column exists in DB
.PHONY: db-check
db-check:
	poetry run python -c "from django.db import connection; cursor = connection.cursor(); cursor.execute(\"SELECT column_name FROM information_schema.columns WHERE table_name = 'quiz_mcq'\"); print(cursor.fetchall())"
