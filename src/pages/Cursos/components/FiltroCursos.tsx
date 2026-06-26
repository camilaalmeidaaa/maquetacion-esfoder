import {
Search,
Filter
} from "lucide-react";


import {
seedProgramas,
seedDeportes,
seedEtapas,
seedEnfoques

} from "../../../services/seedData";




export default function FiltroCursos({

filtros,
setFiltros

}:any){



function cambiar(
campo:string,
valor:any
){


setFiltros({

...filtros,

[campo]:valor

})


}





return (


<div className="
bg-white
rounded-3xl
border
p-5
mb-8
shadow-sm
">



<div className="
flex
items-center
gap-2
mb-5
font-semibold
">

<Filter size={18}/>

Filtros de búsqueda

</div>





<div className="
grid
grid-cols-1
md:grid-cols-6
gap-4
">





{/* BUSCAR */}


<div className="
relative
">


<Search

size={16}

className="
absolute
left-3
top-3
text-gray-400
"

/>



<input


placeholder="
Buscar línea...
"


className="
border
rounded-xl
py-2
pl-10
w-full
"


value={filtros.busqueda}


onChange={e=>

cambiar(
"busqueda",
e.target.value
)

}


/>


</div>







<select

className="
border
rounded-xl
px-3
"


onChange={e=>

cambiar(
"programa",
Number(e.target.value)
)

}

>


<option value="">
Programa
</option>



{
seedProgramas.map(p=>(

<option
key={p.id}
value={p.id}
>

{p.nombre}

</option>


))

}



</select>







<select

className="
border
rounded-xl
px-3
"


onChange={e=>

cambiar(
"deporte",
Number(e.target.value)
)

}

>


<option value="">
Deporte
</option>



{
seedDeportes.map(d=>(

<option
key={d.id}
value={d.id}
>

{d.nombre}

</option>


))

}



</select>








<select

className="
border
rounded-xl
px-3
"


onChange={e=>

cambiar(
"etapa",
Number(e.target.value)
)

}

>


<option value="">
Etapa
</option>



{
seedEtapas.map(e=>(

<option
key={e.id}
value={e.id}
>

{e.nombre}

</option>


))

}



</select>









<select

className="
border
rounded-xl
px-3
"


onChange={e=>

cambiar(
"enfoque",
Number(e.target.value)
)

}

>


<option value="">
Enfoque
</option>



{
seedEnfoques.map(e=>(

<option
key={e.id}
value={e.id}
>

{e.nombre}

</option>


))

}



</select>








<select

className="
border
rounded-xl
px-3
"


onChange={e=>

cambiar(
"estado",
e.target.value
)

}

>


<option value="">
Estado
</option>


<option>
Activo
</option>


<option>
Inactivo
</option>


</select>





</div>







</div>


)


}