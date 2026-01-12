import PageHeading from '@/components/common/PageHeading'
import Container from '@/components/layout/partials/Container'
import DetailSkill from '@/components/views/skill/DetailSkill'
import getDocument from '@/services/firebase/crud/getDocument'
import { getDoc } from 'firebase/firestore'
import { NextSeo } from 'next-seo'
import React from 'react'

const view = ({ data }) => {
  return (
    <>
      <NextSeo title={`Skill - ${data?.name}`} />
      <Container>
        <PageHeading title="View Skill">
        </PageHeading>
        <DetailSkill {...data} />
      </Container>
    </>
  )
}

export default view
export const getServerSideProps = async ({ params }) => {
  const { result: data } = await getDocument("skill", params?.id)
  return { props: { data } }
}