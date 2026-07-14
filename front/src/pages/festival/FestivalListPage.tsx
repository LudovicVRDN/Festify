import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import type { IFestival } from "../../types/festival.type";
import api from "../../api/axios.instance";
import Modal from "../../components/ui/modal";
import TornEdge from "../../components/TornEdge";
import Button from "../../components/ui/button";
import { useAuthStore } from "../../stores/auth.store";
import FestivalListCard from "../../components/FestivalListCard";
import { getStatus } from "../../utils/getStatus";

const FestivalListPage = () => {
  const role = useAuthStore((state) => state.user?.role);
  const navigate = useNavigate();
  const params = useParams();
  const id = useAuthStore((state) => state.user?.id);

  const { data, isPending, error } = useQuery<IFestival[]>({
    queryKey: ["festival", params.festivalId],
    queryFn: () =>
      api.get(`http://localhost:3000/user/${id}/festival`).then((r) => r.data),
  });

  useEffect(() => {
    if (data) {
      const statuses = data.reduce<Record<string, string>>((acc, festival) => {
        acc[festival.id!] = getStatus(festival.start_date, festival.end_date);
        return acc;
      }, {});
    }
  }, []);

  if (isPending) return <span>Loading...</span>;
  if (error)
    return (
      <Modal
        buttonText="Un soucis"
        message="Aie c'est cassé"
        onClick={() => navigate("/")}
      />
    );

  return (
    <div className="bg-metal-dark bg-metal-grid min-h-screen">
      <div className="md:w-150 lg:w-200 m-auto pt-15">
        <p className="text-center line-title text-xl text-red-hot font-metal ">
          Festival Manager
        </p>
        <h1 className="font-metal  text-4xl   text-center pb-5 ">
          Mes Festivals
        </h1>
      </div>
      <TornEdge position="top" />
      <article className="bg-black flex flex-col items-center gap-4 justify-center ">
        <div className="min-w-[80%]">
          {data?.map((festival) => (
            <FestivalListCard
              name={festival.name}
              city={festival.adress.city}
              role={role!}
              date={festival.start_date}
              status={getStatus(festival.start_date, festival.end_date)}
            />
          ))}
        </div>
      </article>
      <TornEdge position="bottom" />
    </div>
  );
};

export default FestivalListPage;
