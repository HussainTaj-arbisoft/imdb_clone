migrate:
	docker-compose exec web python manage.py migrate

seed_db:
	docker-compose exec web python manage.py seed_db
