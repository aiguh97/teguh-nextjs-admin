import PageHeading from '@/components/common/PageHeading'
import Container from '@/components/layout/partials/Container'
import SkillForm from '@/components/views/skill/SkillForm'
import getDocument from '@/services/firebase/crud/getDocument'
import { NextSeo } from 'next-seo'
import React from 'react'

const update = ({ data }) => {
    return (
        <>
            <NextSeo title={`Update Skill - ${data?.name}`} />
            <Container>
                <PageHeading title="View Skill">
                </PageHeading>
                <SkillForm action="update" initialData={data} />
            </Container>
        </>
    )
}

export default update
export const getServerSideProps = async ({ params }) => {
    const { result: data } = await getDocument("skill", params?.id)
    return { props: { data } }
}