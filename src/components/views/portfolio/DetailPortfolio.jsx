

import PopupModal from '@/components/elements/PopupModal';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link'
import React, { useState } from 'react'
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { deleteDocument } from '@/services/firebase/crud/deleteDocument';

const MDEditorPreview = dynamic(
  () => import("@uiw/react-markdown-preview").then((module) => module.default),
  { ssr: false }
);

const DetailPortfolio = ({ data }) => {
  const [openModal, setOpenModal] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const handleDelete = async (id) => {
    const { result, error } = await deleteDocument('portfolio', id);
    if (result) {
      setOpenModal(false);
      router.push('/portfolio');
      mutate('/api/portfolio');
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
        <Link href={`/portfolio/update/${data.id}`} className="btn action-btn-warning hover:text-white" >
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
              Type
            </th>
            <td className="px-6 py-4">
              {data.type}
            </td>
          </tr>
          <tr className='border-b border-stroke hover:bg-gray-50 dark:hover:bg-gray-600'>
            <th scope="col" className="px-6 py-4 whitespace-nowrap">
              Excerpt
            </th>
            <td className="px-6 py-4">
              {data.excerpt}
            </td>
          </tr>
          <tr className='border-b border-stroke hover:bg-gray-50 dark:hover:bg-gray-600'>
            <th scope="col" className="px-6 py-4 whitespace-nowrap">
              Category
            </th>
            <td className="px-6 py-4">
              {data.category}
            </td>
          </tr>
          <tr className='border-b border-stroke hover:bg-gray-50 dark:hover:bg-gray-600'>
            <th scope="col" className="px-6 py-4 whitespace-nowrap">
              Demo Link
            </th>
            <td className="px-6 py-4 text-primary">
              <a href={data.demoLink}>{data.demoLink}</a>
            </td>
          </tr>
          <tr className='border-b border-stroke hover:bg-gray-50 dark:hover:bg-gray-600'>
            <th scope="col" className="px-6 py-4 whitespace-nowrap">
              Github Link
            </th>
            <td className="px-6 py-4 text-primary">
              <a href={data.githubLink}>{data.githubLink}</a>
            </td>
          </tr>
          <tr className='border-b border-stroke hover:bg-gray-50 dark:hover:bg-gray-600'>
            <th scope="col" className="px-6 py-4 whitespace-nowrap">
              Is Featured
            </th>
            <td className="px-6 py-4">
              {data?.isFeatured?.toString()}
            </td>
          </tr>
          <tr className='border-b border-stroke hover:bg-gray-50 dark:hover:bg-gray-600'>
            <th scope="col" className="px-6 py-4 whitespace-nowrap">
              Skill
            </th>
            <td className="px-6 py-4">
              <div className="flex gap-2">
                {data.skill.map((skill, index) => (
                  <div className="flex" key={index}> 
                    <div className="badge">
                    {skill.label}
                    </div>
                  </div>
                ))}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Image alt={data.name} src={data.thumbnail} width={0}
        height={0}
        sizes="100vw"
        className='mt-5 rounded-md'
        style={{ width: '100%', height: 'auto' }}
      />
      <hr className='hr' />
      <MDEditorPreview
        source={data.content}
        className="md:p-4 rounded-lg"
      />
      <PopupModal msg="Are u sure to delete this item ?" openModal={openModal} setOpenModal={setOpenModal} handleConfirm={() => handleDelete(deleteItemId)} isLoading={IsLoading} />
    </div>
  )
}

export default DetailPortfolio