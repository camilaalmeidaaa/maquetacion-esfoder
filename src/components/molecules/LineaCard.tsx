import { motion } from "framer-motion";

import {
  Pencil,
  Power,
  Trophy,
  Dumbbell,
  Layers,
  Target,
  ListChecks
} from "lucide-react";


interface Props{

  linea:any;

  onEditar:(linea:any)=>void;

}



export default function LineaCard({
  linea,
  onEditar

}:Props){


return (

<motion.div

initial={{
opacity:0,
y:20
}}

animate={{
opacity:1,
y:0
}}

whileHover={{
y:-5
}}

transition={{
duration:0.25
}}

className="
bg-white
rounded-3xl
p-5
border
border-gray-100
shadow-sm
hover:shadow-lg
transition-all
"

>



{/* HEADER */}

<div className="
flex
justify-between
items-start
mb-4
">


<div className="
flex
gap-3
items-center
">


<div

className="
w-11
h-11
rounded-2xl
bg-yellow-100
flex
items-center
justify-center
text-yellow-600
"

>

<Trophy size={22}/>

</div>



<div>


<h3 className="
font-semibold
text-gray-700
text-sm
">

{linea.nombre}

</h3>


<span className="
text-xs
text-gray-400
">

Línea deportiva

</span>


</div>


</div>





<span

className={`

text-xs
px-3
py-1
rounded-full
font-medium

${
linea.estado==="Activo"

?

"bg-green-100 text-green-600"

:

"bg-gray-100 text-gray-500"

}

`}

>

{linea.estado}

</span>


</div>







{/* INFORMACIÓN */}


<div className="
space-y-3
text-sm
">



<Item

icon={<Dumbbell size={15}/>}

label="Deporte"

value={linea.deporte?.nombre}

/>




<Item

icon={<Layers size={15}/>}

label="Modalidad"

value={linea.modalidad?.nombre}

/>




<Item

icon={<Target size={15}/>}

label="Enfoque"

value={
linea.enfoque
?.map((e:any)=>e.nombre)
.join(", ")
}

/>




<Item

icon={<ListChecks size={15}/>}

label="Etapas"

value={
linea.etapas
?.map((e:any)=>e.nombre)
.join(", ")
}

/>



</div>







{/* PROGRAMAS */}



<div className="
mt-4
flex
flex-wrap
gap-2
">


{

linea.programas
?.map((p:any)=>(


<span

key={p.id}

className="
text-xs
bg-gray-100
text-gray-600
px-3
py-1
rounded-full
"

>

{p.nombre}

</span>


))

}



</div>







{/* ACCIONES */}



<div className="
flex
gap-2
mt-5
">


<button

onClick={()=>onEditar(linea)}

className="
flex-1
flex
items-center
justify-center
gap-2
text-xs
py-2
rounded-xl
bg-gray-100
hover:bg-gray-200
transition
"

>


<Pencil size={14}/>

Editar


</button>





<button

className="
flex
items-center
justify-center
gap-2
text-xs
px-4
py-2
rounded-xl
bg-pink-50
text-pink-500
hover:bg-pink-100
transition
"

>

<Power size={14}/>

</button>



</div>




</motion.div>

)

}








function Item({
icon,
label,
value

}:any){


return (

<div className="
flex
items-center
justify-between
gap-3
">


<div className="
flex
items-center
gap-2
text-gray-400
">


{icon}


<span className="text-xs">

{label}

</span>


</div>





<span className="
text-xs
font-medium
text-gray-700
text-right
max-w-[180px]
">


{
value || "Sin configurar"
}


</span>


</div>


)

}