To import users:
   `curl -X POST -H "Content-Type: application/json" -d '{"filePath": "./data/users.csv"}' http://localhost:3000/import`

To see imported users:
   `curl http://localhost:3000/users`