mongo xflix --eval "db.dropDatabase()"
mongoimport --host localhost --db xflix --collection videos --file data.json