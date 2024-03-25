const express = require('express')
const app = express()
const pg = require('pg')

const path = require('path');

app.use(express.static(path.join('./', 'public')));

const config = {
    user: 'postgres',
    database: 'Personalcompany_EUAF',
    password: 'postgres',
    port: 5432
};

const pool = new pg.Pool(config);


app.get('/', function (req, res) {
    res.send('Hello World')
})

app.get('/users', function (req, res) {
    let result_str_to_save = "SELECT * FROM users";
    pool.connect(function (err, client, done) {
        if (err) {
            console.log("Can not connect to the DB" + err);
        }

        client.query(result_str_to_save, function (err, result) {
            done();
            if (err) {
                console.log(err);
                res.status(400).send(err);
            }
            console.log(result.rows);

            res.status(200).json({ response: result.rows })
        })
    })

})

app.listen(3000)