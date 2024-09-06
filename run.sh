#!/bin/bash

PID=$(lsof -t -i:3001)
# Check if a PID was found
if [ -z "$PID" ]; then
  echo "No process is running on port 3001."
else
  # Kill the process using the found PID
  kill -9 $PID
  echo "Killed process running on port 3001 (PID: $PID)."
fi


npx prisma generate --schema=./back/prisma/schema.prisma
npx prisma migrate dev --name init --schema=./src/prisma/schema.prisma

npm install --prefix ./infinit_front & npm install --prefix ./back
node ./back/server.js & npm run dev --prefix ./infinit_front