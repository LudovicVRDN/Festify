
import TornEdge from "../../components/TornEdge"
import type { IFestival, IUpdateFestival } from "../../types/festival.type"
import { useNavigate, useParams } from "react-router";
import api from "../../api/axios.instance";
import { useMutation, useQuery, useQueryClient, QueryClient } from "@tanstack/react-query";
import Modal from "../../components/ui/modal";
import photo from "../../assets/photo8.jpg"
import Button from "../../components/ui/button";
import { useRef } from "react";
import type { IFestivalInput } from "../../types/inputsForm.interface";
import { useForm, type SubmitHandler } from "react-hook-form";

const FestivalDetailPage = () => {
  const params = useParams();
  const modalRef = useRef<HTMLDialogElement>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const { data, isPending, error } = useQuery<IFestival>({
    queryKey: ['festival', params.festivalId],
    queryFn: () => api.get(`http://localhost:3000/user/${params.festivalId}/festival/details`).then(r => r.data)
  })

  const mutation = useMutation({
    mutationFn: (updatedData: IUpdateFestival) => {
      return api.patch(`http://localhost:3000/festival/${params.festivalId}`, updatedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['festival', params.festivalId] });
    },
    onError: (error:any) => {
      console.error("Erreur lors de la modification :", error);
    }
  });
  
  const festivalInput: IFestivalInput[] = [
    {
      name: "name",
      label: "Nom du festival",
      placeholder: "Nom du festival",
      value: `${data?.name}`,
      type: "text",
      rules: { required: "Rentre le nom du festival !" },
    },

    {
      name: "adress.street",
      label: "Adresse du festival",
      placeholder: "Adresse du festival",
      value: `${data?.adress.street}`,
      type: "text",
      rules: { required: "L'adresse du festival est requise" },
    },
    {
      name: "adress.city",
      label: "Ville du festival",
      placeholder: "Ville du festival",
      value: `${data?.adress.city}`,
      type: "text",
      rules: { required: "La ville du festival est requise" },
    },
    {
      name: "adress.postalCode",
      label: "Code Postal",
      placeholder: "Code Postal",
      value: `${data?.adress.postalCode}`,
      type: "text",
      rules: { required: "Le Code Postal est requis" },
    },
    {
      name: "start_date",
      label: "Date de début",
      placeholder: "Date de début",
      value: `${data?.start_date?.split("T")[0]}`,
      type: "date",
      rules: { required: "La date de début est requise" },
    },
    {
      name: "end_date",
      label: "Date de fin",
      placeholder: "Date de fin",
      value: `${data?.end_date?.split("T")[0]}`,
      type: "date",
      rules: { required: "La date de fin est requise" },
    },
  ];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFestival>({
    mode: "onChange",
  });

  const handleForm: SubmitHandler<IFestival> = async (formData: IFestival) => {
    try {
      mutation.mutate(formData);

      reset();
      modalRef.current?.close();
    } catch (error) {
      console.error("Error updating festival:", error);
    }
  };
  const deleteFestival = async () => {
    try {
      await api.delete(`http://localhost:3000/festival/${params.festivalId}`);
      navigate('/');
    } catch (error) {
      console.error("Error deleting festival:", error);
    }
  };

  if (isPending) return <span>Loading...</span>
  if (error) return <Modal buttonText="Un soucis" message="Aie c'est cassé" onClick={() => navigate('/')} />

  if (!data) {
    navigate('/notFound');
    return null
  }
  return (
    <div >
      <img src={`${photo}`} className="w-full h-[300px] lg:h-[1000px]" />
      <div className="relative lg:-translate-y-110 -translate-y-25">
        <TornEdge position="top" />
        <article className="bg-black flex flex-col items-center gap-4 justify-center">

          <h1 className="font-metal text-xl text-festify-red md:text-6xl  text-center ">{`${data.name}`}</h1>
          <article className=" w-90 md:w-150 lg:w-225 xl:w-300 p-5">
            <ul className="flex flex-col gap-5 items-center">
              <li className="text-zinc-300 text-xs md:text-2xl tracking-widest uppercase">Ton festival a lieu à {`${data.adress.city}`}</li>
              <li className="text-zinc-300 text-xs md:text-2xl tracking-widest uppercase">L'adresse exacte: {`${data.adress.street} ${data.adress.postalCode}`}</li>
              <li className="text-zinc-300 text-xs md:text-2xl tracking-widest uppercase">Il commence le {`${data.start_date.split("T")[0]}`}</li>
              <li className="text-zinc-300 text-xs md:text-2xl tracking-widest uppercase">Il finit le  {`${data.end_date?.split("T")[0]}`}</li>
            </ul>
          </article>

          <Button textButton="Modifier le festival" variant='grey' onClick={() => modalRef.current?.showModal()} />
          <Modal buttonText="Supprimer le festival" message="Êtes-vous sûr de vouloir supprimer ce festival ?" onClick={deleteFestival} />
          <dialog ref={modalRef} id="my_modal_1" className="modal">
            <div className="modal-box bg-black border border-festify-glassred  ">
              <h3 className="font-bold text-lg">Mot de passe oublié</h3>
              <p className="py-4">Entre ton adresse Email</p>
              <div>
                <form  className="flex flex-col gap-5" onSubmit={handleSubmit(handleForm)}>
                  {festivalInput.map((field) => {
                    const fieldError = field.name
                      .split(".")
                      .reduce((obj: any, key: string) => obj?.[key], errors);

                    return (
                      <div key={field.name} className="flex flex-col ">
                        <label className="text-zinc-300 text-xs tracking-widest uppercase mb-2">
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          defaultValue={field.value}
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
                  <Button variant="grey" textButton="Valider" />
                  <Button textButton="Annuler" variant="red" onClick={(e) =>{e.preventDefault(), modalRef.current?.close()}} />
                </form>
              </div>
            </div>
          </dialog>
        </article>
        <TornEdge position="bottom" />
      </div>
    </div>
  )


}

export default FestivalDetailPage
