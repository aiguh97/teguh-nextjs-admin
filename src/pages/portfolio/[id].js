import PageHeading from '@/components/common/PageHeading'
import Container from '@/components/layout/partials/Container'
import DetailPortfolio from '@/components/views/portfolio/DetailPortfolio'
import getDocument from '@/services/firebase/crud/getDocument'
import { getDoc } from 'firebase/firestore'
import { NextSeo } from 'next-seo'
import React from 'react'

const view = ({ data }) => {
  return (
    <>
      <NextSeo title={`Portfolio - ${data?.name}`} />

      <Container>
        <PageHeading title="View Portfolio">
        </PageHeading>
        <DetailPortfolio data={data} />
      </Container>
    </>
  )
}

export default view
export const getServerSideProps = async ({ params }) => {
  const { result: data } = await getDocument("portfolio", params?.id);
  return { props: { data } };
};
