import {
useState
} from "react";


import {
Check
} from "lucide-react";


import {
seedNiveles,
seedTematicas,
seedLogros

} from "../../../services/seedData";




export default function CursoModal({

cerrar,
guardar,
cursos,
cursoEditar,
lineaId

}:any){



// niveles ya usados

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

estado:"Activo"

}

);





function seleccionarTematica(item:any){


const existe =
data.tematicas.find(
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


})


}





function seleccionarLogro(item:any){


const existe =
data.logros.find(
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


})


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
w-[500px]
max-h-[90vh]
overflow-y-auto
rounded-3xl
p-8
">


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






{/* NOMBRE */}

<label className="
text-sm
font-medium
block
mt-6
">

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








{/* NIVEL */}


<label className="
text-sm
font-medium
block
mt-5
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


<option>

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








{/* ORDEN */}


<label className="
text-sm
font-medium
block
mt-5
">

Orden dentro de la ruta

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





<p className="
text-xs
text-gray-400
mt-1
">

Ejemplo: Nivel 1 → orden 1,
Nivel 2 → orden 2

</p>








{/* TEMATICAS */}


<h3 className="
font-semibold
mt-7
">

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

text-left
p-3
rounded-xl
border
text-sm


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
className="inline mr-1"
/>

}


{t.nombre}



</button>



))


}


</div>








{/* LOGROS */}



<h3 className="
font-semibold
mt-7
">

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
text-left
p-3
rounded-xl
border
text-sm


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








{/* ESTADO */}



<div className="
mt-6
flex
justify-between
items-center
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








<div className="
flex
gap-3
mt-8
">


<button

onClick={cerrar}

className="
flex-1
bg-gray-100
py-3
rounded-xl
"

>

Cancelar

</button>




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


</div>







</div>


</div>


)

}