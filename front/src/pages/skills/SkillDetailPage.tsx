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

interface skillDetailsProps {
  id: number | undefined;
}

const SkillDetailPage = ({ id }: skillDetailsProps) => {
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
      placeholder:  `${skill?.description}`,
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
        `http://localhost:3000/skills/${params.skillId}/update`,
        data
      );
      console.log(skillDB);
      setSkill(skillDB.data);
      setIsForm(false)
     reset()
    } catch (error) {
      console.error("Erreur lors de la récupération:", error);
    }
  };

  const fetchSkill = async () => {
    try {
      const skillDB = await api.get<ISkill>(
        `http://localhost:3000/user/${params.skillId}/skills/details`,
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
      await api.delete(`http://localhost:3000/skills/${params.skillId}/delete`);
      navigate(`/skills/${id}`);
    } catch (error) {
      console.error("Erreur lors de la récupération:", error);
    }
  };
  useEffect(() => {
    fetchSkill();
  }, []);

  return (
    <div>
      <TornEdge position="top" />
      <section className="bg-black flex flex-col lg:flex-row items-center gap-5 justify-center">
        {!isForm && (
          <section className="bg-black flex flex-col items-center gap-5">
            <h1 className="font-metal text-4xl text-festify-red lg:text-4xl text-center ">{`Ta compétence`}</h1>
            <Fade direction="down" delay={500}>
              <div className=" px-4 pb-2 flex flex-col lg:flex-row justify-center items-center  p-3">
                <div className="flex flex-col items-center w-60 lg:w-85 ">
                
                  <p className="bg-transparent border-b border-zinc-700 outline-none pt-2 pb-2 lg:pb-4 text-white ">
                    <span className="text-festify-red text-base lg:text-lg  tracking-widest uppercase">
                      Compétencé :
                    </span>{" "}
                    {` ${skill?.name}`}
                  </p>
                  <p className="bg-transparent border-b border-zinc-700 outline-none pt-2 pb-2 lg:pb-4 text-white ">
                    <span className="text-festify-red text-base lg:text-lg tracking-widest uppercase">
                      Description :
                    </span>
                    {` ${skill?.description}`}
                  </p>
                </div>
              </div>
              <div className=" flex flex-col gap-5 w-55">
                <Button
                  textButton="Modifie ta compétence"
                  variant="grey"
                  onClick={() => setIsForm(true)}
                />
                <Modal
                  buttonText="Supprimer la compétence"
                  message="Veux tu vraiment supprimer cette compétence ?"
                  onClick={() => {
                    deleteSkill();
                  }}
                />
              </div>
            </Fade>
          </section>
        )}
        {isForm && (
          <Fade direction="left" delay={500}>
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
