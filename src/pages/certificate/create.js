import { BackButton } from "@/components/common/BackButton";
import PageHeading from "@/components/common/PageHeading";
import Container from "@/components/layout/partials/Container";
import CreateBlog from "@/components/views/blog/create";
import CertificateForm from "@/components/views/certificate/CertificateForm";
import WithProtected from "@/hoc/withProtected";
import { NextSeo } from "next-seo";
import Link from "next/link";
import React from "react";

const create = () => {
  return (
    <>
      <NextSeo title='Create Certificate' />
      <Container>
        <PageHeading title="Create Certificate" />
        <CertificateForm action="create" />
      </Container>
    </>
  );
};

export default WithProtected(create);
