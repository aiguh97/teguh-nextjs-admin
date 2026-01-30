import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Label, TextInput, Select } from "flowbite-react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import convert from "url-slug";
import ReactSelect from "react-select";

import Button from "@/components/common/Button";
import ImageUploadPreview from "@/components/form/ImageUploadPreview";
import TiptapEditor from "@/components/editor/TiptapEditor";

import addDocument from "@/services/firebase/crud/addDocument";
import { updateDocument } from "@/services/firebase/crud/updateDocument";
import { uploadFile, deleteFile } from "@/services/supabase/fileHandler";
import { PORTFOLIO_CATEGORIES } from "@/constants/data/portfolio";

const PortfolioForm = ({ initialData = {}, action, skills }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [preview, setPreview] = useState(initialData?.photos || "");
  const [content, setContent] = useState(initialData?.content || "");

  const {
    register,
    handleSubmit,
    control,
    reset,
  } = useForm();

const mapSkillValue = () => {
  if (!initialData?.skill || !skills?.length) return [];

  return skills
    .filter((s) => initialData.skill.includes(s.id))
    .map((s) => ({
      value: s.id,
      label: s.name, // 🔥 INI YANG DI-RENDER
    }));
};


useEffect(() => {
  if (action === "update" && initialData?.id) {
    reset({
      ...initialData,
      skill: mapSkillValue(), // ✅ format react-select
    });

    setContent(initialData?.content || "");
    setPreview(initialData?.photos || "");
  }
}, [initialData, action, skills, reset]);



  const skillOptions = skills.map((s) => ({
    value: s.id,
    label: s.name,
  }));

  const handleThumbnailChange = (file) => {
    setThumbnailFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleRemoveThumbnail = () => {
    setThumbnailFile(null);
    setPreview("");
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      let payload = {
        ...data,
        content,
        slug: convert(data.name),
        skill: data.skill?.map((s) => s.value) ?? [],
      };

      // Thumbnail
      if (thumbnailFile) {
        if (initialData?.photos) await deleteFile(initialData.photos);
        const uploaded = await uploadFile(thumbnailFile, "portfolio/");
        payload.photos = uploaded.url;
      } else {
        payload.photos = initialData?.photos ?? "";
      }

      const result =
        action === "create"
          ? await addDocument("portfolio", payload)
          : await updateDocument("portfolio", initialData.id, payload);

      if (result?.success) {
        toast.success(
          action === "create" ? "Created successfully" : "Updated successfully"
        );
        router.push("/portfolio");
      } else {
        toast.error("Failed to save data");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* NAME */}
        <div className="mb-4">
          <Label value="Name" />
          <TextInput {...register("name", { required: true })} />
        </div>

        {/* THUMBNAIL */}
        <div className="mb-6">
          <Label value="Thumbnail" />
          <ImageUploadPreview
            value={preview}
            onChange={handleThumbnailChange}
            onRemove={handleRemoveThumbnail}
          />
        </div>

        {/* ORDER */}
        <div className="mb-4">
          <Label value="Order" />
          <TextInput type="number" {...register("order")} />
        </div>

        {/* CATEGORY */}
        <div className="mb-4">
          <Label value="Category" />
          <Select {...register("category")}>
            <option value="">Choose category</option>
            {PORTFOLIO_CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </Select>
        </div>

        {/* CONTENT */}
        <div className="mb-6">
          <Label value="Content" />
          <TiptapEditor value={content} onChange={setContent} />
        </div>
        {/* SKILL */}
        <div className="mb-6">
          <Label value="Skill" />
          <Controller
            name="skill"
            control={control}
            render={({ field }) => (
              <ReactSelect {...field} isMulti options={skillOptions} />
            )}
          />
        </div>

        <Button isLoading={loading} type="submit" className="w-full">
          Save
        </Button>
      </form>
    </div>
  );
};

export default PortfolioForm;
