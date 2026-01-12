import { useForm } from "react-hook-form";
import { FileInput, Label, Select, TextInput, Textarea } from "flowbite-react";
import React, { useEffect, useState } from "react";
import addDocument from "@/services/firebase/crud/addDocument";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { updateDocument } from "@/services/firebase/crud/updateDocument";
import Button from "@/components/common/Button";
import { uploadFile } from "@/services/firebase/fileHandler";

const AboutForm = ({ initialData, action }) => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [Loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(initialData || {});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const onSubmit = async (data) => {
        try {
            setLoading(true);

            const { success, error } = action === 'create'
                ? await addDocument("about", data)
                : await updateDocument("about", initialData.id, data);

            const actionVerb = action === 'create' ? 'created' : 'updated';
            if (success) {
                router.push("/about");
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
                <div className="mb-6">
                    <div className="mb-2 block">
                        <Label htmlFor="description" value="Description" />
                    </div>
                    <Textarea
                        className="h-20 scrollbar-hide"
                        onChange={handleChange}
                        {...register("description", { required: true })}
                    />
                    {errors.description && <span className="text-sm">This field is required</span>}
                </div>
                <div className="flex sm:gap-4 justify-center flex-col sm:flex-row">
                <div className="w-full mb-4">
                    <div className="mb-2 block">
                        <Label htmlFor="experience" value="Experience" /> <small>(year)</small>
                    </div>
                    <TextInput type="number"
                        onChange={handleChange}
                        {...register("experience", { required: true })}
                    />
                    {errors.experience && <span className="text-sm">This field is required</span>}
                </div>
                <div className="w-full mb-4">
                    <div className=" mb-2 block">
                        <Label htmlFor="projectComplete" value="Project Complete" />
                    </div>
                    <TextInput
                        onChange={handleChange}
                        {...register("projectComplete", { required: true })}
                    />
                    {errors.projectComplete && <span className="text-sm">This field is required</span>}
                </div>
                </div>
                <div className=" mb-6">
                    <div className="mb-2 block">
                        <Label className="mr-2" htmlFor="file" value="Resume" />
                        <small>(google docs link)</small>
                    </div>
                    <TextInput type="resume"
                        onChange={handleChange}
                        {...register("resume", { required: true })}
                    />
                    {errors.resume && <span className="text-sm">This field is required</span>}
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

export default AboutForm;
