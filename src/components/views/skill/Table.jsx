import React, { useState } from 'react';
import { fetcher } from '@/services/fetcher';
import useSWR, { mutate } from 'swr';
import { deleteDocument } from '@/services/firebase/crud/deleteDocument';
import toast from 'react-hot-toast';
import PopupModal from '@/components/elements/PopupModal';
import ButtonActionColumn from '@/components/elements/ButtonActionColumn';

const SkillTable = () => {
  const { data } = useSWR('/api/skill', fetcher);

  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const pageSize = 10;
  const totalPages = Math.ceil(data?.length / pageSize);

  const visibleData = data?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  ) || [];
  let order = (currentPage - 1) * pageSize + 1;

  const handleDeleteClick = (id) => {
    setDeleteItemId(id);
    setOpenModal(true);
  };

  const handleDelete = async (id) => {
    try {
      setIsLoading(true);
      const { result } = await deleteDocument('skill', id);
      if (result) {
        setOpenModal(false);
        mutate('/api/skill');
        toast.success('Data deleted successfully');
      }
    } catch (e) {
      toast.error('Data delete failed');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="">
      <div className="overflow-x-auto bg-container relative scrollbar-hide overflow-y-hidden sm:rounded-lg card !p-2">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-4">#</th>
              <th className="px-6 py-3 whitespace-nowrap">Name</th>
              <th className="px-6 py-3">Type</th>
              <th className="px-6 py-3">Order</th>
              <th className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {visibleData.map((item, index) => (
              <tr
                key={item.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">{order++}</td>
                <td className="flex gap-2 px-6 py-4">
                  <i
                    className="text-xl"
                    dangerouslySetInnerHTML={{ __html: item.icon }}
                  />
                  {item.name}
                </td>
                <td className="px-6 py-4">{item.type}</td>
                <td className="px-6 py-4">{item.order}</td>
                <td className="px-6 py-4 text-right flex gap-1 justify-end">
                  <ButtonActionColumn
                    route="skill"
                    id={item.id}
                    onDeleteClick={() => handleDeleteClick(item.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PopupModal
        msg="Are you sure to delete this item?"
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleConfirm={() => handleDelete(deleteItemId)}
        isLoading={isLoading}
      />

      {/* Custom Tailwind Pagination */}
      <div className="flex justify-end mt-4 space-x-1">
        {/* Previous Button */}
        <button
          className={`w-10 h-10 flex items-center justify-center rounded border ${
            currentPage === 1
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &#8249;
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`w-10 h-10 flex items-center justify-center rounded border ${
              page === currentPage
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}

        {/* Next Button */}
        <button
          className={`w-10 h-10 flex items-center justify-center rounded border ${
            currentPage === totalPages
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          onClick={() =>
            currentPage < totalPages && handlePageChange(currentPage + 1)
          }
          disabled={currentPage === totalPages}
        >
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default SkillTable;
