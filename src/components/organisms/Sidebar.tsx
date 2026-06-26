import { motion } from "motion/react";

import {
  LayoutDashboard,
  Layers,
  Dumbbell,
  Shuffle,
  Target,
  Users,
  UsersRound,
  ClipboardList,
  Zap,
  ChevronDown,
  Settings,
  ListTree,
  Gauge,
  Menu,
  X
} from "lucide-react";


import { useState } from "react";

import type { Section } from "../../types";




const gestionItems = [

{
id:"programas" as Section,
label:"Programas",
icon:<Layers size={15}/>
},

{
id:"deportes" as Section,
label:"Deportes",
icon:<Dumbbell size={15}/>
},

{
id:"modalidades" as Section,
label:"Modalidades",
icon:<Shuffle size={15}/>
},

{
id:"enfoques" as Section,
label:"Enfoques",
icon:<Target size={15}/>
},

{
id:"instructores" as Section,
label:"Instructores",
icon:<Users size={15}/>
},


{
id:"niveles" as Section,
label:"Niveles",
icon:<Target size={15}/>
},


{
id:"etapas" as Section,
label:"Etapas",
icon:<Target size={15}/>
},


{
id:"logros" as Section,
label:"Logros",
icon:<Target size={15}/>
},


{
id:"tematicas" as Section,
label:"Temáticas",
icon:<Target size={15}/>
},


{
id:"matriculas" as Section,
label:"Matrículas",
icon:<ClipboardList size={15}/>
}


];





const configuracionItems = [

{
id:"linea" as Section,
label:"Línea Deportiva",
icon:<ListTree size={15}/>
},


{
id:"cursos" as Section,
label:"Cursos",
icon:<Gauge size={15}/>
},


{
id:"grupos" as Section,
label:"Grupos",
icon:<UsersRound size={15}/>
}


];









function NavItem({

id,
label,
icon,
active,
onClick


}:{

id:Section;

label:string;

icon:React.ReactNode;

active:boolean;

onClick:()=>void;


}){


return(


<button


onClick={onClick}


className="

relative

w-full

flex

items-center

gap-2.5

px-3

py-2

rounded-xl

text-sm

"


>



{


active &&


<motion.div


layoutId="nav-pill"


className="

absolute

inset-0

rounded-xl

"


style={{

background:"var(--lime-dim)",

border:"1px solid var(--lime-border)"

}}


/>


}






<span

className="relative z-10"


style={{

color:active
?
"#3a7500"
:
"#9ca3af"

}}

>


{icon}


</span>







<span


className="

relative

z-10

flex-1

text-left

font-medium

"


style={{

color:active
?
"#1a3c00"
:
"#374151"

}}


>


{label}


</span>






{


active &&


<span


className="

relative

z-10

w-1.5

h-1.5

rounded-full

"


style={{

background:"var(--lime)"

}}


/>


}




</button>



)


}









export default function Sidebar({

active,

onChange


}:SidebarProps){





const [gestionOpen,setGestionOpen]=useState(true);


const [configOpen,setConfigOpen]=useState(true);


const [mobileOpen,setMobileOpen]=useState(false);






const gestionActive =

gestionItems.some(
i=>i.id===active
);



const configActive =

configuracionItems.some(
i=>i.id===active
);







function selectItem(id:Section){


onChange(id);


setMobileOpen(false);


}






return(



<>



{/* BOTON MOBILE */}



<button


onClick={()=>setMobileOpen(true)}


className="

md:hidden

fixed

top-4

left-4

z-50

bg-white

shadow

rounded-xl

p-3

"


>


<Menu size={20}/>


</button>








{/* OVERLAY */}



{


mobileOpen &&


<div


onClick={()=>setMobileOpen(false)}


className="

fixed

inset-0

bg-black/30

z-40

md:hidden

"

/>


}









<aside


className={`


fixed

left-0

top-0

h-screen

w-[220px]

flex

flex-col

border-r

z-50


transition-transform

duration-300



${

mobileOpen

?

"translate-x-0"

:

"-translate-x-full"

}



md:translate-x-0



`}


style={{

background:"var(--sidebar)",

borderColor:"var(--sidebar-border)"

}}



>








{/* CERRAR MOBILE */}


<button


onClick={()=>setMobileOpen(false)}


className="

md:hidden

absolute

right-4

top-4

text-gray-400

"


>


<X size={20}/>


</button>









{/* LOGO */}



<div


className="

flex

items-center

gap-2.5

px-4

py-4

border-b

"


>


<div


className="

w-8

h-8

rounded-xl

flex

items-center

justify-center

"


style={{

background:"var(--lime)"

}}

>


<Zap size={15}/>


</div>







<div>


<div className="text-sm font-bold">


ESFODER

<span

style={{
color:"#3a7500"
}}

>

Tech

</span>


</div>




<div className="text-[10px] text-muted-foreground">


Escuelas Deportivas


</div>



</div>



</div>









<nav


className="

flex-1

overflow-y-auto

py-3

px-2

"


>





<NavItem


id="dashboard"


label="Dashboard"


icon={<LayoutDashboard size={15}/>}


active={
active==="dashboard"
}


onClick={()=>selectItem("dashboard")}


/>











{/* GESTION */}



<div className="mt-3">


<button


onClick={()=>setGestionOpen(!gestionOpen)}


className="

w-full

flex

justify-between

items-center

px-3

py-2

"


style={{

color:gestionActive
?
"#3a7500"
:
"#9ca3af"

}}


>


<span className="

text-[10px]

uppercase

font-bold

tracking-widest

">


Gestión


</span>




<ChevronDown

size={12}

className={
gestionOpen
?
""
:
"-rotate-90"
}


/>


</button>








<motion.div


animate={{

height:gestionOpen
?
"auto"
:
0,


opacity:gestionOpen
?
1
:
0

}}


className="overflow-hidden"


>


{

gestionItems.map(item=>(


<NavItem


key={item.id}


{...item}


active={
active===item.id
}


onClick={()=>selectItem(item.id)}


/>


))


}



</motion.div>



</div>









{/* CONFIGURACION */}



<div className="mt-3 border-t pt-2">


<button


onClick={()=>setConfigOpen(!configOpen)}


className="

w-full

flex

justify-between

items-center

px-3

py-2

"


>


<span className="

text-[10px]

uppercase

font-bold

tracking-widest

flex

items-center

gap-2

">


<Settings size={13}/>


Configuración


</span>





<ChevronDown

size={12}

className={
configOpen
?
""
:
"-rotate-90"
}


/>


</button>










<motion.div


animate={{

height:configOpen
?
"auto"
:
0,


opacity:configOpen
?
1
:
0

}}


className="overflow-hidden"


>


{

configuracionItems.map(item=>(


<NavItem


key={item.id}


{...item}


active={
active===item.id
}


onClick={()=>selectItem(item.id)}


/>


))


}




</motion.div>




</div>







</nav>





</aside>



</>


)


}