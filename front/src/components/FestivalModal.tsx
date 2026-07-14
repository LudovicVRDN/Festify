import { forwardRef, useImperativeHandle, useRef } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { IFestival, IUpdateFestival } from "../types/festival.type";
import { getFestivalInputs } from "../utils/getFestivalInputs";
import Button from "./ui/button";
import api from "../api/axios.instance";


export type FestivalEditModalHandle = {
    open: (festival: IFestival) => void;
};

type Props = {
    festivalId: string;
};

const FestivalEditModal = forwardRef<FestivalEditModalHandle, Props>(
    ({ festivalId }, ref) => {
        const dialogRef = useRef<HTMLDialogElement>(null);
        const queryClient = useQueryClient();

        const {
            register,
            handleSubmit,
            reset,
            formState: { errors },
        } = useForm<IFestival>({ mode: "onChange" });

        const mutation = useMutation({
            mutationFn: (updatedData: IUpdateFestival) =>
                api.patch(`/festival/${festivalId}`, updatedData),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["festival", festivalId] });
                dialogRef.current?.close();
                reset();
            },
            onError: (error) => console.error("Erreur lors de la modification :", error),
        });

        useImperativeHandle(ref, () => ({
            open: (festival: IFestival) => {
                reset(festival);
                dialogRef.current?.showModal();
            },
        }));

        const onSubmit: SubmitHandler<IFestival> = (formData) => {
            mutation.mutate(formData);
        };

        const festivalInputs = getFestivalInputs();

        return (
            <dialog ref={dialogRef} className="modal">
                <div className="modal-box bg-black border border-festify-glassred">
                    <h3 className="font-bold text-lg">Modifie Ton Festival</h3>
                    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
                        {festivalInputs.map((field) => {
                            const fieldError = field.name
                                .split(".")
                                .reduce((obj: any, key: string) => obj?.[key], errors);

                            return (
                                <div key={field.name} className="flex flex-col">
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
                                    {fieldError && (
                                        <p className="text-red-500 text-xs italic mt-2 ml-2">{fieldError.message}</p>
                                    )}
                                </div>
                            );
                        })}
                        <Button variant="grey" textButton="Valider" />
                        <Button
                            textButton="Annuler"
                            variant="red"
                            onClick={(e) => {
                                e.preventDefault();
                                dialogRef.current?.close();
                            }}
                        />
                    </form>
                </div>
            </dialog>
        );
    }
);

export default FestivalEditModal;