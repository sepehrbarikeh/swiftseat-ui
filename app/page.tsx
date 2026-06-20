'use client'
import ExploreEventsCTA from "@/src/components/cta";
import EventSection from "@/src/components/EventSection";
import Footer from "@/src/components/footer";
import HeroSection from "@/src/components/heroSection";
import {GetHomeConcert} from "@/src/service/concert";
import { HomeConcert } from "@/src/types/concert";
import { useEffect, useState } from "react";

export default function Home() {

  const [data, setData] = useState<HomeConcert>()


  useEffect(() => {
    const fetchData = async () => {
      const res = await GetHomeConcert();
      console.log(res);
      setData(res.data);
    };

    fetchData();
  }, []);


  return (
    <>
      <main className="min-h-screen bg-slate-100 pt-20">
        <HeroSection />
        {data?.popular
          ? <EventSection title={"🔥 Popular Events"} concert={data?.popular} />
          : <></>}
        {
          data?.upcoming
            ? <EventSection title={"📍 Upcoming Events"} concert={data?.upcoming} />
            : <></>
        }
        <ExploreEventsCTA />
      </main>
      <Footer />
    </>
  );
}