import {
  Pencil,
  Power,
  BookOpen,
  Target,
  ListOrdered
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
rounded-[28px]
border
border-gray-100
p-5
shadow-sm
hover:shadow-md
transition
">







{/* HEADER */}


<div className="
flex
justify-between
items-center
">


<span className="
bg-lime-50
text-lime-600
px-3
py-1.5
rounded-full
text-xs
font-medium
">

Nivel {numero}

</span>





<div className={`
flex
items-center
gap-1
px-3
py-1.5
rounded-full
text-xs
font-medium


${
curso.estado==="Activo"

?

"bg-green-50 text-green-600"

:

"bg-gray-100 text-gray-400"

}

`}>



<Power size={13}/>


{curso.estado}


</div>




</div>









{/* TITULO */}



<h3 className="
mt-5
text-lg
font-semibold
text-gray-700
leading-tight
">


{curso.nombre}


</h3>







{/* INFO */}



<div className="
mt-5
space-y-3
">


<div className="
flex
items-center
gap-3
text-sm
text-gray-500
">


<div className="
w-8
h-8
rounded-xl
bg-blue-50
flex
items-center
justify-center
">

<BookOpen size={15}/>

</div>


<span>

{curso.tematicas.length} temáticas

</span>


</div>






<div className="
flex
items-center
gap-3
text-sm
text-gray-500
">


<div className="
w-8
h-8
rounded-xl
bg-yellow-50
flex
items-center
justify-center
">

<Target size={15}/>

</div>


<span>

{curso.logros.length} logros

</span>


</div>







<div className="
flex
items-center
gap-3
text-sm
text-gray-500
">


<div className="
w-8
h-8
rounded-xl
bg-gray-50
flex
items-center
justify-center
">

<ListOrdered size={15}/>

</div>



<span>

Orden {curso.orden}

</span>



</div>



</div>









{/* BOTON */}



<button

onClick={()=>editar(curso)}

className="
mt-6
w-full
bg-gray-50
hover:bg-lime-50
hover:text-lime-700
transition
py-3
rounded-2xl
flex
justify-center
items-center
gap-2
text-sm
font-medium
text-gray-600
"


>


<Pencil size={15}/>


Editar curso


</button>

</div>


)


}