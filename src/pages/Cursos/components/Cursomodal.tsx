import { useState } from "react";

import {
  Check,
  X,
  ChevronRight,
  ChevronLeft
} from "lucide-react";


import {
  seedNiveles,
  seedTematicas,
  seedLogros,
  seedInstructores

} from "../../../services/seedData";




export default function CursoModal({

  cerrar,
  guardar,
  cursos,
  cursoEditar,
  lineaId

}:any){



const [step,setStep]=useState(1);



// niveles usados

const nivelesUsados =
cursos.map(
(c:any)=>c.nivelId
);



const nivelesDisponibles =
seedNiveles.filter(

(n:any)=>

!nivelesUsados.includes(n.id)

||

n.id===cursoEditar?.nivelId

);





const [data,setData]=useState<any>(

cursoEditar ??

{

id:null,

lineaId,

nombre:"",

nivelId:"",

orden:cursos.length + 1,

tematicas:[],

logros:[],

instructores:[],

estado:"Activo"

}

);






function seleccionarTematica(item:any){


const existe =
data.tematicas.some(
(t:any)=>t.id===item.id
);



setData({

...data,

tematicas:

existe

?

data.tematicas.filter(
(t:any)=>t.id!==item.id
)

:

[
...data.tematicas,
item
]

});

}




function seleccionarLogro(item:any){


const existe =
data.logros.some(
(l:any)=>l.id===item.id
);



setData({

...data,

logros:

existe

?

data.logros.filter(
(l:any)=>l.id!==item.id
)

:

[
...data.logros,
item
]

});

}




function seleccionarInstructor(item:any){


const existe =
data.instructores.some(
(i:any)=>i.id===item.id
);



setData({

...data,

instructores:

existe

?

data.instructores.filter(
(i:any)=>i.id!==item.id
)

:

[
...data.instructores,
item
]

});

}





return (


<div className="
fixed
inset-0
bg-black/40
flex
justify-center
items-center
z-50
">


<div className="
bg-white
w-[520px]
max-h-[90vh]
rounded-3xl
p-8
relative
overflow-hidden
">





<button

onClick={cerrar}

className="
absolute
right-5
top-5
text-gray-400
hover:text-gray-700
"

>

<X size={22}/>

</button>





<h2 className="
text-2xl
font-bold
text-gray-800
">


{

cursoEditar

?

"Editar curso"

:

"Nuevo curso"

}


</h2>







<div className="
flex
justify-center
gap-3
mt-5
">


{

[1,2,3].map((item)=>(


<div

key={item}

className={`

w-3
h-3
rounded-full


${step===item

?

"bg-lime-500"

:

"bg-gray-300"

}

`}


/>


))

}



</div>









<div className="
mt-6
max-h-[55vh]
overflow-y-auto
pr-2
">







{/* STEP 1 */}

{

step===1 &&


<div>


<label className="text-sm font-medium">

Nombre del curso

</label>


<input

className="
w-full
border
rounded-xl
p-3
mt-2
"

value={data.nombre}


onChange={e=>

setData({

...data,

nombre:e.target.value

})

}


/>





<label className="
block
mt-5
text-sm
font-medium
">

Nivel

</label>


<select

className="
w-full
border
rounded-xl
p-3
mt-2
"


value={data.nivelId}


onChange={e=>

setData({

...data,

nivelId:Number(e.target.value)

})

}


>


<option value="">

Seleccione nivel

</option>



{

nivelesDisponibles.map((n:any)=>(


<option

key={n.id}

value={n.id}

>

{n.nombre}

</option>


))


}


</select>





<label className="
block
mt-5
text-sm
font-medium
">

Orden

</label>


<input

type="number"

className="
w-full
border
rounded-xl
p-3
mt-2
"


value={data.orden}


onChange={e=>

setData({

...data,

orden:Number(e.target.value)

})

}


/>







<div className="
flex
justify-between
items-center
mt-6
">


<span>

Estado

</span>



<select

className="
border
rounded-xl
p-2
"


value={data.estado}


onChange={e=>

setData({

...data,

estado:e.target.value

})

}


>

<option>

Activo

</option>


<option>

Inactivo

</option>


</select>


</div>


</div>


}









{/* STEP 2 */}

{

step===2 &&


<div>



<h3 className="font-semibold">

Temáticas

</h3>




<div className="
grid
grid-cols-2
gap-3
mt-3
">


{

seedTematicas.map((t:any)=>(


<button

key={t.id}


onClick={()=>seleccionarTematica(t)}


className={`

p-3
rounded-xl
border
text-left


${
data.tematicas.some(
(x:any)=>x.id===t.id
)

?

"bg-lime-100 border-lime-400"

:

"bg-gray-50"

}

`}


>


{

data.tematicas.some(
(x:any)=>x.id===t.id
)

&&

<Check
size={14}
className="inline mr-2"
/>

}


{t.nombre}


</button>


))


}


</div>







<h3 className="font-semibold mt-6">

Logros

</h3>



<div className="
space-y-2
mt-3
">


{

seedLogros.map((l:any)=>(


<button

key={l.id}


onClick={()=>seleccionarLogro(l)}


className={`

w-full
p-3
rounded-xl
border
text-left


${
data.logros.some(
(x:any)=>x.id===l.id
)

?

"bg-green-100 border-green-400"

:

"bg-gray-50"

}

`}


>


{

data.logros.some(
(x:any)=>x.id===l.id
)

&&

<Check
size={14}
className="inline mr-2"
/>

}


🎯 {l.nombre}


</button>


))


}


</div>




</div>


}









{/* STEP 3 */}

{

step===3 &&


<div>


<h3 className="font-semibold">

Asignar instructores

</h3>




<div className="
space-y-3
mt-4
">


{

seedInstructores.map((i:any)=>(


<button


key={i.id}


onClick={()=>seleccionarInstructor(i)}



className={`

w-full
p-3
rounded-xl
border
text-left


${
data.instructores.some(
(x:any)=>x.id===i.id
)

?

"bg-lime-100 border-lime-400"

:

"bg-gray-50"

}


`}


>


{

data.instructores.some(
(x:any)=>x.id===i.id
)

&&

<Check
size={14}
className="inline mr-2"
/>

}


<p className="font-medium">

{i.nombre}

</p>


<span className="
text-xs
text-gray-500
">

{i.perfil}

</span>


</button>



))


}


</div>


</div>


}



</div>









<div className="
flex
gap-3
mt-8
">





{

step>1 &&


<button

onClick={()=>setStep(step-1)}

className="
flex-1
bg-gray-100
py-3
rounded-xl
"

>


<ChevronLeft size={18} className="inline"/>

Atrás


</button>


}





{

step<3 &&


<button

onClick={()=>setStep(step+1)}

className="
flex-1
bg-lime-500
text-white
py-3
rounded-xl
"

>


Siguiente


<ChevronRight size={18} className="inline"/>


</button>


}






{

step===3 &&


<button

onClick={()=>guardar(data)}

className="
flex-1
bg-lime-500
text-white
py-3
rounded-xl
"

>


Guardar curso


</button>


}



</div>






</div>


</div>


)

}