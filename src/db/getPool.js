import mysql from 'mysql2/promise';


let pool;

const getPool = async () => {
    try {
        if(!pool){
            const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;
            
            pool = mysql.createPool({
                connectionLimit: 50,
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASSWORD,
                database: MYSQL_DATABASE,
                timezone: 'Z'
            })
        }

        return pool;
    } catch (error) {
        console.log(error);
    }
}

export default getPool;