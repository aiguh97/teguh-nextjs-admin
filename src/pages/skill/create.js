import PageHeading from '@/components/common/PageHeading'
import Container from '@/components/layout/partials/Container'
import SkillForm from '@/components/views/skill/SkillForm'
import WithProtected from '@/hoc/withProtected'
import { NextSeo } from 'next-seo'
import React from 'react'

const create = () => {
  return (
    <>
      <NextSeo title='Create Skill' />
      <Container>
        <PageHeading title="Create Skill">
        </PageHeading>
        <SkillForm action="create" />
      </Container>
    </>
  )
}

export default WithProtected(create);
