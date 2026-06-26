import ElementoDraggable from "./ElementoDraggable";


export const catalogo = {


Programas:[

{
id:1,
nombre:"Programa Acuático",
icon:"🏊",
tipo:"programas"
},

{
id:2,
nombre:"Programa de Ruedas",
icon:"🛼",
tipo:"programas"
},

{
id:3,
nombre:"Programa Deportivas",
icon:"🏫",
tipo:"programas"
}

],



Deportes:[

{
id:4,
nombre:"Fútbol",
icon:"⚽",
tipo:"deporte"
},

{
id:5,
nombre:"Natación",
icon:"🏊",
tipo:"deporte"
},

{
id:6,
nombre:"Patinaje",
icon:"🛼",
tipo:"deporte"
}

],



Modalidades:[

{
id:7,
nombre:"Natación Rítmica",
icon:"🌊",
tipo:"modalidad"
},

{
id:8,
nombre:"Natación Aletas",
icon:"🦈",
tipo:"modalidad"
}


],



Enfoques:[

{
id:9,
nombre:"Formativo",
icon:"📘",
tipo:"enfoque"
},

{
id:10,
nombre:"Competitivo",
icon:"🏆",
tipo:"enfoque"
},

{
id:11,
nombre:"Recreativo",
icon:"🎮",
tipo:"enfoque"
}

],



Etapas:[


{
id:12,
nombre:"Natación Inicial",
icon:"1️⃣",
tipo:"etapas"
},

{
id:13,
nombre:"Natación Medio",
icon:"2️⃣",
tipo:"etapas"
},

{
id:14,
nombre:"Natación Avanzado",
icon:"3️⃣",
tipo:"etapas"
}


]


}



export default function CatalogoElementos(){


return (

<div className="
bg-gray-50
rounded-3xl
p-5
overflow-y-auto
h-[70vh]
">


<h2 className="font-bold text-xl mb-5">
Catálogo deportivo
</h2>


{
Object.entries(catalogo).map(
([categoria,items])=>(


<div
key={categoria}
className="mb-6"
>


<h3 className="
font-semibold
mb-3
text-gray-600">

{categoria}

</h3>



<div className="space-y-3">


{
items.map(item=>(


<ElementoDraggable

key={item.id}

elemento={item}

/>


))

}


</div>


</div>


)

)

}



</div>

)

}