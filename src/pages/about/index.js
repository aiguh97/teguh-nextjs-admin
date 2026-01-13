import PageHeading from '@/components/common/PageHeading'
import Container from '@/components/layout/partials/Container'
import AboutTable from '@/components/views/about/Table'
import WithProtected from '@/hoc/withProtected'
import { deleteDocument } from '@/services/firebase/crud/deleteDocument'
import getCollecction from '@/services/firebase/crud/getCollecction'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { SWRConfig } from 'swr'

const index = ({fallback}) => {
  const aboutLength = fallback['/api/about'].length > 0;
  return (
    <SWRConfig value={{ fallback }}>
      <NextSeo title='About - Teguh Muhammad Harits' />
      <Container>
        <PageHeading title="About">
          <Link className={`btn !px-2 !py-0 ${aboutLength && '!hidden'}`} href="/about/create"><i className='text-xl bx bx-list-plus'></i> Create</Link>
        </PageHeading>
        <AboutTable />
      </Container>
    </SWRConfig>
  )
}

export default WithProtected(index);
export const getServerSideProps = async () => {

  const { result } = await getCollecction("about");

  return {
    props: {
      fallback: {
        '/api/about': result
      }
    }
  }
};
