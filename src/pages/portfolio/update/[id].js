import PageHeading from '@/components/common/PageHeading'
import Container from '@/components/layout/partials/Container'
import PortfolioForm from '@/components/views/portfolio/PortfolioForm'
import getCollecction from '@/services/firebase/crud/getCollecction'
import getDocument from '@/services/firebase/crud/getDocument'
import { NextSeo } from 'next-seo'
import React from 'react'

const update = ({ data, skills }) => {
    return (
        <>
            <NextSeo title={`Update Portfolio - ${data?.name}`} />
            <Container>
                <PageHeading title="Update Portfolio">
                </PageHeading>
                <PortfolioForm action="update" initialData={data} skills={skills} />
            </Container>
        </>
    )
}

export default update
export const getServerSideProps = async ({ params }) => {
    const { result: data } = await getDocument("portfolio", params?.id)
    const { result: skills } = await getCollecction('skill');
    return { props: { data, skills } }
}