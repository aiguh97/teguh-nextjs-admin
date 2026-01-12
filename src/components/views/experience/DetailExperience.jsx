import { Modal, Table } from 'flowbite-react'
import Link from 'next/link'
import React, { useState } from 'react'

const DetailLocation = ({ data }) => {
  const [openModal, setOpenModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null); // State to store the ID of the item to delete
  const handleDelete = async (id) => {
    const { result, error } = await deleteDocument('lexperienceocation', data.id); // Corrected to use the passed id
    if (result) {
      setOpenModal(false);
      router.push('/experience');
      mutate('/api/experience');
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
            setDeleteItemId(data.id);
            setOpenModal(true);
          }}
          className="btn action-btn-danger hover:text-white"
        >
          <i className="bx bx-trash"></i> Delete
        </Link>
        <Link
          href={`/experience/update/${data.id}`}
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
              {data.id}
            </td>
          </tr>
          <tr className='border-b border-stroke hover:bg-gray-50 dark:hover:bg-gray-600'>
            <th scope="col" className="px-6 py-4 whitespace-nowrap">
              type
            </th>
            <td className="px-6 py-4">
              {data.type}
            </td>
          </tr>
          <tr className='border-b border-stroke hover:bg-gray-50 dark:hover:bg-gray-600'>
            <th scope="col" className="px-6 py-4 whitespace-nowrap">
              Institution
            </th>
            <td className="px-6 py-4 flex gap-1 items-center ">
              {data.institution}
            </td>
          </tr>
          <tr className='border-b border-stroke hover:bg-gray-50 dark:hover:bg-gray-600'>
            <th scope="col" className="px-6 py-4 whitespace-nowrap">
              Location
            </th>
            <td className="px-6 py-4">
              {data.location}
            </td>
          </tr>
          <tr className='border-b border-stroke hover:bg-gray-50 dark:hover:bg-gray-600'>
            <th scope="col" className="px-6 py-4 whitespace-nowrap">
              Start Month
            </th>
            <td className="px-6 py-4">
              {data.startMonth}
            </td>
          </tr>
          <tr className='border-b border-stroke hover:bg-gray-50 dark:hover:bg-gray-600'>
            <th scope="col" className="px-6 py-4 whitespace-nowrap">
              End Month
            </th>
            <td className="px-6 py-4 whitespace-normal">
              {data.endMonth ? data.endMonth : 'present'}
            </td>
          </tr>
          <tr className='border-b border-stroke hover:bg-gray-50 dark:hover:bg-gray-600'>
            <th scope="col" className="px-6 py-4 whitespace-nowrap">
              Link
            </th>
            <td className="px-6 py-4 whitespace-normal">
              <a className='text-primary' href={data.link} target='_blank'>{data.link}</a>
            </td>
          </tr>
          {data.type == 'education' &&
            <>
              <tr className='border-b border-stroke hover:bg-gray-50 dark:hover:bg-gray-600'>
                <th scope="col" className="px-6 py-4 whitespace-nowrap">
                  Education major
                </th>
                <td className="px-6 py-4 whitespace-normal">
                  {data.major}
                </td>
              </tr>
              <tr className='border-b border-stroke hover:bg-gray-50 dark:hover:bg-gray-600'>
                <th scope="col" className="px-6 py-4 whitespace-nowrap">
                  Education Degree
                </th>
                <td className="px-6 py-4 whitespace-normal">
                  {data.degree}
                </td>
              </tr>
            </>
          }
          {data.type == 'work' &&
            <>
              <tr className='border-b border-stroke hover:bg-gray-50 dark:hover:bg-gray-600'>
                <th scope="col" className="px-6 py-4 whitespace-nowrap">
                  Work Position
                </th>
                <td className="px-6 py-4 whitespace-normal">
                  {data.position ?? 'present'}
                </td>
              </tr>
              <tr className='border-b border-stroke hover:bg-gray-50 dark:hover:bg-gray-600'>
                <th scope="col" className="px-6 py-4 whitespace-nowrap">
                  Work Type
                </th>
                <td className="px-6 py-4 whitespace-normal">
                  {data.workType ?? 'present'}
                </td>
              </tr>
              <tr className='border-b border-stroke hover:bg-gray-50 dark:hover:bg-gray-600'>
                <th scope="col" className="px-6 py-4 whitespace-nowrap">
                  Work Mode
                </th>
                <td className="px-6 py-4 whitespace-normal">
                  {data.workMode}
                </td>
              </tr>
            </>
          }
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

export default DetailLocation