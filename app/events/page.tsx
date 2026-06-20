"use client";

import ConcertCard from "@/src/components/concertCard";
import EventsFilterBox from "@/src/components/eventFilterBox";
import { GetConserts } from "@/src/service/concert";
import { Concert } from "@/src/types/concert";
import { useMemo, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";
import LoadingBox from "@/src/components/loadingBox";
import EmptyPage from "@/src/components/emptyPage";

export default function Page() {
  const searchParams = useSearchParams();

  const city = searchParams.get("city") || "";
  const search = searchParams.get("search") || "";
  const limit = Number(searchParams.get("limit") || "10");

  const loaderRef = useRef<HTMLDivElement | null>(null);


  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["events", city, search, limit],

    initialPageParam: 1,

    queryFn: async ({ pageParam }) => {
      const res = await GetConserts({
        page: pageParam,
        limit,
        search: search,
        location: city,
      });

      return res.data.data;
    },

    getNextPageParam: (lastPage) => {
      const current = lastPage.current_page;
      const total = lastPage.total_pages;

      return current < total ? current + 1 : undefined;
    },
  });

  // flatten events
  const events: Concert[] = useMemo(() => {
    return data?.pages.flatMap((p) => p.events) || [];
  }, [data]);

  // auto load more when visible
  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (
          target.isIntersecting &&
          hasNextPage &&
          !isFetchingNextPage
        ) {
          fetchNextPage();
        }
      },
      {
        threshold: 1.0,
      }
    );

    observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) return <LoadingBox />;
  if (error)
    return <div className="mt-20 text-center">Failed to load events</div>;

  return (
    <div className="mt-20">
      <EventsFilterBox />

      {events.length > 0
        ? <section className="relative mx-8 my-4 py-10 px-4 sm:px-6 lg:px-10 rounded-2xl overflow-hidden bg-linear-to-br from-white via-slate-50 to-violet-50">

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {events.map((c: Concert) => (
              <ConcertCard key={c.id} concert={c} />
            ))}
          </div>

          {/* TRIGGER ELEMENT */}
          <div
            ref={loaderRef}
            className="h-10 flex items-center justify-center mt-10"
          >
            {isFetchingNextPage && (
              <span className="text-sm text-gray-400">
                Loading more...
              </span>
            )}
          </div>
        </section>
        : <EmptyPage />
      }
    </div>

  );
}