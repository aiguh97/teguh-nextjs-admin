import PopupModal from "@/components/elements/PopupModal";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { mutate } from "swr";

import { deleteDocument } from "@/services/firebase/crud/deleteDocument";
import { deleteFile } from "@/services/supabase/fileHandler";

const MDEditorPreview = dynamic(
  () => import("@uiw/react-markdown-preview").then((m) => m.default),
  { ssr: false }
);

const DetailPortfolio = ({ data }) => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setIsLoading(true);

      // 🔥 delete thumbnail if exists
      if (data?.photos) {
        await deleteFile(data.photos).catch(() => {});
      }

      await deleteDocument("portfolio", data.id);

      toast.success("Portfolio deleted");
      mutate("portfolio");
      router.push("/portfolio");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete portfolio");
    } finally {
      setIsLoading(false);
      setOpenModal(false);
    }
  };

  return (
    <div className="card p-4">
      {/* ACTION */}
      <div className="flex justify-end gap-2 mb-4">
        <button
          onClick={() => setOpenModal(true)}
          className="btn action-btn-danger"
        >
          Delete
        </button>

        <Link
          href={`/portfolio/update/${data.id}`}
          className="btn action-btn-warning"
        >
          Update
        </Link>
      </div>

      {/* INFO TABLE */}
      <table className="w-full text-sm border">
        <tbody>
          <tr><td className="p-3 font-semibold">ID</td><td>{data.id}</td></tr>
          <tr><td className="p-3 font-semibold">Name</td><td>{data.name}</td></tr>
          <tr><td className="p-3 font-semibold">Category</td><td>{data.category}</td></tr>
          <tr>
            <td className="p-3 font-semibold">Demo</td>
            <td><a href={data.demoLink} target="_blank" className="text-primary">{data.demoLink}</a></td>
          </tr>
          <tr>
            <td className="p-3 font-semibold">Github</td>
            <td><a href={data.githubLink} target="_blank" className="text-primary">{data.githubLink}</a></td>
          </tr>
          <tr>
            <td className="p-3 font-semibold">Skill</td>
            <td className="flex gap-2 flex-wrap">
              {data.skill?.map((id) => (
                <span key={id} className="badge">{id}</span>
              ))}
            </td>
          </tr>
        </tbody>
      </table>

      {/* IMAGE */}
      {data.photos && (
        <div className="mt-6">
          <Image
            src={data.photos}
            alt={data.name}
            width={1200}
            height={600}
            className="rounded-lg"
          />
        </div>
      )}

      {/* CONTENT */}
      <div className="mt-6">
        <MDEditorPreview source={data.content} />
      </div>

      {/* DELETE MODAL */}
      <PopupModal
        msg="Are you sure want to delete this portfolio?"
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleConfirm={handleDelete}
        isLoading={isLoading}
      />
    </div>
  );
};

export default DetailPortfolio;
