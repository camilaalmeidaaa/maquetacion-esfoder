import {
  seedProgramas,
  seedDeportes,
  seedEnfoques,
  seedEtapas
} from "./seedData";


export const seedLinea = [

{
id:1,

nombre:"Línea 1",

programas:[
  seedProgramas.find(p=>p.id===1)
],

deporte:
seedDeportes.find(d=>d.id===1),


modalidad:{
  id:1,
  nombre:"Natación Clásica",
  icon:"🏊"
},


enfoque:[
  seedEnfoques.find(e=>e.id===3)
],


etapas:[
  seedEtapas.find(e=>e.id===1)
],


estado:"Activo"

},


{
id:2,

nombre:"Línea  2",

programas:[
  seedProgramas.find(p=>p.id===1)
],

deporte:
seedDeportes.find(d=>d.id===1),


modalidad:{
  id:1,
  nombre:"Natación Clásica",
  icon:"🏊"
},


enfoque:[
  seedEnfoques.find(e=>e.id===3)
],


etapas:[
  seedEtapas.find(e=>e.id===2)
],


estado:"Activo"

},


{
id:3,

nombre:"Línea 3",

programas:[
  seedProgramas.find(p=>p.id===1)
],

deporte:
seedDeportes.find(d=>d.id===1),


modalidad:{
  id:1,
  nombre:"Natación Clásica",
  icon:"🏊"
},


enfoque:[
  seedEnfoques.find(e=>e.id===3)
],


etapas:[
  seedEtapas.find(e=>e.id===3)
],


estado:"Activo"

},


{
id:4,

nombre:"Línea 4",

programas:[
  seedProgramas.find(p=>p.id===1)
],

deporte:
seedDeportes.find(d=>d.id===1),


modalidad:{
  id:1,
  nombre:"Natación Clásica",
  icon:"🏊"
},


enfoque:[
  seedEnfoques.find(e=>e.id===1)
],


etapas:[
  seedEtapas.find(e=>e.id===5),
  seedEtapas.find(e=>e.id===6),
  seedEtapas.find(e=>e.id===7)
],


estado:"Activo"

},


{
id:5,

nombre:"Línea 5",

programas:[
  seedProgramas.find(p=>p.id===1)
],

deporte:
seedDeportes.find(d=>d.id===1),


modalidad:{
  id:1,
  nombre:"Natación Clásica",
  icon:"🏊"
},


enfoque:[
  seedEnfoques.find(e=>e.id===1)
],


etapas:[
  seedEtapas.find(e=>e.id===8)
],


estado:"Activo"

}

];