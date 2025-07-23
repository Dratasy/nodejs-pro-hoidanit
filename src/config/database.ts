import mysql from 'mysql2/promise';

// Create the connection to database
const getConnection = async () =>{
    const connection = await mysql.createConnection({
        port: 3306,
        host: 'localhost',
        user: 'devuser',
        password: '123456',
        database: 'nodejspro',
    });

    // A simple SELECT query
    try {
        const [results, fields] = await connection.query(
            'SELECT * FROM `users`'
        );

        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
    } catch (err) {
        console.log(err);
    }
} 

export default getConnection;