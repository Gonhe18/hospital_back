import express from 'express';
// import multer from 'multer';
import { __dirname } from '../app.js'

const router = express.Router();

import {
   mostrarMedicosGet,
   mostrarEspecialidadesGet,
   crearMedicoPost,
   medicoByIdGet,
   editarMedicoPost,
   eliminarMedicoPost
} from '../controllers/ctrl.medicos.js';

// Middleware para cargar archivos
// const storage = multer.diskStorage({
//    destination: (req, file, cb) => {
//       console.log('file', file)
//       cb(null, 'public/uploads')
//    },
//    filename: (req, file, cb) => {
//       cb(null, `${Date.now()}-${file.originalname}`)
//    }
// })

// const upload = multer({ storage: storage });


// Listar médicos
router.get('/medicos', async (req, res) => {
   res.sendFile(__dirname + '/public/pages/medicos/lista_medicos.html');
})
router.get('/api/medicos', mostrarMedicosGet)
// Recupero todas las especialidades de los médicos
router.get('/api/especialidades', mostrarEspecialidadesGet)


// Crear médico
router.get('/medicos/crear', (req, res) => {
   res.sendFile(__dirname + '/public/pages/medicos/abm_medicos.html');
})
router.post('/medicos/crear', crearMedicoPost)


// Editar médico
router.get('/medicos/edit/:id', async (req, res) => {
   res.sendFile(__dirname + '/public/pages/medicos/abm_medicos.html');
})
// Recupero datos del médico
router.get('/api/medico/:id', medicoByIdGet)
router.post('/medicos/edit/:id', editarMedicoPost)


// Eliminar médico
router.post('/medicos/delete/:id', eliminarMedicoPost)


// Turnero
router.get('/turnero', async (req, res) => {
   res.sendFile(__dirname + '/public/pages/medicos/turnero.html');
})

export default router;