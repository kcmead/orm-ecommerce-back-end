# E-commerce Back End

## Overview
This project involves building the back end for an e-commerce site. The application utilizes Express.js API and Sequelize to interact with a MySQL database. The primary goal is to create a functional back end that allows for managing categories, products, and tags, providing a foundation for an e-commerce website.

## Project Highlights
  - Seamless integration of Sequelize with Express.js API.
  - Configuration of database connection using environment variables.
  - Initialization of a development database with test data through schema and seed commands.
  - Synchronization of Sequelize models with the MySQL database upon application launch.
  - Implementation of API routes for retrieving data in JSON format using GET requests.
  - Testing and validation of API functionality for creating, updating, and deleting data using POST, PUT, and DELETE requests.

## Installation

To run the application locally, follow these steps:

1. Clone the repository to your local machine:

    `git clone https://github.com/kcmead/orm-ecommerce-back-end.git`

2. Navigate to the project directory:

    `cd e-commerce-back-end`

3. Install dependencies:

    `npm install`

4. Set up your MySQL database by adding your database name, MySQL username, and MySQL password (if you choose to have one) to the environment variable file (`.env`)

5. Create the database and seed it with test data.

    `npm run seed`

6. Start the server:

    `npm start`

7. Test the API routes using a tool like Insomnia.

## Author

  - KC Mead

## Acknowledgements

  - special thanks to the instructors, TA's and tutors who helped me throughout this course