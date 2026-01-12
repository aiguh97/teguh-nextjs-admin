import PageHeading from '@/components/common/PageHeading'
import Container from '@/components/layout/partials/Container'
import AboutForm from '@/components/views/about/AboutForm'
import getDocument from '@/services/firebase/crud/getDocument'
import { NextSeo } from 'next-seo'
import React from 'react'

const update = ({ data }) => {
    return (
        <>
            <NextSeo title='Update About' />
            <Container>
                <PageHeading title="View About">
                </PageHeading>
                <AboutForm action="update" initialData={data} />
            </Container>
        </>
    )
}

export default update
export const getServerSideProps = async ({ params }) => {
    const { result: data } = await getDocument("about", params?.id)
    return { props: { data } }
}