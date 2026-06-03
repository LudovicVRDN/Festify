import { useState } from "react"
import TornEdge from "../../components/TornEdge"
import type { IFestival } from "../../types/festival.type"
import { useNavigate, useParams } from "react-router";
import api from "../../api/axios.instance";
import { useQuery } from "@tanstack/react-query";
import Modal from "../../components/ui/modal";
import photo from "../../assets/photo8.jpg"

const FestivalDetailPage = () => {
  const params = useParams();
  
  const navigate = useNavigate()

  const {data , isPending , error} = useQuery<IFestival>({
    queryKey:['festival'],
    queryFn : () =>api.get(`http://localhost:3000/user/${params.festivalId}/festival/details`).then(r => r.data)
  })

  if(isPending) return <span>Loading...</span>
  if(error) return <Modal buttonText="Un soucis" message="Aie c'est cassé" onClick={() => navigate('/')}/>

  if(!data){
   navigate('/notFound');
   return  null
  } 
  return (
    <div >
      <img src={`${photo}`} className="w-full h-[300px] lg:h-[600px]"/>
      <div className="relative -translate-y-25">
      <TornEdge position="top" />
      <article className="bg-black flex flex-col items-center gap-4 justify-center">
        
        <h1 className="font-metal text-xl text-festify-red md:text-4xl  text-center ">{`${data.name}`}</h1>
           <article className=" w-90 md:w-150 lg:w-225 xl:w-300 p-5">
            <ul className="flex flex-col gap-5 items-center">
            <li className="text-zinc-300 text-xs md:text-base tracking-widest uppercase">Ton festival a lieu à {`${data.adress.city}`}</li>
            <li className="text-zinc-300 text-xs  md:text-base tracking-widest uppercase">L'adresse exacte: {`${data.adress.street} ${data.adress.postalCode}`}</li>
            <li className="text-zinc-300 text-xs  md:text-base tracking-widest uppercase">Il commence le {`${data.start_date}`}</li>
            <li className="text-zinc-300 text-xs  md:text-base tracking-widest uppercase">Il finit le  {`${data.end_date}`}</li>
            </ul>
           </article>

      </article>
      <TornEdge position="bottom" />
      </div>
    </div>
  )
  
  
}

export default FestivalDetailPage
