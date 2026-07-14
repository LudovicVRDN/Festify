import React, { useRef } from "react";
import TornEdge from "../../components/TornEdge";
import type {
  IInputChangePassword,
  IResetPassword,
} from "../../types/inputsForm.interface";
import { useForm, type SubmitHandler } from "react-hook-form";
import Button from "../../components/ui/button";
import api from "../../api/axios.instance";
import { useNavigate, useSearchParams } from "react-router";
import Slider from "../../components/Slider";
import Caroussel from "../../components/Caroussel";
import photo from '../../assets/photo10.jpg'

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams]= useSearchParams("token");
  const token = searchParams.get("token");

  const modalRef = useRef<HTMLDialogElement>(null);
  const handleConfirm = () => {
    navigate('/');
    modalRef.current?.close();
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IResetPassword>({
    mode: "onChange",
  });

  const handleResetPassword: SubmitHandler<IResetPassword> = async (
    data: IResetPassword,
  ) => {
    if (data.newPassword === data.confirmPassword) {
      const { confirmPassword, ...NewPassword } = data;
      try {
        console.log(NewPassword);
        await api.patch(`/user/reset-password/${token}`, NewPassword );
        modalRef?.current?.showModal()
      } catch (error: any) {
        console.log("Erreur :", error.response.status);
        alert(error.response.data.message || "Mot de passe incorrect");
      }
    }
  };

  const password = watch("newPassword");

  const resetPasswordInput: IInputChangePassword[] = [
    {
      name: "newPassword",
      label: "Mot de Passe",
      type: "password",
      placeholder: "Mot De Passe",
      rules: {
        required: "Mot de passe requis",
        minLength: { value: 8, message: "Trop court (8 min)" },
        validate: {
          hasUpperCase: (v: any) =>
            /[A-Z]/.test(v) || "Doit contenir une majuscule",
          hasLowerCase: (v: any) =>
            /[a-z]/.test(v) || "Doit contenir une minuscule",
          hasNumber: (v: any) => /[0-9]/.test(v) || "Doit contenir un chiffre",
          hasSpecial: (v: any) =>
            /[^A-Za-z0-9]/.test(v) || "Doit contenir un caractère spécial",
        },
      },
    },
    {
      name: "confirmPassword",
      label: "Confirmer le MDP",
      type: "password",
      placeholder: "Confirmer le mot de passe",
      rules: {
        required: "Veuillez confirmer le mot de passe",
        validate: (value: any) =>
          value === password || "Les mots de passe ne correspondent pas",
      },
    },
  ];
  if(token){
  return (
    <div>
      <Caroussel />
      <div className="relative w-full -translate-y-10">
      <TornEdge position="top" />
      <div className="bg-black flex flex-col lg:flex-row items-center justify-center gap-10 ">
        <form onSubmit={handleSubmit(handleResetPassword)}
        className="flex flex-col items-center justify-center gap-5">
          {resetPasswordInput.map((field) => {
            const fieldError = field.name
              .split(".")
              .reduce((obj: any, key: string) => obj?.[key], errors);
            return (
              <div className="flex flex-col items-center justify-center  ">
                <label className="text-zinc-300 text-xs tracking-widest uppercase ">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  className="bg-transparent border-b border-zinc-700 focus:border-red-700 outline-none py-2 text-white placeholder:text-zinc-600 transition-colors w-80"
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
          <Button variant="red" textButton="Valider" />
        </form>
          <img src={`${photo}`} className="lg:w-200 w-80 lg:ml-15" />
      </div>
       <dialog ref={modalRef} id="my_modal_1" className="modal">
            <div className="modal-box bg-black border border-festify-glassred  ">
              <h3 className="font-bold text-lg">Ton mot de passe a été réinitialisé</h3>
              <p className="py-4">File te connecter !!</p>
              <div>
                  <Button variant="grey" textButton="Valider" onClick={handleConfirm}/>
              </div>
            </div>
          </dialog>
      <TornEdge position="bottom" />
    </div>
    </div>
  );
}else{
   navigate('/');
}
}



export default ResetPassword;
