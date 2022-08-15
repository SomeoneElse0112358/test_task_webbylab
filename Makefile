# Local

build:
	npm install
	npm start

# Docker

up:
	docker-compose up --build --detach

down:
	docker-compose down

logs:
	docker logs test_task -f