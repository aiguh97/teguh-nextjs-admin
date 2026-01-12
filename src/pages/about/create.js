import PageHeading from '@/components/common/PageHeading'
import Container from '@/components/layout/partials/Container'
import AboutForm from '@/components/views/about/AboutForm'
import WithProtected from '@/hoc/withProtected'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import React from 'react'

const create = () => {
  return (
    <>
      <NextSeo title='Create About' />
      <Container>
        <PageHeading title="Create About">
        </PageHeading>
        <AboutForm action="create" />
      </Container>
    </>
  )
}

export default WithProtected(create);
