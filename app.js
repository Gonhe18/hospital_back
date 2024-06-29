import express from 'express'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import session from 'express-session';
import 'dotenv/config';

import rutasMedicos from './routes/rutas.medicos.js';

const app = express()
const port = 3000

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))

app.use(session({
   secret: process.env.KEY_ALERT,
   resave: false,
   saveUninitialized: false,
   expires: 60000
}))


app.use('/', rutasMedicos);



app.listen(port, () => {
   console.log('Server OK')

})