import PageHeading from '@/components/common/PageHeading'
import Container from '@/components/layout/partials/Container'
import ExperienceTable from '@/components/views/experience/Table'
import WithProtected from '@/hoc/withProtected'
import { deleteDocument } from '@/services/firebase/crud/deleteDocument'
import getCollecction from '@/services/firebase/crud/getCollecction'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { SWRConfig } from 'swr'

const index = ({fallback}) => {
  return (
    <SWRConfig value={{ fallback }}>
      <NextSeo title='Experience - Dwi Wijaya' />
      <Container>
        <PageHeading title="Experience">
          <Link className={`btn !px-2 !py-0`} href="/experience/create"><i className='text-xl bx bx-list-plus'></i> Create</Link>
        </PageHeading>
        <ExperienceTable />
      </Container>
    </SWRConfig>
  )
}

export default WithProtected(index);
export const getServerSideProps = async () => {

  const { result } = await getCollecction("experience");

  return {
    props: {
      fallback: {
        '/api/experience': result
      }
    }
  }
};
