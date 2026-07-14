import React, { useEffect, useState } from "react";
import TornEdge from "../../components/TornEdge";
import { Fade } from "react-awesome-reveal";
import Modal from "../../components/ui/modal";
import type { ISkill } from "../../types/skill.type";
import api from "../../api/axios.instance";
import { Link, useNavigate, useParams } from "react-router";
import Button from "../../components/ui/button";
import type { ISkillsInput } from "../../types/inputsForm.interface";
import { useForm, type SubmitHandler } from "react-hook-form";
import SkillsListCard from "../../components/SkillsListCard";
import MissionIcon from "../../components/MissionIcon";

interface skillDetailsProps {
  id: number | undefined;
}

const SkillDetailPage = () => {
  const [skill, setSkill] = useState<ISkill>();
  const [isForm, setIsForm] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const skillInput: ISkillsInput[] = [
    {
      name: "name",
      label: "Compétence",
      placeholder: `${skill?.name}`,
      type: "text",
      value: `${skill?.name}`,
      rules: { required: "Compétence requise" },
    },
    {
      name: "description",
      label: "Description",
      placeholder: `${skill?.description}`,
      type: "text",
      value: `${skill?.description}`,
      rules: { required: "Description requise" },
    },
  ];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ISkill>({
    mode: "onChange",
  });

  const handleForm: SubmitHandler<ISkill> = async (data: ISkill) => {
    try {
      const skillDB = await api.patch<ISkill>(
        `/skills/${params.skillId}/update`,
        data,
      );
      console.log(skillDB);
      setSkill(skillDB.data);
      setIsForm(false);
      reset();
    } catch (error) {
      console.error("Erreur lors de la récupération:", error);
    }
  };

  const fetchSkill = async () => {
    try {
      const skillDB = await api.get<ISkill>(
        `/user/${params.skillId}/skills/details`,
      );
      console.log(skillDB);
      setSkill(skillDB.data);
    } catch (error) {
      console.error("Erreur lors de la récupération:", error);
    }
  };
  const deleteSkill = async () => {
    try {
      console.log("Data supprimée");
      await api.delete(`/skills/${params.skillId}/delete`);
      navigate(`/skills/${params.skillId}`);
    } catch (error) {
      console.error("Erreur lors de la récupération:", error);
    }
  };
  useEffect(() => {
    fetchSkill();
  }, []);

  return (
    <div className="bg-metal-dark bg-metal-grid min-h-screen">
      <div className="md:w-150 lg:w-200  m-auto py-15">
        <p className="text-center line-title text-xl text-red-hot font-metal pb-2">
          Festival Volunteer
        </p>
        <h1 className="font-metal text-4xl lg:text-6xl text-center mb-5">
          Mets à jour ta compétence !
        </h1>
      </div>
      <TornEdge position="top" />
      <section className="bg-black flex flex-col lg:flex-row items-center gap-5 justify-center">
        {!isForm && (
          <section className="bg-black flex flex-col items-center gap-5">
            <h1 className="font-metal text-4xl text-festify-red lg:text-4xl text-center ">{`Ta compétence`}</h1>
            <Fade direction="down" delay={500}>
              <div
                className={`clipped-card w-90 lg:w-200 relative flex flex-col md:flex-row items-center gap-4
                p-4 mb-2 transition-colors border-red-700
                bg-[#111] hover:bg-[#161616]
                border-l-2 `}
              >
                <div className="flex gap-5">
                  <div className="clipped-icon w-10 h-10 flex items-center justify-center bg-[#1e0808] border border-[#2f1010] shrink-0">
                    <MissionIcon className={`w-5 h-5 $`} />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-lg">Compétence: {skill?.name}</p>
                    <p className="text-lg">Description: {skill?.description}</p>
                  </div>
                </div>

                <div className="flex flex-col  gap-2 shrink-0 lg:ml-auto">
                  <Button
                    textButton="Modifie ta compétence"
                    variant="grey"
                    onClick={() => setIsForm(true)}
                  />
                  <Modal
                    buttonText="Supprimer la compétence"
                    message="Est-tu sur de vouloir supprimer cette compétence ?"
                    onClick={() => deleteSkill()}
                  />
                </div>
              </div>
            </Fade>
          </section>
        )}
        {isForm && (
          <Fade direction="left" delay={500}>
            <form
              className={`clipped-card w-200 relative flex flex-col items-center gap-4
      p-4 mb-2 transition-colors border-red-700
      bg-[#111] hover:bg-[#161616]
      border-l-2 `}
            >
              {skillInput.map((field) => {
                const fieldError = field.name
                  .split(".")
                  .reduce((obj: any, key: string) => obj?.[key], errors);
                return (
                  <div key={field.name} className="flex flex-col mb-5 w-full ">
                    <label className="text-zinc-300 text-xs tracking-widest uppercase mb-2 mt-2">
                      {field.label}
                    </label>

                    <input
                      type={field.type}
                      defaultValue={field.value}
                      placeholder={field.placeholder}
                      className="bg-transparent border-b border-zinc-700 focus:border-red-700 outline-none py-2 text-white placeholder:text-zinc-600 transition-colors "
                      {...register(field.name, field.rules)}
                    />

                    {/* L'erreur s'affiche de la même façon pour les deux ! */}
                    {fieldError && (
                      <p className="text-red-500 text-xs italic mt-2 ml-2">
                        {fieldError.message}
                      </p>
                    )}
                  </div>
                );
              })}
              <div className="flex gap-10">
                <Button
                  variant="grey"
                  textButton="Valider"
                  onClick={handleSubmit(handleForm)}
                />
                <Button
                  textButton="Annuler"
                  variant="red"
                  onClick={() => setIsForm(false)}
                />
              </div>
            </form>
          </Fade>
        )}
      </section>
      <TornEdge position="bottom" />
    </div>
  );
};

export default SkillDetailPage;
