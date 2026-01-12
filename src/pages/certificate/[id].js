import PageHeading from '@/components/common/PageHeading'
import Container from '@/components/layout/partials/Container'
import DetailCertificate from '@/components/views/certificate/DetailCertificate'
import getDocument from '@/services/firebase/crud/getDocument'
import { getDoc } from 'firebase/firestore'
import { NextSeo } from 'next-seo'
import React from 'react'

const view = ({ data }) => {
  return (
    <>
      <NextSeo title={`Certificate - ${data?.name}`} />
      <Container>
        <PageHeading title="View Certificate">
        </PageHeading>
        <DetailCertificate data={data} />
      </Container>
    </>
  )
}

export default view
export const getServerSideProps = async ({ params }) => {
  const { result: data } = await getDocument("certificate", params?.id, true, 'image')
  return { props: { data } }
}