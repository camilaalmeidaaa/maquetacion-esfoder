import {
seedTematicas,
seedLogros
} from "./seedData";


export const seedCursos = [


{
id:1,

lineaId:1,

nombre:"Adaptación acuática",

nivelId:1,

orden:1,


tematicas:[

seedTematicas[0],
seedTematicas[1],
seedTematicas[2]

],


logros:[

seedLogros[0],
seedLogros[1],
seedLogros[2]

],


estado:"Activo"

},



{
id:2,

lineaId:1,

nombre:"Desarrollo técnico acuático",

nivelId:2,

orden:2,


tematicas:[

seedTematicas[4],
seedTematicas[5]

],


logros:[

seedLogros[6],
seedLogros[7]

],


estado:"Activo"

}



];