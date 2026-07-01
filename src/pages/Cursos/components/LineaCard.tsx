import {
useState
} from "react";


import {
Plus,
Dumbbell,
Layers,
MapPin,
Sparkles
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
rounded-[32px]
border
border-gray-100
shadow-sm
hover:shadow-md
transition
p-7
">






{/* HEADER */}



<div className="
flex
justify-between
items-start
gap-4
">





<div>



<div className="
flex
items-center
gap-2
mb-2
">


<Sparkles

size={18}

className="text-lime-500"

/>


<span className="
text-xs
uppercase
tracking-wide
text-gray-400
font-medium
">

Línea deportiva

</span>


</div>






<h1 className="
text-2xl
font-semibold
text-gray-700
">

{linea.nombre}

</h1>





<div className="
flex
flex-wrap
gap-3
mt-5
">


<span className="
flex
items-center
gap-2
bg-gray-50
border
border-gray-100
px-3
py-2
rounded-full
text-sm
text-gray-500
">


<Dumbbell size={15}/>


{linea.deporte.nombre}


</span>






<span className="
flex
items-center
gap-2
bg-gray-50
border
border-gray-100
px-3
py-2
rounded-full
text-sm
text-gray-500
">


<Layers size={15}/>


{linea.modalidad.nombre}


</span>







<span className="
flex
items-center
gap-2
bg-gray-50
border
border-gray-100
px-3
py-2
rounded-full
text-sm
text-gray-500
">


<MapPin size={15}/>


{linea.etapas[0].nombre}


</span>





</div>




</div>










<button

onClick={abrirCrear}

className="
bg-lime-500
hover:bg-lime-600
transition
text-white
px-5
py-3
rounded-2xl
flex
items-center
gap-2
text-sm
font-medium
shadow-sm
"

>


<Plus size={18}/>


Nuevo curso


</button>






</div>









{/* DIVISOR */}



<div className="
border-t
border-gray-100
my-8
"/>







{/* CURSOS */}




<div>


<div className="
flex
justify-between
items-center
mb-5
">


<h2 className="
text-lg
font-semibold
text-gray-600
">

Ruta deportiva

</h2>



<span className="
text-sm
text-gray-400
">

{cursos.length} cursos

</span>



</div>






<div className="
overflow-x-auto
pb-4
">


<CursoRuta


cursos={cursos}


editar={abrirEditar}


/>



</div>



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