import { useDraggable } from "@dnd-kit/core";


interface Props{
    elemento:any
}


export default function ElementoDraggable({elemento}:Props){


const {
    attributes,
    listeners,
    setNodeRef,
    transform

}=useDraggable({

    id: elemento.id,

    data: elemento

});



const style = {

transform: transform 
?
`translate3d(${transform.x}px, ${transform.y}px,0)`
:
undefined

}



return (

<div

ref={setNodeRef}

style={style}

{...listeners}

{...attributes}


className="
cursor-grab
bg-white
border
rounded-xl
p-3
flex
gap-3
items-center
shadow-sm
hover:shadow-md
transition
"


>


<span className="text-xl">
{elemento.icon}
</span>


<div>

<p className="font-medium">
{elemento.nombre}
</p>


{/* <small className="text-gray-400">
{elemento.tipo}
</small> */}


</div>


</div>


)

}