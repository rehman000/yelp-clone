require('dotenv').config();
const express = require("express");
const db = require('./db');

const morgan = require("morgan");

const app = express();


// Morgan is primarily used for logging.
app.use(morgan("dev"));

// Express.json() is a built in function in Express.js that handles getting JSON data that the client sends in a POST request.
app.use(express.json());



// Get all Restaurants: 
app.get("/api/v1/restaurants", async (req, res) => { 
    try {

        /* Query all entries in the restaurants table */
        const results = await db.query("SELECT * FROM restaurants");
        console.log(results);
    
        /* Send  response Status of 200 successful, and return the data in the response body */
        res.status(200).json({
            status  :   "success", 
            results : results.rows.length,
            data    :   {
                restaurants  :   results.rows,
            },
        });

    } catch (err) {
        console.log(err);
    }
});


// Get a Restaurant: 
app.get("/api/v1/restaurants/:id", async (req, res) => {

    try {

        /* Query entries in the restaurants table that match the unique id */
        /* DO NOT USE Template literals to pass into SQL qeuries to Postgres, it will make you vulnerable to SQLInjection attacks!*/
        // const results = await db.query(`SELECT * FROM restaurants WHERE id = ${req.params.id}`);    // DO NOT DO THIS! 

        // This is the safer way of doing this: 
        const results = await db.query("SELECT * FROM restaurants WHERE id = $1", [req.params.id]); 

        /* Send  response Status of 200 successful, and return the data in the response body */
        res.status(200).json({
            status  :   "success",
            data    :   {
                restaurant : results.rows[0]
            }
        });

    } catch (err) {
        console.log(err);
    }

});


// Create a Restaurant:
app.post("/api/v1/restaurants", async (req, res) => {

    try{

        /* Query: INSERT INTO restaurants (name, location, price_range) VALUES = ('name', 'location', 'prince_range')*/
        /* DO NOT USE Template literals to pass into SQL qeuries to Postgres, it will make you vulnerable to SQLInjection attacks! */        
        // const results = await db.query( `INSERT INTO restaurants (name, location, price_range) VALUES ('${req.body.name}', '${req.body.location}', '${req.body.price_range}')` );   // DO NOT DO THIS! 
        
        const results = await db.query("INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *", [req.body.name, req.body.location, req.body.price_range]);

        /* RETURNING * in SQL just returns all the columns for the entry just added into the table, which we can send back in the response. */

        /* Send  response Status of 201 successful, and return the data in the response body */
        res.status(201).json({
            status  :   "success",
            data    :   {
                restaurant : results.rows[0],
            }
        });

    } catch (err) {
        console.log(err);
    }
});


// Update Restaurant:
app.put("/api/v1/restaurants/:id", async (req, res) => {
    
    try{

        /*Query: UPDATE restaurants SET name=name, location=location, price_range=price_range WHERE id=id RETURNING *; */
        /* DO NOT USE Template literals to pass into SQL qeuries to Postgres, it will make you vulnerable to SQLInjection attacks! */        
        // const results = await db.query(`UPDATE restaurants SET name=${req.body.name}, location=${req.body.location}, price_range=${req.body.price_range} WHERE id=${req.params.id} returning *`);   // DO NOT DO THIS! 
        
        const results = await db.query("UPDATE restaurants SET name=$1, location=$2, price_range=$3 WHERE id=$4 RETURNING *", [req.body.name, req.body.location, req.body.price_range, req.params.id]);

        /* RETURNING * in SQL just returns all the columns for the entry just added into the table, which we can send back in the response. */

        /* Send  response Status of 201 successful, and return the data in the response body */
        res.status(200).json({
            status  :   "success",
            data    :   {
                restaurant : results.rows[0]
            }
        }); 

    } catch (err) {
        console.log(err);
    }
});


// Delete Restaurant:
app.delete("/api/v1/restaurants/:id", async (req, res) => {

    try {

        /* Query: DELETE FROM restaurants WHERE id = id RETURNING * ;  */
        /* DO NOT USE Template literals to pass into SQL qeuries to Postgres, it will make you vulnerable to SQLInjection attacks! */
        // const results = await db.query(`DELETE FROM restaurants WHERE id=${req.params.id} returning *`);  // DO NOT DO THIS! 
        
        const results = await db.query("DELETE FROM restaurants where id = $1 RETURNING *", [req.params.id]);
        // console.log(results);

        /* Send  response Status of 204 successful, and return the data in the response body */
        res.status(204).json({
            status  :   "success",
            data    :   results.rows[0],
        });
    } catch (err) {
        console.log(err);
    }

});


// Express.js Server Configuration:  
const port = process.env.PORT || 3001;
app.listen(port, () => { 
    console.log(`Server is up and running on port ${port}`);
    console.log(`You can access the site at: http://localhost:${port}/`);
});
