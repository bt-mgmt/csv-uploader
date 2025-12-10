To import users:
   `curl -X POST -H "Content-Type: application/json" -d '{"filePath": "./data/users.csv"}' http://localhost:3000/import`

To see imported users:
   `curl http://localhost:3000/users`

Powershell:

To import users:
   `Invoke-RestMethod -Method Post -Uri "http://localhost:3000/import" -ContentType "application/json" -Body '{"filePath": "./data/users.csv"}'`

To see imported users:
   `Invoke-RestMethod -Uri "http://localhost:3000/users"`