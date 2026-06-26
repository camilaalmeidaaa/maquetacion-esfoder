import LineaCard from "./LineaCard";

import { seedLinea } from "../../services/seedLinea";


interface ListaLineasProps {
    onEditar: (linea:any)=>void;
}


export default function ListaLineas({
    onEditar
}:ListaLineasProps){


return (

<div className="
grid 
grid-cols-1 
md:grid-cols-3 
gap-6
">


{
seedLinea.map(linea=>(

<LineaCard

key={linea.id}

linea={linea}

onEditar={onEditar}

/>


))

}


</div>

)

}