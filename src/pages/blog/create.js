import { BackButton } from "@/components/common/BackButton";
import PageHeading from "@/components/common/PageHeading";
import Container from "@/components/layout/partials/Container";
import CreateBlog from "@/components/views/blog/create";
import WithProtected from "@/hoc/withProtected";
import Link from "next/link";
import React from "react";

const create = () => {
  return (
    <>
      <NextSeo title='Skillset - Dwi Wijaya' />
      <Container>
        <PageHeading title="Create Blog" />
        <CreateBlog />
      </Container>
    </>
  );
};

export default WithProtected(create);
