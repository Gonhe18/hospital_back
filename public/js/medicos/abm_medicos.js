import { validacionBlur } from '../validaciones.js'

let selectEspecialidad = document.getElementById('especialidad')
let form_medicos = document.getElementById('form_medicos')
let btn_form_medicos = document.getElementById('btn_form_medicos')
let error_dia_atencion = document.getElementById('error_dia_atencion')
let dias_seleccionados = document.getElementById('dias_seleccionados')
let query = location.href.split("/");

window.addEventListener("load", () => {
   obtener_especialidades();
   query.find((q) => {
      if (q == 'crear') {
         form_medicos.setAttribute('action', '/medicos/crear')
      } else if (q == 'edit') {
         obtener_medico()
         form_medicos.setAttribute('action', '/medicos/edit/' + query[query.length - 1])
      }
   })
   
});

const obtener_especialidades = async () => {
   const RESP = await fetch("/api/especialidades");
   const ESPECIALIDADES = await RESP.json();
   generarOpciones(ESPECIALIDADES);
};

const obtener_medico = async () => {

   let id = query[query.length - 1];
   const RESP = await fetch("/api/medico/" + id);
   const MEDICO = await RESP.json();
   recuperarDatosMedico(MEDICO[0]);
};

const generarOpciones = (espeacialidades) => {
   espeacialidades.forEach((e) => {
      let option = document.createElement("option");
      option.value = e.id;
      option.text = e.descripcion;
      selectEspecialidad.add(option);
   });
}

const recuperarDatosMedico = (medico) => {
   let hay_archivo = document.getElementById('existe_archivo')
   let horario_atencion = JSON.parse(medico.horario_atencion)

   document.getElementById('nombre').value = medico.nombre
   document.getElementById('apellido').value = medico.apellido
   document.getElementById('matricula').value = medico.matricula
   document.getElementById('especialidad').value = medico.especialidad_id
   document.getElementById('hora_inicio').value = horario_atencion[0]
   document.getElementById('hora_fin').value = horario_atencion[1]
   if(medico.foto_perfil != null && medico.foto_perfil != ''){
      hay_archivo.setAttribute('class','font-semibold text-xs sm:text-md mt-1')
      hay_archivo.innerHTML = '**Existe un archivo adjunto**'
   }else{
      hay_archivo.setAttribute('class','hidden')
   }

   let checks = document.querySelectorAll('input[type="checkbox"]')
   checks.forEach(c => {
      JSON.parse(medico.dias_atencion).find(dia => {
         if(dia == c.value){
            c.checked = true
         }
      })
   })
}

btn_form_medicos.addEventListener('click', e => {
   e.preventDefault()
   let dias_atencion = []
   let claves_form = {
      'nombre': document.getElementById('nombre').value,
      'apellido': document.getElementById('apellido').value,
      'matricula': document.getElementById('matricula').value,
      'especialidad': document.getElementById('especialidad').value,
      'hora_inicio': document.getElementById('hora_inicio').value,
      'hora_fin': document.getElementById('hora_fin').value
   }

   let ids = document.querySelectorAll("input[name='dia_atencion[]']:checked");

   ids.forEach(id => dias_atencion.push(id.value))

   if (validacionBlur(claves_form)) {
      if (dias_atencion.length > 0) {
         let pregunta = ''
         query.find((q) => {
            if (q == 'crear') {
               pregunta = "Crear médico?"
            } else if (q == 'edit') {
               pregunta = "Editar médico?"
            }
         })

         Swal.fire({
            title: `${pregunta}`,
            icon: "question",
            showConfirmButton: true,
            confirmButtonColor: "#379237",
            confirmButtonText: "Confirmar",
            showCancelButton: true,
            cancelButtonColor: "#FF1E1E",
            cancelButtonText: `Cancelar`,
         }).then((result) => {
            if (result.isConfirmed) {
               error_dia_atencion.setAttribute('class', 'hidden')
               dias_seleccionados.value = JSON.stringify(dias_atencion)
               form_medicos.submit()
            }
         })


      } else {
         error_dia_atencion.innerHTML = 'Debe seleccionar como mínimo un día de atención'
         error_dia_atencion.setAttribute('class', 'text-red-500 font-semibold')
      }
   }
})