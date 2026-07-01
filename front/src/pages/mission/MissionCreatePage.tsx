import { useState } from "react";
import TornEdge from "../../components/TornEdge";
import type { IMission, IMissionInputs } from "../../types/misison.type";
import Button from "../../components/ui/button";
import { useForm } from "react-hook-form";
import MissionListCard from "../../components/MissionListCard";
import { useAuthStore } from "../../stores/auth.store";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../../api/axios.instance";
import type { IFestival } from "../../types/festival.type";
import Modal from "../../components/ui/modal";
import { useNavigate } from "react-router";

const MissionCreatePage = () => {
  const [createdMissions, setCreatedMissions] = useState<IMission[]>([]);
  const id = useAuthStore((state) => state.user?.id);
  const navigate = useNavigate();

  const {
    data: festivals,
    isPending: isFestivalsPending,
    error: festivalsError
  } = useQuery<IFestival[]>({
    queryKey: ["festival", id],
    queryFn: async () => {
      const res = await api.get(`/user/${id}/festival`);
      return res.data;
    },
    enabled: !!id,
  });

  const { mutate, mutateAsync, isPending, error } = useMutation({
    mutationFn: async (mission: IMission) => {
      const res = await api.post(`/missions/${mission.festival.id}`, mission);
      console.log(res)
      return res.data;
    },

    onSuccess: () => {
      navigate('/')
    },
  });

  const handleValidate = async () => {
    try {
      await Promise.all(
        createdMissions.map((mission) => mutateAsync(mission))
      );
      setCreatedMissions([]);
    } catch (err) {
      console.error(err);
    }
  };




  const addToArray = (formData: IMission) => {
    const festival = festivals?.find((f) => f.id === Number(formData.festival));
    if (!festival) return;
    setCreatedMissions((prev) => [
      ...prev,
      { ...formData, festival },
    ]);
    reset({
      festival: formData.festival,
      title: "",
      description: "",
      time_start: "",
      time_end: "",
      volunteer_needed: 0
    });
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IMission>({
    mode: "onChange",
  });

  const removeMission = (indexToRemove: number) => {
    setCreatedMissions((prev) => prev.filter((_, i) => i !== indexToRemove));
  };



  const missionInputs: IMissionInputs[] = [
    {
      name: "festival",
      label: "Festival",
      placeholder: "Choisis un festival",
      type: "select",
      rules: { required: "Sélectionne un festival !" },
      options: festivals?.map((f) => ({ label: f.name, value: f.id as number })),
    },
    {
      name: "title",
      label: "Titre de la mission",
      placeholder: "Titre de la mission",
      type: "text",
      rules: { required: "Rentre le Titre de la mission !" },
    },
    {
      name: "description",
      label: "Description de la mission",
      placeholder: "Description de la mission",
      type: "text",
      rules: { required: "Rentre la Description de la mission !" },
    },
    {
      name: "time_start",
      label: "Début de la mission",
      placeholder: "Début de la mission",
      type: "date",
      rules: { required: "Rentre le Titre de la mission !" },
    },
    {
      name: "time_end",
      label: "Fin de la mission",
      placeholder: "Titre de la mission",
      type: "date",
      rules: { required: "Rentre le Titre de la mission !" },
    },
    {
      name: "volunteer_needed",
      label: "Nombre de volontaires nécéssaires",
      placeholder: "Nombre de volontaires nécéssaires",
      type: "number",
      rules: { required: "De combien de volontaires as-tu besoin?" },
    },
  ];

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
    <div className="bg-metal-dark bg-metal-grid min-h-screen flex flex-col items-center  ">
      <div className="md:w-150 lg:w-200  m-auto py-15">
        <p className="text-center line-title text-xl text-red-hot font-metal pb-2">
          Festival Manager
        </p>
        <h1 className="font-metal text-4xl lg:text-6xl text-center mb-5">
          Ajoute des missions à ton festival pour recruter des bénévoles !
        </h1>
        <p className="text-neutral-500 text-center text-lg font-metal">
          Gère tes évenements Rock & Metal
        </p>
      </div>
      <TornEdge position="top" />

      <div className="bg-black w-full flex flex-col lg:flex-row gap-5 items-center p-5 justify-center">
        <form
          onSubmit={handleSubmit(addToArray)}
          className={`clipped-card lg:w-170 lg:grid lg:grid-cols-2 lg:gap-x-10 relative flex flex-col gap-4 p-4 lg:p-8 mb-2 items-center transition-colors border-red-700 bg-[#111] hover:bg-[#161616] border-l-2 `}
        >
          {missionInputs.map((field) => {
            const fieldError = field.name
              .split(".")
              .reduce((obj: any, key: string) => obj?.[key], errors);

            return (
              <div key={field.name} className="flex flex-col">
                <label className="text-zinc-300 text-xs tracking-widest uppercase mb-2">
                  {field.label}
                </label>

                {field.type === "select" ? (
                  <select
                    className="bg-transparent border-b border-zinc-700 focus:border-red-700 outline-none py-2 text-white"
                    {...register(field.name, field.rules)}
                  >
                    <option value="" className=" bg-neutral-700">{field.placeholder}</option>
                    {field.options?.map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-neutral-700">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    className={`bg-transparent border-b border-zinc-700 focus:border-red-700 outline-none py-2 text-white placeholder:text-zinc-600 transition-colors ${field.type === "number" ? "w-24" : "w-65 "
                      }`}
                    {...register(
                      field.name,
                      field.type === "number"
                        ? { ...field.rules, valueAsNumber: true }
                        : field.rules
                    )}
                  />
                )}

                {fieldError && (
                  <p className="text-red-500 text-xs italic mt-2 ml-2">
                    {fieldError.message}
                  </p>
                )}
              </div>
            );
          })}

          <Button textButton="Créer" variant="red" />
        </form>
        {createdMissions.length > 0 && (
          <ul>
            {createdMissions.map((mission, index) => {
              return (
                <li key={index} data-key={index}>
                  <MissionListCard mission={mission} button={false} handleDelete={() => removeMission(index)} />
                </li>
              );
            })}
            <Button textButton="Valider" variant="red" onClick={() => handleValidate()} />
          </ul>
        )}
      </div>
      <TornEdge position="bottom" />
    </div>
  );
};

export default MissionCreatePage;
