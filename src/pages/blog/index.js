import PageHeading from '@/components/common/PageHeading'
import Container from '@/components/layout/partials/Container'
import WithProtected from '@/hoc/withProtected'
import Link from 'next/link'
import React from 'react'

const index = () => {
  return (
    <>
      <NextSeo title='Skillset - Dwi Wijaya' />
      <Container>
        <PageHeading title="Blog">
          <Link className='btn !px-2 !py-0' href="/blog/create"><i className='text-xl bx bx-list-plus'></i> Create</Link>
        </PageHeading>
      </Container>
    </>
  )
}

export default WithProtected(index)