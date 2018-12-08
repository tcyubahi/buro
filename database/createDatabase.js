var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/buroDb";

MongoClient.connect(url, function(err, db) {
	if (err) {
		throw err;
	}

	console.log("\n\nDatabase for Buro App successfully created\n\n");
	db.close();
}) 