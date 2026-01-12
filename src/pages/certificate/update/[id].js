import PageHeading from '@/components/common/PageHeading'
import Container from '@/components/layout/partials/Container'
import CertificateForm from '@/components/views/certificate/CertificateForm'
import getDocument from '@/services/firebase/crud/getDocument'
import { NextSeo } from 'next-seo'
import React from 'react'

const update = ({ data }) => {
    return (
        <>
            <NextSeo title={`Update Certificate - ${data?.name}`} />
            <Container>
                <PageHeading title="View Certificate">
                </PageHeading>
                <CertificateForm action="update" initialData={data} />
            </Container>
        </>
    )
}

export default update
export const getServerSideProps = async ({ params }) => {
    const { result: data } = await getDocument("certificate", params?.id)
    return { props: { data } }
}