import { Modal, Table } from 'flowbite-react'
import Link from 'next/link'
import React, { useState } from 'react'

const DetailSkill = ({ id, name, icon, type, order }) => {
  const [openModal, setOpenModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null); // State to store the ID of the item to delete
  const handleDelete = async (id) => {
    const { result, error } = await deleteDocument('skill', id); // Corrected to use the passed id
    if (result) {
      setOpenModal(false);
      router.push('/skill');
      mutate('/api/skill');
      toast.success('Data deleted successfully');
    }
    console.log(result);
  };

  return (
    <div className='card'>
      <div className="flex justify-end gap-2">
        <Link
          href="#"
          onClick={() => {
            setDeleteItemId(id);
            setOpenModal(true);
          }}
          className="btn action-btn-danger hover:text-white"
        >
          <i className="bx bx-trash"></i> Delete
        </Link>
        <Link
          href={`/skill/update/${id}`}
          className="btn action-btn-warning hover:text-white"
        >
          <i className="bx bxs-pencil"></i> Update
        </Link>
      </div>
      <table className="mt-4 mb-1 w-full border text-sm text-left dark:bg-gray-800 text-gray-500 dark:text-gray-400">
        <tbody className="text-xs text-gray-700   dark:text-gray-400 ">
          <tr className='border-b border-stroke hover:bg-gray-50 dark:hover:bg-gray-600'>
            <th scope="col" className="px-6 py-4 whitespace-nowrap">
              ID
            </th>
            <td className="px-6 py-4">
              {id}
            </td>
          </tr>
          <tr className='border-b border-stroke hover:bg-gray-50 dark:hover:bg-gray-600'>
            <th scope="col" className="px-6 py-4 whitespace-nowrap">
              Name
            </th>
            <td className="px-6 py-4 flex gap-1 items-center ">
              <i
                className="text-xl"
                dangerouslySetInnerHTML={{ __html: icon }}
              /> {name}
            </td>
          </tr>
          <tr className='border-b border-stroke hover:bg-gray-50 dark:hover:bg-gray-600'>
            <th scope="col" className="px-6 py-4 whitespace-nowrap">
              Type
            </th>
            <td className="px-6 py-4">
              {type}
            </td>
          </tr>
          <tr className='border-b border-stroke hover:bg-gray-50 dark:hover:bg-gray-600'>
            <th scope="col" className="px-6 py-4 whitespace-nowrap">
              Order
            </th>
            <td className="px-6 py-4">
              {order}
            </td>
          </tr>
        </tbody>
      </table>
      <Modal show={openModal} onClose={() => setOpenModal(false)} size="sm">
        <Modal.Body>
          <div className="text-center">
            <div className="mx-auto mb-4 h-10 w-10 text-slate-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-600 rounded-md p-1 flex items-center justify-center text-xl">
              <i className="icon-exclamation"></i>
            </div>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this item?
            </h3>
            <div className="flex justify-center gap-4">
              <button className="btn" onClick={() => handleDelete(deleteItemId)}>
                Yes, I'm sure
              </button>
              <button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default DetailSkill