require('dotenv').config();
const express = require("express");
const morgan = require("morgan");
const app = express();

// Morgan is primarily used for logging.
app.use(morgan("dev"));

// Express.json() is a built in function in Express.js that handles getting JSON data that the client sends in a POST request.
app.use(express.json());




// Get all Restaurants: 
app.get("/api/v1/restaurants", (req, res) => { 
    console.log("Route handler called successfully!");

    /* Need to connect to PostgreSQL Database to run SELECT * FROM restaurants table Query using some ORM */


    /* Send  response Status of 200 successful, and return the data in the response body */
    res.status(200).json({
        status  :   "success", 
        data    :   {
            restaurant  :   [ "McDonalds", "Wendys", "Waffle House", "White Castle" ]
        },
    });
});


// Get a Restaurant: 
app.get("/api/v1/restaurants/:id", (req, res) => {

    /* Need to connect to PostgreSQL Database to run SELECT * FROM restaurants WHERE id=id table Query using some ORM */
    console.log(req.params.id)


    /* Send  response Status of 200 successful, and return the data in the response body */
    res.status(200).json({
        status  :   "success",
        data    :   {
            restaurant : "White Castle"
        }
    });
});

// Create a Restaurant:
app.post("/api/v1/restaurants", (req, res) => {

    /* Need to connect to PostgreSQL Database to run INSERT INTO restaurants VALUES = ('name=name', 'location=location', 'prince_range=price_range') Query using some ORM */

    
    /* Send  response Status of 201 successful, and return the data in the response body */
    res.status(201).json({
        status  :   "success",
        data    :   {
            restaurant : "White Castle"
        }
    });
});

// Update Restaurant:
app.put("/api/v1/restaurants/:id", (req, res) => {
    
    /* Need to connect to PostgreSQL Database to UPDATE tables */

    
    /* Send  response Status of 201 successful, and return the data in the response body */
    res.status(200).json({
        status  :   "success",
        data    :   {
            restaurant : "White Castle"
        }
    });
});


// Delete Restaurant:
app.delete("/api/v1/restaurants/:id", (req, res) => {

    /* Need to connect to PostgreSQL Database to DELETE rows from the restaurants table */

    
    /* Send  response Status of 201 successful, and return the data in the response body */
    res.status(204).json({
        status  :   "success",
    })
});


// Express.js Server Configuration:  
const port = process.env.PORT || 3001;
app.listen(port, () => { 
    console.log(`Server is up and running on port ${port}`);
    console.log(`You can access the site at: http://localhost:${port}/`);
});
