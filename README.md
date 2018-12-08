1. Install all packages by running ```npm install```
2. Configure database and collections:
	a) cd into /database and run ```node createDatabase.js```, and ```node createBuroCollections.js```
	b) Check if database and collections have been successfully added by running: 
		i) ```mongo``` in your shell
		ii) ```use buroDb```
		iii) ```show collections```. You should see four collections `accounts`, `profiles`, `schedules`, and `appointments` if added successfully. 

3. Run server:
	a) cd into /server and run ```node buro.js```

4. Run React App:
	a) Run ```npm start``` from main directory
