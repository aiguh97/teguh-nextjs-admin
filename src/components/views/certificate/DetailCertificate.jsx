import PopupModal from '@/components/elements/PopupModal';
import Image from 'next/image';
import Link from 'next/link'
import React, { useState } from 'react'

const DetailCertificate = ({ data }) => {
  const [openModal, setOpenModal] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const handleDelete = async (id) => {
    setIsLoading(true)
    const { result, error } = await deleteDocument('certificates', id);
    if (result) {
      setOpenModal(false);
      setIsLoading(false)
      router.push('/certificate');
      mutate('/api/certificate');
      toast.success('Data deleted successfully');
    }
  };
  console.log(data);
  return (
    <div className='card'>
      <div className="flex justify-end gap-2">
        <Link href="#"
          onClick={() => {
            setDeleteItemId(data.id);
            setOpenModal(true);
          }}
          className="btn action-btn-danger hover:text-white"
        >
          <i className="bx bx-trash"></i> Delete
        </Link>
        <Link href={`/certificate/update/${data.id}`} className="btn action-btn-warning hover:text-white" >
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
              Name
            </th>
            <td className="px-6 py-4 flex gap-1 items-center ">
              {data.name}
            </td>
          </tr>
          <tr className='border-b border-stroke hover:bg-gray-50 dark:hover:bg-gray-600'>
            <th scope="col" className="px-6 py-4 whitespace-nowrap">
              Organization
            </th>
            <td className="px-6 py-4">
              {data.organization}
            </td>
          </tr>
          <tr className='border-b border-stroke hover:bg-gray-50 dark:hover:bg-gray-600'>
            <th scope="col" className="px-6 py-4 whitespace-nowrap">
              Order
            </th>
            <td className="px-6 py-4">
              {data.order}
            </td>
          </tr>
          <tr className='border-b border-stroke hover:bg-gray-50 dark:hover:bg-gray-600'>
            <th scope="col" className="px-6 py-4 whitespace-nowrap">
              Credential
            </th>
            <td className="px-6 py-4">
              <a href={data.credential}>{data.credential}</a>
            </td>
          </tr>
        </tbody>
      </table>
      <Image alt={data.name} src={data.image} width={0}
        height={0}
        sizes="100vw"
        className='mt-5'
        style={{ width: '100%', height: 'auto' }}
      />
      <PopupModal msg="Are u sure to delete this item ?" openModal={openModal} setOpenModal={setOpenModal} handleConfirm={() => handleDelete(deleteItemId)} isLoading={IsLoading} />
    </div>
  )
}

export default DetailCertificate