import PageHeading from '@/components/common/PageHeading'
import Container from '@/components/layout/partials/Container'
import ExperienceForm from '@/components/views/experience/ExperienceForm'
import getDocument from '@/services/firebase/crud/getDocument'
import { NextSeo } from 'next-seo'
import React from 'react'

const update = ({ data }) => {
    return (
        <>
            <NextSeo title={`Update Experience - ${data?.institution}`} />
            <Container>
                <PageHeading title="View Experience">
                </PageHeading>
                <ExperienceForm action="update" initialData={data} />
            </Container>
        </>
    )
}

export default update
export const getServerSideProps = async ({ params }) => {
    const { result: data } = await getDocument("experience", params?.id)
    return { props: { data } }
}