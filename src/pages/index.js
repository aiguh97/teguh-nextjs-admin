import Image from "next/image";
import { Inter } from "next/font/google";
import LoginForm from "@/components/form/LoginForm";
import { useUser } from "@/context/user";
import Container from "@/components/layout/partials/Container";
import Dashboard from "@/components/views/dashboard/Dashboard";
import { NextSeo } from "next-seo";
const inter = Inter({ subsets: ["latin"] });

export default function Home({ initialData }) {
  const user = useUser();
  return (
    <>
      <NextSeo title='Dashboard - Dwi Wijaya' />
      <Container>
        <Dashboard initialData={initialData} />
      </Container>
    </>
  );
}
// import axios from 'axios';

// export async function getServerSideProps(context) {
//   const token = process.env.NEXT_PUBLIC_UMAMI_TOKEN;
//   const startDate = Date.now() - 24 * 60 * 60 * 1000; // 24 jam yang lalu
//   const endDate = Date.now();
//   const response = await axios.get(`https://analytics.dwiwijaya.com/api/websites/${process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}/stats`, {
//     params: {
//       startAt: startDate,
//       endAt: endDate,
//       unit: 'hour'
//     },
//     headers: {
//       'Authorization': `bearer ${token}`
//     }
//   });

//   return {
//     props: {
//       initialData: response.data
//     }
//   };
// }
