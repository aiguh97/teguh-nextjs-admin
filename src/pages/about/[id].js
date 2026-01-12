import PageHeading from '@/components/common/PageHeading'
import Container from '@/components/layout/partials/Container'
import DetailAbout from '@/components/views/about/DetailAbout'
import getDocument from '@/services/firebase/crud/getDocument'
import { getDoc } from 'firebase/firestore'
import { NextSeo } from 'next-seo'
import React from 'react'

const view = ({ data }) => {
  return (
    <>
      <NextSeo title={`About`} />
      <Container>
        <PageHeading title="View About">
        </PageHeading>
        <DetailAbout data={data} />
      </Container>
    </>
  )
}

export default view
export const getServerSideProps = async ({ params }) => {
  const { result: data } = await getDocument("about", params?.id)
  return { props: { data } }
}