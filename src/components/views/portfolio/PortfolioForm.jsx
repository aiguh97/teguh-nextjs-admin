import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { FileInput, Label, TextInput, Textarea, Select } from "flowbite-react";
import { useRouter } from "next/router";
import { deleteFile, uploadFile } from "@/services/firebase/fileHandler";
import addDocument from "@/services/firebase/crud/addDocument";
import { updateDocument } from "@/services/firebase/crud/updateDocument";
import toast from "react-hot-toast";
import Button from "@/components/common/Button";
import ReactSelect from "react-select";
import { PORTFOLIO_CATEGORIES, PORTFOLIO_TYPES } from "@/constants/data/portfolio";
import convert from "url-slug";

// MDEditor untuk edit
const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then(mod => mod.default),
  { ssr: false }
);

// MDEditorPreview untuk preview
const MDEditorPreview = dynamic(
  () => import("@uiw/react-markdown-preview").then(mod => mod.default),
  { ssr: false }
);
const PortfolioForm = ({ initialData, action, skills }) => {
  const [content, setContent] = useState(initialData?.content || "**Hello world!!!**");
  const [selected, setSelected] = useState(initialData?.skill || []);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: initialData || {}
  });
  const [Loading, setLoading] = useState(false);

  // Map skills untuk ReactSelect
  const mappedSkills = skills.map(item => ({ value: item.id, label: item.name }));

  // Set default skill values saat initialData berubah
  useEffect(() => {
    if (initialData?.skill) {
      const defaultSkills = initialData.skill.map(s => mappedSkills.find(m => m.value === s.value)).filter(Boolean);
      setSelected(defaultSkills);
    }
    if (initialData) {
      Object.entries(initialData).forEach(([key, value]) => setValue(key, value));
    }
  }, [initialData, mappedSkills, setValue]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setThumbnailFile(file);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // Assign skill dan content
      data.skill = selected;
      data.content = content;
      data.slug = convert(data.name);

      // Upload / update thumbnail
      if (thumbnailFile) {
        if (initialData?.thumbnail) await deleteFile(initialData.thumbnail);
        data.thumbnail = await uploadFile(thumbnailFile, "portfolio/");
      } else if (initialData?.thumbnail) {
        data.thumbnail = initialData.thumbnail;
      } else {
        data.thumbnail = "";
      }

      // Save to Firebase
      const { success, error } = action === "create"
        ? await addDocument("portfolio", data)
        : await updateDocument("portfolio", initialData.id, data);

      if (success) {
        toast.success(`Portfolio ${action === "create" ? "created" : "updated"} successfully`);
        router.push("/portfolio");
      } else {
        toast.error(`Failed to ${action === "create" ? "create" : "update"} portfolio`);
        console.error(error);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <Label htmlFor="name" value="Name" />
          <TextInput id="name" {...register("name", { required: true })} />
          {errors.name && <span className="text-sm">This field is required</span>}
        </div>

        <div className="mb-4">
          <Label htmlFor="thumbnail" value="Thumbnail" />
          {initialData?.thumbnail && !thumbnailFile && (
            <div className="mb-2">
              <img src={initialData.thumbnail} alt="thumbnail" className="w-32 h-32 object-cover" />
            </div>
          )}
          <FileInput accept=".png,.jpg,.jpeg,.webp" onChange={handleFileChange} />
          {errors.thumbnail && <span className="text-sm">This field is required</span>}
        </div>

        <div className="mb-4">
          <Label htmlFor="order" value="Order" />
          <TextInput id="order" {...register("order", { required: true })} />
          {errors.order && <span className="text-sm">This field is required</span>}
        </div>

        <div className="mb-4">
          <Label htmlFor="category" value="Category" />
          <Select {...register("category", { required: true })} defaultValue={initialData?.category || ""}>
            <option value="" disabled hidden>Choose category ...</option>
            {PORTFOLIO_CATEGORIES.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </Select>
          {errors.category && <span className="text-sm">This field is required</span>}
        </div>

<div className="mb-6">
  <Label htmlFor="content" value="Content" />
  <MDEditor
    value={content}
    onChange={(val) => setContent(val || "")} // pastikan selalu string
    height={400}
    preview="edit"
  />
  {errors.content && <span className="text-sm">This field is required</span>}
</div>

{/* Realtime Preview */}
<div className="mt-4">
  <Label value="Preview" />
  <MDEditorPreview
    source={content || ""}
    className="md:p-4 rounded-lg border border-gray-200"
  />
</div>




        <div className="mb-4">
          <Label htmlFor="skill" value="Skill" />
          <ReactSelect
            isMulti
            value={selected}
            onChange={setSelected}
            options={mappedSkills}
          />
        </div>

        <div className="flex justify-end">
          <Button isLoading={Loading} type="submit" className="!w-full">Save</Button>
        </div>
      </form>
    </div>
  );
};

export default PortfolioForm;
