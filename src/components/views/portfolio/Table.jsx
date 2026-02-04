import React, { useState } from 'react'
import useSWR, { mutate } from 'swr';
import { deleteDocument } from '@/services/firebase/crud/deleteDocument';
import { Button, Pagination } from 'flowbite-react';
import toast from 'react-hot-toast';
import PopupModal from '@/components/elements/PopupModal';
import ButtonActionColumn from '@/components/elements/ButtonActionColumn';
import { deleteFile } from '@/services/supabase/fileHandler';


const formatDate = (timestamp) => {
  if (!timestamp?.seconds) return "-";
  return new Date(timestamp.seconds * 1000).toLocaleString("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};


const PortfolioTable = ({ data }) => {
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [filePath, setFilePath] = useState(null);

  const pageSize = 10;
  const totalPages = Math.ceil(data?.length / pageSize);

  const visibleData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  let order = (currentPage - 1) * pageSize + 1;

  // --- HANDLE DELETE CLICK ---
  const handleDeleteClick = (id, thumbnail) => {
    setDeleteItemId(id);
    setFilePath(thumbnail); // pastikan ini path Supabase
    setOpenModal(true);
  };

  // --- HANDLE DELETE ---
const handleDelete = async (id) => {
  if (!id) return;

  setIsLoading(true);

  try {
    // 1️⃣ Delete image
    if (filePath) {
      await deleteFile(filePath).catch(() => {});
    }

    // 2️⃣ Delete document
    const { result } = await deleteDocument("portfolio", id);

    if (result) {
      toast.success("Deleted successfully");

      // 🔥 INI KUNCI NYA
      await mutate("portfolio"); // refresh table instantly
    }

    setOpenModal(false);
  } catch (err) {
    console.error(err);
    toast.error("Failed to delete item");
  } finally {
    setIsLoading(false);
    setDeleteItemId(null);
    setFilePath(null);
  }
};


  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div>
        zxc
      <div className="overflow-x-auto bg-container relative scrollbar-hide overflow-y-hidden sm:rounded-lg card !p-2">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
     <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
  <tr>
    <th className="px-6 py-4">#</th>
    <th className="px-6 py-3 whitespace-nowrap">Name</th>
    <th className="px-6 py-3">Category</th>
    <th className="px-6 py-3">Created At</th>
    <th className="px-6 py-3">Updated At</th>
    <th className="px-6 py-3">
      <span className="sr-only">Action</span>
    </th>
  </tr>
</thead>

          <tbody>
            {visibleData.map((item, index) => (
              <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className='px-6 py-4'>{order++}</td>
                <td className="flex gap-2 px-6 py-4">{item.name}</td>
                <td className="px-6 py-4">
        {formatDate(item.created_at)}
      </td>
      <td className="px-6 py-4">
        {formatDate(item.updated_at)}
      </td>
                <td className="px-6 py-4">{item.category}</td>
                <td className="px-6 py-4 text-right flex gap-1 justify-end">
                  <ButtonActionColumn
                    route="portfolio"
                    id={item.id}
                    file={item.image}
                    onDeleteClick={() => handleDeleteClick(item.id, item.thumbnail)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PopupModal
        msg="Are you sure you want to delete this item?"
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleConfirm={() => handleDelete(deleteItemId)}
        isLoading={isLoading}
      />

      <Pagination
        className='mt-3 mb-5 float-right'
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        showIcons
      />
    </div>
  );
};

export default PortfolioTable;
