import { useState } from "react";

import {
    DndContext,
    DragEndEvent
} from "@dnd-kit/core";


import { catalogo } from "./CatologoElementos";
import CatalogoElementos from "./CatologoElementos";
import DropZone from "./DropZone";



export default function ConstructorLinea(){


const [linea,setLinea] = useState<any>({

    programas:[],
    deporte:null,
    modalidad:null,
    enfoque:null,
    etapas:[]

});






// =========================
// DRAG AND DROP
// =========================

const handleDragEnd = (event:DragEndEvent)=>{


    const elemento:any =
    event.active.data.current;


    const zona:any =
    event.over?.id;



    if(!elemento || !zona){

        return;

    }




    // Validar zona correcta

    if(elemento.tipo !== zona){


        alert(
            "No puedes agregar este elemento aquí"
        );


        return;

    }






    // Solo un deporte

    if(
        zona==="deporte"
        &&
        linea.deporte
    ){


        alert(
            "Solo puedes seleccionar un deporte"
        );


        return;

    }







    // Solo una modalidad

    if(
        zona==="modalidad"
        &&
        linea.modalidad
    ){


        alert(
            "Solo puedes seleccionar una modalidad"
        );


        return;

    }







    // Solo un enfoque

    if(
        zona==="enfoque"
        &&
        linea.enfoque
    ){


        alert(
            "Solo puedes seleccionar un enfoque"
        );


        return;

    }







    setLinea((prev:any)=>({


        ...prev,



        [zona]:

        zona==="programas"
        ||
        zona==="etapas"


        ?

        [

            ...prev[zona],

            elemento

        ]

        :

        elemento



    }));



};









// =========================
// AGREGAR TODOS
// =========================

const agregarTodos = (zona:string)=>{


const mapaCategorias:any = {


    programas:"Programas",

    enfoque:"Enfoques",

    etapas:"Etapas"


};



const categoria = mapaCategorias[zona];



if(!categoria){

    return;

}




setLinea((prev:any)=>({


    ...prev,


    [zona]:

    [...catalogo[categoria]]


}));



};









// =========================
// LIMPIAR ZONA
// =========================

const limpiarZona = (zona:string)=>{


setLinea((prev:any)=>({


    ...prev,


    [zona]:

    zona==="programas"
    ||
    zona==="etapas"


    ?

    []


    :

    null



}));


};









// =========================
// LIMPIAR TODO
// =========================

const limpiar = ()=>{


setLinea({


    programas:[],
    deporte:null,
    modalidad:null,
    enfoque:null,
    etapas:[]


});


};









// =========================
// ELIMINAR CARD
// =========================

const eliminarElemento = (

zona:string,

index:number

)=>{


setLinea((prev:any)=>{


const nuevoEstado = {

    ...prev

};




if(Array.isArray(nuevoEstado[zona])){


    nuevoEstado[zona] =

    nuevoEstado[zona].filter(
        (_:any,i:number)=> i !== index
    );


}

else{


    nuevoEstado[zona] = null;


}




return nuevoEstado;



});


};









return (


<DndContext

onDragEnd={handleDragEnd}

>


<div

className="
grid
grid-cols-4
gap-6
"

>



{/* ===================
    CONSTRUCTOR
==================== */}


<div

className="
col-span-3
space-y-5
"

>



<DropZone

id="programas"

title="Programas"

items={linea.programas}

onRemove={eliminarElemento}

onAddAll={agregarTodos}

onClear={limpiarZona}

/>







<DropZone

id="deporte"

title="Deporte"

items={linea.deporte}

onRemove={eliminarElemento}

/>







<DropZone

id="modalidad"

title="Modalidad principal"

items={linea.modalidad}

onRemove={eliminarElemento}

/>







<DropZone

id="enfoque"

title="Enfoque"

items={linea.enfoque}

onRemove={eliminarElemento}

onAddAll={agregarTodos}

onClear={limpiarZona}

/>







<DropZone

id="etapas"

title="Etapas"

items={linea.etapas}

onRemove={eliminarElemento}

onAddAll={agregarTodos}

onClear={limpiarZona}

/>









<div

className="
flex
justify-end
gap-4
mt-5
"

>


<button

className="
bg-lime-400
text-white
px-6
py-3
rounded-xl
"

>

Guardar línea

</button>





<button

onClick={limpiar}

className="
bg-gray-200
px-6
py-3
rounded-xl
"

>

Limpiar

</button>




</div>



</div>









{/* ===================
        CATALOGO
==================== */}



<div>


<CatalogoElementos/>


</div>





</div>



</DndContext>



)



}