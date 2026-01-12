import PageHeading from '@/components/common/PageHeading'
import Container from '@/components/layout/partials/Container'
import PortfolioTable from '@/components/views/portfolio/Table'
import WithProtected from '@/hoc/withProtected'
import getCollecction from '@/services/firebase/crud/getCollecction'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import React from 'react'
import { SWRConfig } from 'swr'

const index = ({ data }) => {

  return (
    <>
      <NextSeo title='Portfolio - Dwi Wijaya' />
      <Container>
        <PageHeading title="Portfolio">
          <Link className='btn !px-2 !py-0' href="/portfolio/create"><i className='text-xl bx bx-list-plus'></i> Create</Link>
        </PageHeading>
        <PortfolioTable data={data} />
      </Container>
    </>
  )
}

export default WithProtected(index);
export const getServerSideProps = async () => {

  const { result } = await getCollecction("portfolio");
  return {
    props: {
      data: result
    }
  }
};
