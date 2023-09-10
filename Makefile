dcup:
	docker compose up -d && ${MAKE} dclogs
dcstop:
	docker compose stop
dclogs:
	docker compose logs -f
dcbash:
	docker compose exec -it ui bash
dcrm:
	docker compose rm -f -s ui
dprune:
	docker system prune -a -f
