import {
useState
} from "react";


import {
Plus,
Dumbbell,
Layers,
MapPin
} from "lucide-react";


import CursoRuta from "./CursoRuta";

import CursoModal from "./CursoModal";


import {
seedCursos
} from "../../../services/seedCursos";




export default function LineaCard({
linea
}:any){


const [cursos,setCursos]=useState(

seedCursos.filter(
(c:any)=>c.lineaId===linea.id
)

);



const [modal,setModal]=useState(false);



const [cursoEditar,setCursoEditar]=useState<any>(null);






function abrirCrear(){


setCursoEditar(null);

setModal(true);


}





function abrirEditar(curso:any){


setCursoEditar(curso);

setModal(true);


}





function guardarCurso(curso:any){



if(cursoEditar){


setCursos(prev=>

prev.map(c=>

c.id===curso.id

?

curso

:

c

)

)



}

else{


setCursos(prev=>[

...prev,

{

...curso,

id:Date.now()

}

])


}



setModal(false);

setCursoEditar(null);


}







return (


<div className="
bg-white
rounded-3xl
border
shadow-sm
p-8
">





{/* HEADER LINEA */}



<div className="
flex
justify-between
items-start
">


<div>


<h1 className="
text-2xl
font-bold
">

{linea.nombre}

</h1>



<div className="
flex
gap-6
mt-4
text-sm
text-gray-500
">


<span>

<Dumbbell
size={16}
className="inline mr-1"
/>

{linea.deporte.nombre}

</span>



<span>

<Layers
size={16}
className="inline mr-1"
/>

{linea.modalidad.nombre}

</span>



<span>

<MapPin
size={16}
className="inline mr-1"
/>

{linea.etapas[0].nombre}

</span>



</div>


</div>





<button

onClick={abrirCrear}

className="
bg-lime-500
text-white
px-5
py-3
rounded-xl
flex
gap-2
items-center
"


>


<Plus size={18}/>

Nuevo curso


</button>



</div>







{/* RUTA DE CURSOS */}



<div className="
mt-10
overflow-x-auto
pb-4
">


<h2 className="
font-semibold
mb-5
">

Ruta deportiva

</h2>



<CursoRuta


cursos={cursos}


editar={abrirEditar}


/>


</div>









{
modal &&


<CursoModal


lineaId={linea.id}


cursos={cursos}


cursoEditar={cursoEditar}



cerrar={()=>{


setModal(false);

setCursoEditar(null);


}}



guardar={guardarCurso}


/>



}



</div>


)


}