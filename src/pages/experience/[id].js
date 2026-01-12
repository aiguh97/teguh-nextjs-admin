import PageHeading from '@/components/common/PageHeading'
import Container from '@/components/layout/partials/Container'
import DetailExperience from '@/components/views/experience/DetailExperience'
import getDocument from '@/services/firebase/crud/getDocument'
import { getDoc } from 'firebase/firestore'
import { NextSeo } from 'next-seo'
import React from 'react'

const view = ({ data }) => {
  return (
    <>
      <NextSeo title={`Experience - ${data?.institution}`} />
      <Container>
        <PageHeading title="View Experience">
        </PageHeading>
        <DetailExperience data={data} />
      </Container>
    </>
  )
}

export default view
export const getServerSideProps = async ({ params }) => {
  const { result: data } = await getDocument("experience", params?.id)
  return { props: { data } }
}