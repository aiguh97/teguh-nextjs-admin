import { useForm } from "react-hook-form";
import { Label, Select, TextInput, Textarea } from "flowbite-react";
import React, { useEffect, useState } from "react";
import addDocument from "@/services/firebase/crud/addDocument";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { updateDocument } from "@/services/firebase/crud/updateDocument";
import Button from "@/components/common/Button";

const SkillForm = ({ initialData, action }) => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [Loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(initialData || {});

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(e);
        setFormData({ ...formData, [name]: value });
    };


    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const { success, error } = action === 'create'
                ? await addDocument("skill", data)
                : await updateDocument("skill", initialData.id, data);

            const actionVerb = action === 'create' ? 'created' : 'updated';
            if (success) {
                router.push("/skill");
                toast.success(`Data ${actionVerb} successfully`);
            } else {
                setLoading(false);
                toast.error(`Failed to ${actionVerb}`);
                console.error("Error:", error);
            }
        } catch (err) {
            setLoading(false);
            console.error("An error occurred:", err);
        } finally {
            setLoading(false);
        }

    };

    useEffect(() => {
        Object.entries(initialData || {}).forEach(([key, value]) => {
            setValue(key, value);
        });
    }, [initialData, setValue]);

    return (
        <div className="card p-2">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex sm:gap-4 justify-center flex-col sm:flex-row">
                    <div className="w-full mb-4">
                        <div className="mb-2 block">
                            <Label htmlFor="name" value="Name" />
                        </div>
                        <TextInput
                            onChange={handleChange}
                            {...register("name", { required: true })}
                        />
                        {errors.name && <span className="text-sm">This field is required</span>}
                    </div>
                    <div className="w-full mb-4">
                        <div className="mb-2 block">
                            <Label htmlFor="order" value="Order" />
                        </div>
                        <TextInput
                            onChange={handleChange}
                            type="number"
                            {...register("order", { required: true })}
                        />
                        {errors.order && <span className="text-sm">This field is required</span>}
                    </div>
                </div>
                <div className=" mb-6">
                    <div className="mb-2 block">
                        <Label htmlFor="type" value="Select Type" />
                    </div>
                    <Select id="type" onChange={handleChange} {...register("type", { required: true })} defaultValue="">
                        <option value="" disabled hidden>Choose type</option>
                        <option value="frontend">Front-end</option>
                        <option value="backend">Back-end</option>
                        <option value="utility">Utility</option>
                    </Select>
                    {errors.type && <span className="text-sm">This field is required</span>}
                </div>
                <div className=" mb-6">
                    <div className="mb-2 block">
                        <Label htmlFor="icon" value="SVG Icon" />
                    </div>
                    <Textarea
                        className="h-20 scrollbar-hide"
                        onChange={handleChange}
                        {...register("icon", { required: true })}
                    />
                    {errors.icon && <span className="text-sm">This field is required</span>}
                </div>
                <div className="flex mb-2 justify-end">
                    <Button isLoading={Loading} className="!w-full mb-3" type="submit">
                        Save
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SkillForm;
