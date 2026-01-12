import Button from "@/components/common/Button";
import addDocument from "@/services/firebase/crud/addDocument";
import { updateDocument } from "@/services/firebase/crud/updateDocument";
import { deleteFile, getFile, uploadFile } from "@/services/firebase/fileHandler";
import { init } from "aos";
import { getDownloadURL } from "firebase/storage";
import { FileInput, Label, TextInput } from "flowbite-react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Select from "react-select";
import { mutate } from "swr";
import { v4 } from "uuid";

const CertificateForm = ({ initialData, action }) => {

    const router = useRouter();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [Loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(initialData || {});
    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        console.log(e.target);
        setFormData({ ...formData, [name]: value });
        if (files[0]) {
            setImage(e.target.files[0]);
            console.log(image);
        }
    };
    const onSubmit = async (data) => {
        try {
            setLoading(true);

            if ( (typeof data.image === 'string' && data.image.length > 0)) {
            } else if (!initialData && data.image.length > 0) {
                data.image = await uploadFile(data.image[0], 'certificates/',);
            } else if(initialData.image && data.image.length > 0 ){
                await deleteFile(initialData.image);
                data.image = await uploadFile(data.image[0], 'certificates/',);
            } else if(initialData.image && data.image.length === 0){
                data.image = initialData.image;
            }
            const { success, error } = action === 'create'
                ? await addDocument("certificates", data)
                : await updateDocument("certificates", initialData.id, data);

            const actionVerb = action === 'create' ? 'created' : 'updated';
            if (success) {
                router.push("/certificate");
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

    const options = [
        { value: "aa", label: "Chocolate" },
        { value: "strawberry", label: "Strawberry" },
        { value: "vanilla", label: "Vanilla" },
    ];

    return <div className="card p-2">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div id="fileUpload" className="w-full mb-4">
                <div className="mb-2 block">
                    <Label htmlFor="name" value="Name" />
                </div>
                <TextInput
                    onChange={handleChange}
                    {...register("name", { required: true })}
                />
                {errors.name && <span className="text-sm">This field is required</span>}
            </div>
            <div id="fileUpload" className=" mb-4">
                <div className="mb-2 block">
                    <Label htmlFor="organization" value="Organization" />
                </div>
                <TextInput
                    onChange={handleChange}
                    {...register("organization", { required: true })}
                />
                {errors.organization && <span className="text-sm">This field is required</span>}
            </div>
            <div id="fileUpload" className=" mb-4">
                <div className="mb-2 block">
                    <Label htmlFor="file" value="Image" /> {initialData && (
                        <>
                            <small>{initialData.image}</small>
                        </>)}
                </div>
                <FileInput
                    accept=".png,.jpg,.webp,.jpeg"
                    onChange={handleChange}
                    {...register("image", { required: !initialData })}
                />
                {errors.image && <span className="text-sm">This field is required</span>}
            </div>
            <div className="mb-4">
                <div className="mb-2">
                    <label className="form-label" htmlFor="skill">Skill</label>
                </div>
                <Select
                    isMulti className="" options={options} />
            </div>
            <div id="fileUpload" className=" mb-6">
                <div className="mb-2 block">
                    <Label htmlFor="credential" value="Credential" />
                </div>
                <TextInput
                    onChange={handleChange}
                    {...register("credential", { required: true })}
                />
                {errors.crendential && <span className="text-sm">This field is required</span>}
            </div>
            <div className="flex mb-2 justify-end">
                <Button isLoading={Loading} className="!w-full" type="submit">
                    Save
                </Button>

            </div>
        </form>
    </div>;
};

export default CertificateForm;
