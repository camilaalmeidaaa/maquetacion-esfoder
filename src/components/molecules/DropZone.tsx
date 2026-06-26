import { useDroppable } from "@dnd-kit/core";
import { motion, AnimatePresence } from "framer-motion";


interface Props {

id:string;

title:string;

items:any;

onRemove?:(
    zona:string,
    index:number
)=>void;


onAddAll?:(
    zona:string
)=>void;


onClear?:(
    zona:string
)=>void;


}



export default function DropZone({

id,

title,

items,

onRemove,

onAddAll,

onClear


}:Props){



const {

setNodeRef,

isOver

}=useDroppable({

id

});





// convertir objeto único a array

const lista = Array.isArray(items)

?

items

:

items

?

[items]

:

[];







return (

<div

ref={setNodeRef}

className={`
bg-white
rounded-3xl
p-5
border
min-h-[120px]
transition-all

${

isOver

?

"border-lime-400 bg-lime-50"

:

"border-gray-200"

}

`}

>





<div className="
flex
justify-between
items-center
mb-4
">


<h3 className="
font-bold
">

{title}

</h3>





{

(
id==="programas"
||
id==="enfoque"
||
id==="etapas"
)

&&

<div className="flex gap-3">


<button

onClick={()=>onAddAll?.(id)}

className="

group

flex
items-center
gap-2


bg-[#FFD54F]

text-gray-800

font-semibold

text-xs


px-4
py-2


rounded-xl


shadow-sm


transition-all
duration-300


hover:shadow-md

hover:-translate-y-0.5

hover:bg-[#FFCA28]


"

>


<span

className="
text-base
transition-transform
duration-300
group-hover:scale-125
"

>

✨

</span>


Añadir todos


</button>







<button

onClick={()=>onClear?.(id)}

className="


group

flex
items-center
gap-2


bg-pink-100

text-pink-600


font-semibold

text-xs


px-4

py-2


rounded-xl


border

border-pink-200


shadow-sm


transition-all

duration-300


hover:bg-pink-200

hover:text-pink-700

hover:shadow-md

hover:-translate-y-0.5


"


>


<span

className="

text-base

transition-transform

duration-300

group-hover:rotate-12

"

>

🧹

</span>


Limpiar


</button>



</div>
}



</div>









<div className="
flex
flex-wrap
gap-3
">





<AnimatePresence>


{

lista.map((item:any,index:number)=>(


<motion.div


key={item.id}


initial={{

opacity:0,

scale:0.8

}}



animate={{

opacity:1,

scale:1

}}



exit={{

opacity:0,

scale:0.5,

x:50

}}



className="
flex
items-center
gap-3
bg-lime-100
px-4
py-2
rounded-xl
shadow-sm
"

>



<span className="text-xl">

{item.icon}

</span>




<span>

{item.nombre}

</span>






<button

onClick={()=>onRemove?.(id,index)}

className="
text-red-500
font-bold
hover:scale-125
transition
"

>

✕

</button>



</motion.div>



))


}



</AnimatePresence>





</div>





{

lista.length===0 &&

<p className="
text-gray-400
text-sm
">

Arrastra elementos aquí

</p>

}





</div>


)


}