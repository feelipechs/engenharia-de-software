import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

// testar conexão
pool.getConnection()
    .then(connection => {
        console.log('Conexão com o MySQL estabelecida com sucesso!');
        connection.release();
    })
    .catch(err => {
        console.error('ERRO AO CONECTAR AO MYSQL:', err.message);
        console.error('Verifique suas credenciais no arquivo .env.');
    });

export default pool;