import Container from '@/components/layout/partials/Container'
import Dashboard from '@/components/views/dashboard/Dashboard'
import WithProtected from '@/hoc/withProtected'
import React from 'react'

const dashboard = () => {
  return (
    <>
    <Container>
        <Dashboard/>
    </Container>
    </>
  )
}

export default WithProtected(dashboard);