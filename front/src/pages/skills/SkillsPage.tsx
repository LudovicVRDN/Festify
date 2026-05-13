import { useEffect, useState } from "react";
import TornEdge from "../../components/TornEdge";
import type { ISkill } from "../../types/skill.type";
import api from "../../api/axios.instance";
import Button from "../../components/ui/button";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { ISkillsInput } from "../../types/inputsForm.interface";

interface ISkillProps {
  id: number | undefined;
}
const SkillsPage = ({ id }: ISkillProps) => {
  const [skills, setSkills] = useState<ISkill[] | null>(null);
  

  const fetchSkills = async () => {
    try {
      const skillDB = await api.get<ISkill[]>(
        `http://localhost:3000/user/${id}/skills`,
      );
    setSkills(skillDB.data);
    
    } catch (error) {
      console.error("Erreur lors de la récupération:", error);
    }
  };
  useEffect(() => {
    fetchSkills();
  }, []);

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
      await api.post(`http://localhost:3000/skills`, data);
      
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
    <div>
      <TornEdge position="top" />
      <section className="bg-black flex flex-col gap-5 ">
        <h1 className="font-metal text-4xl text-festify-red  text-center ">
          Tes compétences
        </h1>
        <p className="text-lg lg:text-xl  text-center tracking-widest wrap-break-word ">
          Ici tu peux lister et mettre à jour tout ce que tu sais mieux faire
          que personne !{" "}
        </p>
        <div className="m-auto w-60">
          <Button textButton="Ajouter une compétence" variant="grey" />
        </div>
        <form className="lg:w-200 w-80 m-auto mt-5 bg-neutral-900 p-4 rounded-4xl">
          {skillInput.map((field) => {
            const fieldError = field.name
              .split(".")
              .reduce((obj: any, key: string) => obj?.[key], errors);
            return (
              <div key={field.name} className="flex flex-col mb-5 ">
                <label className="text-zinc-300 text-xs tracking-widest uppercase mb-2 mt-2">
                  {field.label}
                </label>

                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  className="bg-transparent border-b border-zinc-700 focus:border-red-700 outline-none py-2 text-white placeholder:text-zinc-600 transition-colors"
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
          <Button
            variant="grey"
            textButton="Valider"
            onClick={handleSubmit(handleForm)}
          />
        </form>
        <ul className="lg:w-200 w-80 m-auto mt-5">
          {skills?.map((skill) => {
            return (
              <li className="bg-transparent border-b border-zinc-700 outline-none pt-2 pb-2 lg:pb-4 tracking-widest ">
                <p>{`${skill.name}`}</p>
                <p>{`${skill.description}`}</p>
              </li>
            );
          })}
        </ul>
      </section>
      <TornEdge position="bottom" />
    </div>
  );
};

export default SkillsPage;
