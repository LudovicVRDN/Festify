import TornEdge from "../../components/TornEdge"
import type { IFestival } from "../../types/festival.type"
import { useNavigate, useParams } from "react-router";
import api from "../../api/axios.instance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Modal from "../../components/ui/modal";
import type { IMission } from "../../types/misison.type";
import MissionListCard from "../../components/MissionListCard";
import { useAuthStore } from "../../stores/auth.store";

const FestivalDetailPage = () => {
    const role = useAuthStore((state) => state.user?.role);
    const userId = useAuthStore((state) => state.user?.id);
    const params = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {
        data,
        isPending,
        error
    } = useQuery<IFestival>({
        queryKey: ['festival', params.festivalId],
        queryFn: () => api.get(`/festival/${params.festivalId}`).then(r => r.data)
    });

    const {
        data: missions,
        isPending: missionsIsPending,
        error: errorsMissions
    } = useQuery<IMission[]>({
        queryKey: ['missions', params.festivalId],
        queryFn: () => api.get(`/missions/${params.festivalId}`).then(r => r.data)
    });

    const {
        mutate: registerMission,
        isPending: inscriptionIsPending,
        error: inscriptionError
    } = useMutation({
        mutationFn: async (missionId: number) => {
            const res = await api.post(`/missions/${missionId}/inscription`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['missions'] });
        },
    });

    if (isPending || missionsIsPending) return <span>Loading...</span>;
    if (error || errorsMissions) return <Modal buttonText="Un soucis" message="Aie c'est cassé" onClick={() => navigate('/')} />;

    if (!data) {
        navigate('/notFound');
        return null;
    }

    return (
        <div className="bg-metal-dark bg-metal-grid min-h-screen">
            <div className="md:w-150 lg:w-200 m-auto py-15">
                <p className="text-center line-title text-lg text-red-hot font-metal pb-2">
                    Festival {data.name}
                </p>
                <h1 className="font-metal text-4xl lg:text-6xl text-center mb-5">
                    Tout ce qu'il faut savoir
                </h1>
                <p className="text-neutral-500 text-center text-lg font-metal">
                    Gère tes évenements Rock & Metal
                </p>
            </div>
            <div>
                <TornEdge position="top" />
                <article className="bg-black flex flex-col lg:flex-row items-center justify-center gap-4">
                    <div className="flex flex-col justify-center items-center gap-4">
                        <h1 className="font-metal text-festify-red text-5xl text-center">{`${data.name}`}</h1>
                        <article className="p-5">
                            <ul className="flex flex-col gap-5 items-center">
                                <li className="text-zinc-300 text-lg md:text-2xl tracking-widest uppercase">
                                    Ton festival a lieu à {`${data.adress.city}`}
                                </li>
                                <li className="text-zinc-300 text-lg md:text-2xl tracking-widest uppercase">
                                    L'adresse exacte: {`${data.adress.street} ${data.adress.postalCode}`}
                                </li>
                                <li className="text-zinc-300 text-lg md:text-2xl tracking-widest uppercase">
                                    Il commence le {`${data.start_date.split("T")[0]}`}
                                </li>
                                <li className="text-zinc-300 text-lg md:text-2xl tracking-widest uppercase">
                                    Il finit le {`${data.end_date?.split("T")[0]}`}
                                </li>
                            </ul>
                        </article>
                    </div>

                    <div className="flex flex-col items-center gap-5">
                        <h2 className="font-metal text-festify-red text-5xl text-center">Les missions de ton festival :</h2>

                        <ul>
                            {missions
                                ?.filter((mission) => !mission.inscription?.some((i) => i.user_id === userId))
                                .map((mission) => (
                                    <MissionListCard
                                        key={mission.id}
                                        mission={mission}
                                        button={false}
                                        modify={false}
                                        role={role!}
                                        handleRegister={() => registerMission(mission.id!)}
                                    />
                                ))}
                        </ul>
                    </div>
                </article>
                <TornEdge position="bottom" />
            </div>
        </div>
    );
};

export default FestivalDetailPage;