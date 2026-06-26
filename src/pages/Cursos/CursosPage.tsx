import {
useState
} from "react";


import {
seedLinea
} from "../../services/seedLinea";


import LineaCard from "./components/LineaCard";

import FiltroCursos from "./components/FiltroCursos";




export default function CursosPage(){



const [filtros,setFiltros]=useState({

busqueda:"",

programa:"",

deporte:"",

etapa:"",

enfoque:"",

estado:""

});





const lineasFiltradas = seedLinea.filter(
(linea:any)=>{


const texto = 
linea.nombre
.toLowerCase()
.includes(
filtros.busqueda.toLowerCase()
);



const deporte =

!filtros.deporte

||

linea.deporte.id===Number(filtros.deporte);



const etapa =

!filtros.etapa

||

linea.etapas.some(

(e:any)=>

e.id===Number(filtros.etapa)

);



const estado =

!filtros.estado

||

linea.estado===filtros.estado;



return texto && deporte && etapa && estado;


}

);







return (


<div

className="
w-full
h-full
flex
flex-col
p-4
md:p-8
overflow-hidden
"

>



<FiltroCursos

filtros={filtros}

setFiltros={setFiltros}

/>






<div

className="
flex-1
overflow-y-auto
overflow-x-hidden
mt-6
space-y-6
pr-2
"

>



{

lineasFiltradas.map((linea:any)=>(


<LineaCard

key={linea.id}

linea={linea}


/>


))

}


</div>





</div>


)

}