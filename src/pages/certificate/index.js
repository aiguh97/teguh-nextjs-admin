import PageHeading from '@/components/common/PageHeading'
import Container from '@/components/layout/partials/Container'
import CertificateTable from '@/components/views/certificate/Table'
import WithProtected from '@/hoc/withProtected'
import getCollecction from '@/services/firebase/crud/getCollecction'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import React from 'react'
import { SWRConfig } from 'swr'

const index = ({fallback}) => {

  return (
    <SWRConfig value={{ fallback }}>
      <NextSeo title='Certificate - Teguh Muhammad Harits' />

      <Container>
        <PageHeading title="Certificate">
          <Link className='btn !px-2 !py-0' href="/certificate/create"><i className='text-xl bx bx-list-plus'></i> Create</Link>
        </PageHeading>
        <CertificateTable />
      </Container>
    </SWRConfig>
  )
}

export default WithProtected(index);
export const getServerSideProps = async () => {

  const { result } = await getCollecction("certificate");
console.log(result);
  return {
    props: {
      fallback: {
        '/api/certificate': result
      }
    }
  }
};
