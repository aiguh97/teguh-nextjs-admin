import { BackButton } from "@/components/common/BackButton";
import PageHeading from "@/components/common/PageHeading";
import Container from "@/components/layout/partials/Container";
import CreateBlog from "@/components/views/blog/create";
import PortfolioForm from "@/components/views/portfolio/PortfolioForm";
import WithProtected from "@/hoc/withProtected";
import getCollecction from "@/services/firebase/crud/getCollecction";
import { NextSeo } from "next-seo";
import Link from "next/link";
import React from "react";

const create = ({ skills }) => {
  return (
    <>
      <NextSeo title='Create Portfolio' />

      <Container>
        <PageHeading title="Create Portfolio" />
        <PortfolioForm action="create" skills={skills} />
      </Container>
    </>
  );
};

export default WithProtected(create);
export const getServerSideProps = async () => {

  const { result: skills } = await getCollecction('skill');
  return {
    props: {
      skills
    }
  }
};