import CursoCard from "./CursoCard";


export default function CursoRuta({

cursos,
editar

}:any){



const ordenados=[...cursos]
.sort(
(a,b)=>a.orden-b.orden
);



return (

<div className="
flex
items-center
overflow-x-auto
">


{


ordenados.map((curso,index)=>(


<div
key={curso.id}
className="flex items-center"
>


<CursoCard


curso={curso}


numero={index+1}


editar={editar}



/>



{
index < ordenados.length-1 &&


<div className="
w-20
h-1
bg-lime-400
mx-4
"

/>


}



</div>


))


}



</div>


)

}