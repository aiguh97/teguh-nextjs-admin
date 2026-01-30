import PageHeading from "@/components/common/PageHeading";
import Container from "@/components/layout/partials/Container";
import PortfolioTable from "@/components/views/portfolio/Table";
import WithProtected from "@/hoc/withProtected";
import { NextSeo } from "next-seo";
import Link from "next/link";
import useSWR from "swr";
import getCollecction from "@/services/firebase/crud/getCollecction";

const fetcher = async () => {
  const { result } = await getCollecction("portfolio");
  return result;
};

const Index = () => {
  const { data, isLoading } = useSWR("portfolio", fetcher);

  return (
    <>
      <NextSeo title="Portfolio - Teguh Muhammad Harits" />
      <Container>
        <PageHeading title="Portfolio">
          <Link className="btn !px-2 !py-0" href="/portfolio/create">
            Create
          </Link>
        </PageHeading>

        <PortfolioTable data={data || []} isLoading={isLoading} />
      </Container>
    </>
  );
};

export default WithProtected(Index);
