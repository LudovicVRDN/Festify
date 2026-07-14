import { useEffect, useState } from "react";
import TornEdge from "../../components/TornEdge";
import type { ISkill } from "../../types/skill.type";
import api from "../../api/axios.instance";
import Button from "../../components/ui/button";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { ISkillsInput } from "../../types/inputsForm.interface";
import Modal from "../../components/ui/modal";
import { Link, Navigate, useNavigate, useParams } from "react-router";
import SkillsListCard from "../../components/SkillsListCard";

interface ISkillProps {
  id: number | undefined;
}
const SkillsPage = ({ id }: ISkillProps) => {
  const [skills, setSkills] = useState<ISkill[] | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const params = useParams();

  const navigate = useNavigate();

  const fetchSkills = async () => {
    try {
      const skillDB = await api.get<ISkill[]>(
        `/user/${id}/skills`,
      );
      setSkills(skillDB.data);
      console.log(skillDB);
    } catch (error) {
      console.error("Erreur lors de la récupération:", error);
    }
  };
  useEffect(() => {
    fetchSkills();
  }, []);

  const handleClick = async (id: number) => {
    try {
      console.log("Data supprimée");
      await api.delete(`/skills/${id}/delete`);
    } catch (error) {
      console.error("Erreur lors de la récupération:", error);
    }
    fetchSkills();
  };

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
      await api.post(`/skills`, data);
      await fetchSkills();
      reset();
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  const skillInput: ISkillsInput[] = [
    {
      name: "name",
      label: "Compétence",
      placeholder: "Compétence",
      type: "text",
      rules: { required: "Compétence requise" },
    },
    {
      name: "description",
      label: "Description",
      placeholder: "Description",
      type: "text",
      rules: { required: "Description requise" },
    },
  ];
  return (
    <div className="bg-metal-dark bg-metal-grid min-h-screen">
      <div className="md:w-150 lg:w-200  m-auto py-15">
        <p className="text-center line-title text-xl text-red-hot font-metal pb-2">
          Festival Volunteer
        </p>
        <h1 className="font-metal text-4xl lg:text-6xl text-center mb-5">
          Montre à tout les organisateurs de quoi tu es capable !
        </h1>
      </div>
      <TornEdge position="top" />
      <section className="bg-black flex flex-col gap-5 p-2">
        <h1 className="font-metal text-4xl text-festify-red  text-center ">
          Tes compétences
        </h1>
        <p className="text-lg lg:text-xl  text-center tracking-widest wrap-break-word ">
          Ici tu peux lister et mettre à jour tout ce que tu sais mieux faire
          que personne !{" "}
        </p>
        <div className="m-auto ">
          <Button
            textButton={isVisible ? "Annuler" : "Ajouter une compétence"}
            variant="grey"
            onClick={() => setIsVisible(!isVisible)}
          />
        </div>
        {isVisible && (
          <form
            className={`clipped-card w-200 relative flex flex-col items-center gap-4
      p-4 mb-2 transition-colors border-red-700
      bg-[#111] hover:bg-[#161616]
      border-l-2 m-auto`}
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
                    placeholder={field.placeholder}
                    className="bg-transparent border-b border-zinc-700 focus:border-red-700 outline-none py-2 text-white placeholder:text-zinc-600 transition-colors "
                    {...register(field.name, field.rules)}
                  />

                  {fieldError && (
                    <p className="text-red-500 text-xs italic mt-2 ml-2">
                      {fieldError.message}
                    </p>
                  )}
                </div>
              );
            })}
            <Button
              variant="grey"
              textButton="Valider"
              onClick={handleSubmit(handleForm)}
            />
          </form>
        )}
        <ul className="lg:w-200 w-80 m-auto mt-5">
          {skills?.map((skill) => {
            console.log("Mon objet skill :", skill);
            return (
              <SkillsListCard
                name={skill.name}
                id={skill.id}
                descritpion={skill.description}
                showMore={() => navigate(`/skills/${skill.id}/details`)}
                handleDelete={() => handleClick(skill.id)}
              />
            );
          })}
        </ul>
      </section>
      <TornEdge position="bottom" />
    </div>
  );
};

export default SkillsPage;
