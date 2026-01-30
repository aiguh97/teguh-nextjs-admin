import Button from "@/components/common/Button";
import ImageUploadPreview from "@/components/form/ImageUploadPreview";
import addDocument from "@/services/firebase/crud/addDocument";
import { updateDocument } from "@/services/firebase/crud/updateDocument";
import { deleteFile, uploadFile } from "@/services/supabase/fileHandler";
import { Label, TextInput } from "flowbite-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import Select from "react-select";

const CertificateForm = ({ initialData = {}, action }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  /* PREFILL FORM (UPDATE ONLY) */
  useEffect(() => {
    if (action === "update" && initialData?.id) {
      reset(initialData);

      if (initialData.image_url) {
        setPreview(initialData.image_url);
      }
    }
  }, [initialData, action, reset]);

  /* IMAGE HANDLER */
  const handleChangeFile = (file) => {
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleRemove = () => {
    setImageFile(null);
    setPreview(null);
    setValue("image_url", "");
    setValue("image_path", "");
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      let payload = {
        ...data,
        skill: data.skill?.map((s) => s.value) ?? [], // 🔥 FIX
      };

      if (imageFile) {
        if (action === "update" && initialData?.image_path) {
          await deleteFile(initialData.image_path);
        }

        const uploaded = await uploadFile(imageFile);
        payload.image_url = uploaded.url;
        payload.image_path = uploaded.path;
      } else {
        payload.image_url = initialData?.image_url ?? "";
        payload.image_path = initialData?.image_path ?? "";
      }

      const result =
        action === "create"
          ? await addDocument("certificate", payload)
          : await updateDocument("certificate", initialData.id, payload);

      if (result?.success) {
        toast.success(
          action === "create"
            ? "Created successfully"
            : "Updated successfully"
        );
        router.push("/certificate");
      } else {
        toast.error("Failed to save data");
      }
    } catch (err) {
      console.error("CERTIFICATE ERROR:", err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const skillOptions = [
    { value: "frontend", label: "Frontend" },
    { value: "backend", label: "Backend" },
    { value: "uiux", label: "UI/UX" },
  ];

  return (
    <div className="card p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* IMAGE */}
        <div className="mb-6">
          <Label value="Image" />
          <div className="mt-2">
            <ImageUploadPreview
              value={preview}
              onChange={handleChangeFile}
              onRemove={handleRemove}
            />
          </div>
        </div>

        {/* NAME */}
        <div className="mb-4">
          <Label value="Name" />
          <TextInput {...register("name", { required: true })} />
          {errors.name && <p className="text-sm text-red-500">Required</p>}
        </div>

        {/* ORGANIZATION */}
        <div className="mb-4">
          <Label value="Organization" />
          <TextInput {...register("organization", { required: true })} />
          {errors.organization && (
            <p className="text-sm text-red-500">Required</p>
          )}
        </div>

        {/* SKILL */}
        <div className="mb-4">
          <Label value="Skill" />
          <Controller
            name="skill"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                isMulti
                options={skillOptions}
                classNamePrefix="react-select"
              />
            )}
          />
        </div>

        {/* CREDENTIAL */}
        <div className="mb-6">
          <Label value="Credential" />
          <TextInput {...register("credential", { required: true })} />
          {errors.credential && (
            <p className="text-sm text-red-500">Required</p>
          )}
        </div>

        <Button isLoading={loading} type="submit" className="w-full">
          Save
        </Button>
      </form>
    </div>
  );
};

export default CertificateForm;
