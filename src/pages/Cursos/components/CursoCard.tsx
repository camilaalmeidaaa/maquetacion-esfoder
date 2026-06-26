import {
Pencil,
Power
} from "lucide-react";



export default function CursoCard({

curso,
numero,
editar

}:any){



return (

<div className="
w-72
bg-white
rounded-3xl
border
p-5
shadow-sm
">


<div className="
flex
justify-between
">


<span className="
bg-lime-100
text-lime-600
px-3
py-1
rounded-full
text-xs
">

Nivel {numero}

</span>



<Power

size={18}

className={

curso.estado==="Activo"

?

"text-green-500 cursor-pointer"

:

"text-gray-300 cursor-pointer"

}

/>


</div>





<h3 className="
font-bold
mt-4
">

{curso.nombre}

</h3>




<div className="
text-xs
text-gray-500
mt-3
space-y-2
">


<p>
📚 {curso.tematicas.length} temáticas
</p>


<p>
🎯 {curso.logros.length} logros
</p>



<p>
Orden: {curso.orden}
</p>


</div>





<button

onClick={()=>editar(curso)}

className="
mt-5
w-full
bg-gray-100
hover:bg-gray-200
py-2
rounded-xl
flex
justify-center
gap-2
text-sm
"

>


<Pencil size={15}/>

Editar


</button>




</div>


)


}