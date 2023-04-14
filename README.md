# GETTING STARTED

## Introduction
This is the repository containing the API serving the Fullcricle Flutter app.

## Prerequisites 
Make sure you have the following tools installed: 
1. npm & npx
`curl -qL https://www.npmjs.com/install.sh | sh && npm install -g npx`
2. Yarn
`npm install --global yarn`
3. VS Code Extension: Prisma Import
Id: ajmnz.prisma-import
Description: Adds import statements to your Prisma schemas
Version: 4.11.0
Publisher: Arnau Jiménez
VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=ajmnz.prisma-import
4. Postman: https://www.postman.com/downloads/
5. (PgAdmin) PostgreSQL database tool: https://www.pgadmin.org/download/ 
## To run this project run the following commands

1. Clone the repository
`git clone https://github.com/Graduation-Project-CIC/fullcircle-srv.git`
2.  Go to the root directory and run `yarn` to install all packages
3.  set up root project `.env` file with `DATABASE_URL` & `PORT` variables
4.  You're now ready to run the server using either `yarn develop` or `yarn start`

	* note: you have to install nodemon if you choose to run with `yarn develop` this is a tool that enables hot-reload on change, otherwise you would have to restart the server with each change.
5. You can test if the server is working by calling `http://localhost:[PORT]/health`

## How to contribute
1. to start developing endpoints you begin at the `src/database` directory where we will define the models for our usecases
2. navigate to `prisma-model` directory and create a new file for your model, filename should follow `PascalCase` naming convention followed by `.prisma` extension
3.  Create the necessary interface for the model you are developing
	- You can refer to this documentation while defining your model
	https://www.prisma.io/docs/concepts/components/prisma-schema/data-model
4. Open the command-line in the root directory of the project and run `yarn migrate` to apply changes to database
5. Refresh VS code so the `PrismaClient` can read the new models
6.  Navigate to the `database/repository` directory, This is where we will define all the functions relative to our use-cases with this data model, for example: get by ID, delete, update.
7. Create a new file for your model's repository, file should be named `[model-name]Repo.ts`
8. Navigate to `src/routes`. create a new directory for your model, create `index.ts file`, inside of which we will declare the endpoint structure for this model
9. Make sure to export the routes express object
10.  go to `index.ts` file at the root of the routes directory and add an import from the folder you created for your model
11. To expose your new endpoints, add the line add a line `router.use("/route", model);`
12. You can now start the server again and test
	* You should import the `FullCircle.postman_collection` file into postman and add your tests to it