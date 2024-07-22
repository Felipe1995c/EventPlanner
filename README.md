# U-Plan-It

U-Plan-It is a user-friendly application that allows anyone, from a first-time host to a seasoned party planner, to effortlessly organize a perfect event. With U-Plan-It, you can name your event, set the date, and choose the perfect location. But that’s not all! U-Plan-It also enables you to create and monitor a detailed budget, breaking down costs for food, rentals, supplies, and entertainment. Our intuitive dashboard ensures that you see the big picture at a glance, keeping track of all your upcoming events and their details!

## Installation

To install U-Plan-It:

- Clone the repository: https://github.com/Felipe1995c/U-Plan-it

- Navigate to the project directory

- Open the terminal and install the dependencies by running the command: `npm install`

- Set up the PostgreSQL database:

  - Enter `psql -U postgres` to open the PostgreSQL command line interface. If prompted, input your password.
  - To set up the database, type `\i schema.sql` and press Enter.
  Now your database is ready to use!

- Remove '.EXAMPLE' from the .env.EXAMPLE file renaming it to .env

- Configure that .env file with your database credentials

- Seed data to your database. In the terminal run the command: `npm run seed`

## Usage

- Start the application, in the terminal run the command: `npm start`

## Technologies Used

1. Node.js for the server-side runtime environment.
2. Express.js for the web application framework.
3. Handlebars.js for dynamic content rendering.
4. PostgreSQL for the relational database.
5. Sequelize for ORM (Object-Relational Mapping).
6. Bootstrap for responsive form models and styling.
7. Chart.js for visualizing budget data with interactive charts.
8. CSS for the structure and styling of the application.
9. JavaScript for interactive elements and client-side logic.

## Credits

This project was made possible with the help of:

[Felipe Cordero](https://github.com/Felipe1995c)

[Nikko Jacinto](https://github.com/ImNeeeks)

[Irvin Lu](https://github.com/scurvyirv)

[Kaila Ronquillo](https://github.com/girlnotfound)

[Alex Tran](https://github.com/alextran1985)