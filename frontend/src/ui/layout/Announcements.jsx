import { useGetScrolEventsQuery } from "../../features/slices/eventsSlice";
import Loading from "../../ui/preloader/Loading";

const Announcements = () => {
  const { data: announcements, isLoading, error } = useGetScrolEventsQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-4">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-sm sm:text-base text-red-600">
        {error?.data?.message || error.error}
      </p>
    );
  }

  return (
    <section className="mt-3 w-full">
      <div className="full-line-top overflow-hidden" />

      <div className="marquee bg-animation w-full overflow-hidden">
        <div className="marquee-wrapper text_scroll whitespace-nowrap">
          <p className="uppercase text-xs sm:text-sm md:text-base lg:text-lg text-stroke-black inline-flex items-center text-animate">
            <span>{announcements?.announcement1}</span>

            {announcements?.announcement2 && (
              <>
                <span className="px-2">⭐</span>
                <span>{announcements.announcement2}</span>
              </>
            )}

            {announcements?.announcement3 && (
              <>
                <span className="px-2">⭐</span>
                <span>{announcements.announcement3}</span>
              </>
            )}

            {announcements?.announcement4 && (
              <>
                <span className="px-2">⭐</span>
                <span>{announcements.announcement4}</span>
              </>
            )}
          </p>
        </div>
      </div>

      <div className="full-line-bottom -mt-1 sm:-mt-2" />
    </section>
  );
};

export default Announcements;
