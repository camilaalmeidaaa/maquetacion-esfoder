import { useState } from "react";
import { motion } from "framer-motion";


import ListaLineas from "../../components/molecules/ListaLineas";
import ConstructorLinea from "../../components/molecules/ConstructorLinea";



export default function LineaDeportivaPage(){



const [tab,setTab] = useState<"lineas" | "crear">(
    "lineas"
);



const [lineaActual,setLineaActual] = useState<any>(null);









// =========================
// EDITAR LINEA
// =========================


const editarLinea = (linea:any)=>{


    setLineaActual(linea);


    setTab("crear");


};









// =========================
// CREAR NUEVA LINEA
// =========================


const crearNuevaLinea = ()=>{


    setLineaActual(null);


    setTab("crear");


};









return (



<div className="flex min-h-screen bg-gray-50">






<main className="flex-1 p-8">






<header className="flex justify-between items-center mb-8">






<div>


<h1

className="
text-3xl
font-bold
text-gray-600
"

>

Gestión de Líneas Deportivas

</h1>





</div>









{/* TABS */}


<div

className="
bg-white
rounded-2xl
shadow-sm
p-1
flex
gap-1
"

>





<button


onClick={()=>setTab("lineas")}


className={`

px-6

py-2

rounded-xl

transition-all

duration-300


${

tab==="lineas"

?

"bg-lime-400 text-white shadow"

:

"text-gray-500 hover:bg-gray-100"

}

`}


>

Líneas

</button>









<button


onClick={crearNuevaLinea}


className={`

px-6

py-2

rounded-xl

transition-all

duration-300


${

tab==="crear"

?

"bg-lime-400 text-white shadow"

:

"text-gray-500 hover:bg-gray-100"

}

`}


>

Crear línea

</button>









</div>







</header>









<motion.div


key={tab}


initial={{

opacity:0,

y:20

}}



animate={{

opacity:1,

y:0

}}



transition={{

duration:0.3

}}



>







{

tab==="lineas"


?


<ListaLineas

onEditar={editarLinea}

/>



:



<ConstructorLinea

lineaEditar={lineaActual}

/>



}







</motion.div>









</main>






</div>



)


}