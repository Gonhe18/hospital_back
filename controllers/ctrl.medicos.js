import pool from '../config/db.js';

export const mostrarMedicosGet = async (req, res) => {
   try {
      const connection = await pool.getConnection()
      const [rows] = await connection.query('SELECT m.*, e.descripcion FROM medicos__medicos m INNER JOIN medicos__especialidades e on m.especialidad_id = e.id')
      connection.release()
      res.json(rows)
   } catch (error) {
      console.error(error.message)
      res.status(500).send('Error en la consulta')
   }
}

export const mostrarEspecialidadesGet = async (req, res) => {
   try {
      const connection = await pool.getConnection()
      const [rows] = await connection.query('SELECT * FROM medicos__especialidades')
      connection.release()
      res.json(rows)
   } catch (error) {
      console.error(error.message)
      res.status(500).send('Error en la consulta')
   }
}

export const crearMedicoPost = async (req, res) => {
   try {
      const { nombre, apellido, foto_perfil, matricula, especialidad, dias_seleccionados, hora_inicio, hora_fin } = req.body

      const connection = await pool.getConnection()
      const [result] = await connection.query(`INSERT INTO medicos__medicos (nombre,apellido,nombre_completo,matricula,especialidad_id,dias_atencion,horario_atencion,foto_perfil) VALUES(?,?,?,?,?,?,?,?)`, [nombre, apellido, nombre + " " + apellido, matricula, especialidad, dias_seleccionados, JSON.stringify([hora_inicio, hora_fin]), foto_perfil != "" ? foto_perfil : null])
      connection.release()

      res.status(200).redirect('/medicos')

   } catch (error) {
      console.error(error.message)
      res.status(500).send('Error al crear el médico')
   }
}

export const medicoByIdGet = async (req, res) => {
   const medico_id = req.params.id
   const connection = await pool.getConnection()
   const [rows] = await connection.query('SELECT * FROM medicos__medicos WHERE id = ?', [medico_id])
   connection.release()
   res.json(rows)
}

export const editarMedicoPost = async (req, res) => {
   try {
      const medico_id = req.params.id
      const connection = await pool.getConnection()
      const { nombre, apellido, foto_perfil, matricula, especialidad, dias_seleccionados, hora_inicio, hora_fin } = req.body

      const [result] = await connection.query('UPDATE medicos__medicos SET nombre = ?, apellido = ?, nombre_completo = ?, matricula = ?, especialidad_id = ?, dias_atencion = ?, horario_atencion = ?, foto_perfil = ? WHERE id = ?', [nombre, apellido, nombre + " " + apellido, matricula, especialidad, dias_seleccionados, JSON.stringify([hora_inicio, hora_fin]), foto_perfil != "" ? foto_perfil : null, medico_id])
      connection.release()

      if (result.affectedRows === 0) {
         res.status(500).json({ message: 'Médico no encontrado' })
      } else {
         res.status(200).redirect('/medicos')
      }

   } catch (error) {
      console.error(error.message)
      res.status(500).send('Error al editar el médico')
   }
}

export const eliminarMedicoPost = async (req, res) => {
   try {
      const medico_id = req.params.id
      const connection = await pool.getConnection()
      const [result] = await connection.query('DELETE FROM medicos__medicos WHERE id = ?', [medico_id])
      connection.release()
      if (result.affectedRows === 0) {
         res.status(500).json({ message: 'Médico no encontrado' })
      } else {
         res.status(200).redirect('/medicos')

      }

   } catch (error) {
      console.error(error.message)
      res.status(500).send('Error al eliminar el médico')
   }
}
