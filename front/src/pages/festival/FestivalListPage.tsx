import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useNavigate, useParams } from 'react-router';
import type { IFestival } from '../../types/festival.type';
import api from '../../api/axios.instance';
import Modal from '../../components/ui/modal';
import TornEdge from '../../components/TornEdge';
import Button from '../../components/ui/button';

const FestivalListPage = () => {
    const navigate = useNavigate();
    const params = useParams();
    

    const { data, isPending, error } = useQuery<IFestival[]>({
        queryKey: ['festival', params.festivalId],
        queryFn: () => api.get(`http://localhost:3000/user/festival`).then(r => r.data)
    })

    if (isPending) return <span>Loading...</span>
    if (error) return <Modal buttonText="Un soucis" message="Aie c'est cassé" onClick={() => navigate('/')} />

    return (
        <div>
            <h1 className="font-metal text-xl text-festify-red lg:text-4xl  text-center ">Mes Festivals</h1>
            <TornEdge position='top'/> 
            <article className="bg-black flex flex-col items-center gap-4 justify-center">
                {data?.map((festival) => (
                    <div key={festival.id} className="w-3/4 lg:h-30 flex  flex-col justify-between items-center bg-transparent border-b border-zinc-700  py-2 text-white " >
                        <h2 className="text-2xl text-festify-red font-bold mb-2">{festival.name}</h2>
                        <p className="text-gray-300 mb-1">Date de début:  Date:{festival.start_date.split("T")[0]}</p>
                        <p className="text-gray-300 mb-1">Date de fin: {festival.end_date?.split("T")[0]}</p>
                        <p className="text-gray-300 mb-1">
                            Adresse: {festival.adress.street}
                        </p>
                        <p className="text-gray-300 mb-1">
                            {festival.adress.city}, {festival.adress.postalCode}
                        </p>
                        <div className="flex flex-col lg:flex-row gap-4 mt-2">
                            <Button textButton="Plus de détails" variant='grey' onClick={() => navigate(`/festival/${festival.id}/details`)} />
                            
                        </div>
                    </div>
                ))}
            </article>
            <TornEdge position='bottom'/>
        </div>
    )
}

export default FestivalListPage