import Button from "@/components/common/Button";
import addDocument from "@/services/firebase/crud/addDocument";
import { updateDocument } from "@/services/firebase/crud/updateDocument";
import { deleteFile, uploadFile } from "@/services/firebase/fileHandler";
import { Label, TextInput, FileInput } from "flowbite-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Select from "react-select";

const CertificateForm = ({ initialData, action }) => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [Loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    // prefill form with initialData
    Object.entries(initialData || {}).forEach(([key, value]) => {
      setValue(key, value);
    });
  }, [initialData, setValue]);

  const handleChangeFile = (e) => {
    const file = e.target.files?.[0];
    if (file) setImageFile(file);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // Handle image upload
      if (imageFile) {
        // If editing and old image exists, delete it
        if (initialData?.image) await deleteFile(initialData.image);
        data.image = await uploadFile(imageFile, "certificates/");
      } else if (initialData?.image) {
        data.image = initialData.image; // keep existing image
      } else {
        data.image = ""; // fallback
      }

      // Firestore action
      const { success, error } = action === "create"
        ? await addDocument("certificate", data)
        : await updateDocument("certificate", initialData.id, data);

      if (success) {
        toast.success(`Data ${action === "create" ? "created" : "updated"} successfully`);
        router.push("/certificate");
      } else {
        toast.error(`Failed to ${action === "create" ? "create" : "update"}`);
        console.error("Error:", error);
      }
    } catch (err) {
      console.error("An error occurred:", err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const skillOptions = [
    { value: "aa", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <div className="card p-2">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <div className="mb-4">
          <Label htmlFor="name" value="Name" />
          <TextInput {...register("name", { required: true })} />
          {errors.name && <span className="text-sm text-red-500">This field is required</span>}
        </div>

        {/* Organization */}
        <div className="mb-4">
          <Label htmlFor="organization" value="Organization" />
          <TextInput {...register("organization", { required: true })} />
          {errors.organization && <span className="text-sm text-red-500">This field is required</span>}
        </div>

        {/* Image */}
        <div className="mb-4">
          <Label htmlFor="image" value="Image" />
          {initialData?.image && <small>Current: {initialData.image}</small>}
          <FileInput
            accept=".png,.jpg,.jpeg,.webp"
            onChange={handleChangeFile}
          />
          {errors.image && <span className="text-sm text-red-500">This field is required</span>}
        </div>

        {/* Skill */}
        <div className="mb-4">
          <Label htmlFor="skill" value="Skill" />
          <Select isMulti options={skillOptions} />
        </div>

        {/* Credential */}
        <div className="mb-4">
          <Label htmlFor="credential" value="Credential" />
          <TextInput {...register("credential", { required: true })} />
          {errors.credential && <span className="text-sm text-red-500">This field is required</span>}
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <Button isLoading={Loading} type="submit" className="!w-full">Save</Button>
        </div>
      </form>
    </div>
  );
};

export default CertificateForm;
