import { createPool } from "mysql2/promise";

const pool = createPool({
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'hospital',
   connectionLimit: 5,
   waitForConnections: true,
   queueLimit: 0
})

pool.getConnection()
   .then(connection => {
      pool.releaseConnection(connection)
      console.log('Conectado a la db')
   })
   .catch(err => console.error('No se puedo conectar', err))

export default pool