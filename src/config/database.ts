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

    return connection;
} 

export default getConnection;