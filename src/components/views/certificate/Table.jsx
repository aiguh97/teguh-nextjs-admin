import React, { useEffect, useState } from "react";
import { fetcher } from "@/services/fetcher";
import useSWR, { mutate } from "swr";
import { deleteDocument } from "@/services/firebase/crud/deleteDocument";
import { Button, Modal, Pagination } from "flowbite-react";
import toast from "react-hot-toast";
import Link from "next/link";
import PopupModal from "@/components/elements/PopupModal";
import ButtonActionColumn from "@/components/elements/ButtonActionColumn";
// import { deleteFile } from "@/services/firebase/fileHandler";

const certificateTable = () => {
  const { data } = useSWR("/api/certificate", fetcher);

  const [openModal, setOpenModal] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [Filepath, setFilepath] = useState(null);

  const handleDeleteClick = (id, filepath) => {
    setDeleteItemId(id);
    setFilepath(filepath);
    setOpenModal(true);
  };
  const handleDelete = async (id) => {
    try {
      setIsLoading(true);
    //   const deleteImage = await deleteFile(Filepath);
    // await deleteDocument("certificates", id);
      const { result } = await deleteDocument("certificate", id);
      if (result) {
        setOpenModal(false);
        mutate("/api/certificate");
        toast.success(JSON.stringify(result));
      }
    } catch (e) {
      setIsLoading(false);
      console.log("Err:", e.message);
      toast.error("Data delete failed");
    } finally {
      setIsLoading(false);
    }
  };

  const pageSize = 10;
  const totalPages = Math.ceil(data?.length / pageSize);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const visibleData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );
  let order = (currentPage - 1) * pageSize + 1;

  return (
    <div className="">
      <div className="overflow-x-auto bg-container relative scrollbar-hide overflow-y-hidden sm:rounded-lg card !p-2">
        {/* {JSON.stringify(visibleData)} */}
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
            <tr>
              <th className="px-6 py-4 m">#</th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Name
              </th>
               <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Type
              </th>
              {/* <th scope="col" className="px-6 py-3">
                Order
              </th> */}
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {visibleData.map((item, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4 m">{order++}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {item.image_url && (
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-10 h-10 rounded object-cover border"
                        loading="lazy"
                      />
                    )}
                    <span>{item.name}</span>
                  </div>
                </td>

                <td className="px-6 py-4">{item.type}</td>
                <td className="px-6 py-4">{item.organization}</td>
                <td className="px-6 py-4 text-right flex gap-1 justify-end">
                  <ButtonActionColumn
                    route="certificate"
                    id={item.id}
                    file={item.image}
                    onDeleteClick={() => handleDeleteClick(item.id, item.image)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PopupModal
        msg="Are u sure to delete this item ?"
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleConfirm={() => handleDelete(deleteItemId)}
        isLoading={IsLoading}
      />

      <Pagination
        className="mt-3 mb-5 float-right"
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        showIcons
      />
    </div>
  );
};

export default certificateTable;
