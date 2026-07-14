import { forwardRef, useImperativeHandle, useRef } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { IFestival } from "../types/festival.type";
import type { IMission } from "../types/misison.type";
import api from "../api/axios.instance";
import { getMissionsInputs, getUpdateMissionsInputs } from "../utils/getMissionInputs";
import Button from "./ui/button";


export type MissionEditModalHandle = {
    open: (mission: IMission) => void;
};

type Props = {
    festivalId: string;
    festivals?: IFestival[];
};

const MissionEditModal = forwardRef<MissionEditModalHandle, Props>(
    ({ festivalId, festivals }, ref) => {
        const dialogRef = useRef<HTMLDialogElement>(null);
        const selectedMissionId = useRef<number | undefined>(null);
        const queryClient = useQueryClient();

        const {
            register,
            handleSubmit,
            reset,
            getValues,
            formState: { errors },
        } = useForm<IMission>({ mode: "onChange" });

        const mutation = useMutation({
            mutationFn: (updatedMission: IMission) =>
                api.patch(
                    `http://localhost:3000/missions/${festivalId}/mission/${selectedMissionId.current}`,
                    updatedMission
                ),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["missions"] });
                dialogRef.current?.close();
                reset();
            },
            onError: (error) => console.error("Erreur mission :", error),
        });

        useImperativeHandle(ref, () => ({
            open: (mission: IMission) => {
                selectedMissionId.current = mission.id;
                reset(mission);
                dialogRef.current?.showModal();
            },
        }));

        const onSubmit: SubmitHandler<IMission> = (formData) => {
            mutation.mutate(formData);
        };

        const missionInputs = getUpdateMissionsInputs(getValues, festivals);

        return (
            <dialog ref={dialogRef} className="modal">
                <div className="modal-box bg-black border border-festify-glassred">
                    <h3 className="font-bold text-lg">Modifie Ta Mission</h3>
                    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
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
                                            <option value="" className="bg-neutral-700">{field.placeholder}</option>
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
                                            defaultValue={field.value}
                                            className="bg-transparent border-b border-zinc-700 focus:border-red-700 outline-none py-2 text-white placeholder:text-zinc-600 transition-colors"
                                            {...register(
                                                field.name,
                                                field.type === "number"
                                                    ? { ...field.rules, valueAsNumber: true }
                                                    : field.rules
                                            )}
                                        />
                                    )}
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

export default MissionEditModal;