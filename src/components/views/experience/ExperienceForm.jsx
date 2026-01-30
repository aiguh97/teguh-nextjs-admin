import { useForm } from "react-hook-form";
import { FileInput, Label, Select, TextInput, Textarea } from "flowbite-react";
import React, { useEffect, useState } from "react";
import addDocument from "@/services/firebase/crud/addDocument";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { updateDocument } from "@/services/firebase/crud/updateDocument";
import Button from "@/components/common/Button";

const ExperienceForm = ({ initialData, action }) => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [Loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(initialData || {});
    const [selectedType, setSelectedType] = useState(initialData?.type || null);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
    };
    const handleTypeChange = (e) => {
        const { name, value } = e.target;
        if (name === 'type') {
            setSelectedType(value)
        }
    }

    const onSubmit = async (data) => {
        console.log(data);
        try {
            setLoading(true);
            data.type = selectedType;
            const { success, error } = action === 'create'
                ? await addDocument("experience", data)
                : await updateDocument("experience", initialData.id, data);

            const actionVerb = action === 'create' ? 'created' : 'updated';
            if (success) {
                router.push("/experience");
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
                <div className=" mb-6">
                    <div className="mb-2 block">
                        <Label htmlFor="type" value="Select Type" />
                    </div>
                    <Select id="type" onChange={handleTypeChange} name="type" defaultValue="">
                        <option value="" disabled hidden>Choose type</option>
                        <option value="work">Work</option>
                        <option value="education">Education</option>
                    </Select>
                    {errors.type && <span className="text-sm">This field is required</span>}
                </div>
                <div className="mb-6">
                    <div className="mb-2 block">
                        <Label htmlFor="institution" value="Institution Name" />
                    </div>
                    <TextInput
                        onChange={handleChange}
                        {...register("institution", { required: true })}
                    />
                    {errors.institution && <span className="text-sm">This field is required</span>}
                </div>
                {selectedType == 'education' &&
                    <>
                        <div className="mb-6">
                            <div className="mb-2 block">
                                <Label htmlFor="degree" value="Education Degree" />
                            </div>
                            <TextInput
                                onChange={handleChange}
                                {...register("degree", { required: true })}
                            />
                            {errors.degree && <span className="text-sm">This field is required</span>}
                        </div>
                        <div className="mb-6">
                            <div className="mb-2 block">
                                <Label htmlFor="major" value="Major Name" />
                            </div>
                            <TextInput
                                onChange={handleChange}
                                {...register("major", { required: true })}
                            />
                            {errors.major && <span className="text-sm">This field is required</span>}
                        </div>
                    </>
                }
                {selectedType == 'work' &&
                    <>
                        <div className="mb-6">
                            <div className="mb-2 block">
                                <Label htmlFor="position" value="Position Name" />
                            </div>
                            <TextInput
                                onChange={handleChange}
                                {...register("position", { required: true })}
                            />
                            {errors.position && <span className="text-sm">This field is required</span>}
                        </div>
                        <div className="mb-6">
                            <div className="mb-2 block">
                                <Label htmlFor="workType" value="Work Type" />
                            </div>
                            <Select onChange={handleChange} {...register("workType", { required: selectedType == 'work' })} defaultValue="">
                                <option value="" disabled hidden>Choose work type ...</option>
                                <option value="fulltime">Full-time</option>
                                <option value="partime">Part-time</option>
                                <option value="intern">Internship</option>
                                <option value="freelance">Freelance</option>
                            </Select>
                            {errors.workType && <span className="text-sm">This field is required</span>}
                        </div>
                        <div className="mb-6">
                            <div className="mb-2 block">
                                <Label htmlFor="workMode" value="Work Mode" />
                            </div>
                            <Select onChange={handleChange} {...register("workMode", { required: selectedType == 'work' })} defaultValue="">
                                <option value="" disabled hidden>Choose work mode ...</option>
                                <option value="onsite">Onsite</option>
                                <option value="remote">Remote</option>
                            </Select>
                            {errors.workMode && <span className="text-sm">This field is required</span>}
                        </div>
                    </>
                }
                <div className="mb-6">
                    <div className="mb-2 block">
                        <Label htmlFor="location" value="Location" />
                    </div>
                    <TextInput
                        onChange={handleChange}
                        {...register("location", { required: true })}
                    />
                    {errors.location && <span className="text-sm">This field is required</span>}
                </div>
                <div className="flex sm:gap-4 justify-center flex-col sm:flex-row">
                    <div className="w-full mb-4">
                        <div className="mb-2 block">
                            <Label htmlFor="startMonth" value="Start Month" /> <small>(eg: Jan 2020)</small>
                        </div>
                        <TextInput
                            onChange={handleChange}
                            {...register("startMonth", { required: true })}
                        />
                        {errors.startMonth && <span className="text-sm">This field is required</span>}
                    </div>
                    <div className="w-full mb-4">
                        <div className=" mb-2 block">
                            <Label htmlFor="endMonth" value="End Month" />
                        </div>
                        <TextInput
                            onChange={handleChange}
                            {...register("endMonth", { required: false })}
                        />
                        {errors.endMonth && <span className="text-sm">This field is required</span>}
                    </div>
                </div>
                <div className=" mb-6">
                    <div className="mb-2 block">
                        <Label className="mr-2" htmlFor="file" value="Link" />
                    </div>
                    <TextInput type="url"
                        onChange={handleChange}
                        {...register("link", { required: true })}
                    />
                    {errors.link && <span className="text-sm">This field is required</span>}
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

export default ExperienceForm;
