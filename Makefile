start:
	node ./back/server.js &
	npm start --prefix ./front
	