1. Install all packages by running ```npm install```
2. Configure database and collections:
	- cd into /database and run ```node createDatabase.js```, and ```node createBuroCollections.js```
	- Check if database and collections have been successfully added by running: 
		* ```mongo``` in your shell
		* ```use buroDb```
		* ```show collections```. You should see four collections `accounts`, `profiles`, `schedules`, and `appointments` if added successfully. 

3. Run server:
	- cd into /server and run ```node buro.js```

4. Run React App:
	- Run ```npm start``` from main directory
