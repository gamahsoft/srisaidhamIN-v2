// import { useAnnouncements } from "../../features/announcements/useAnnouncements";
import { useGetScrolEventsQuery } from "../../features/slices/eventsSlice";
import Loading from "../../ui/preloader/Loading";

const Announcements = () => {
  // const { isLoading, error, data: announcements } = useAnnouncements();

  // if (isLoading) return <h1>Loading....</h1>;
  // if (error) return <h1>Error fetching announcements data</h1>;
  const { data: announcements, isLoading, error } = useGetScrolEventsQuery();

  if (isLoading)
    return (
      <h1 className="flex flex-col items-center justify-center">
        <Loading />
      </h1>
    );
  if (error) return <h1>{error?.data?.message || error.error}</h1>;

  return (
    <section className="mt-3">
      <div className="full-line-top overflow-hidden" />

      <div className="marquee bg-animation">
        <h3 className="uppercase text-xl text-stroke-black">
          <div className="marquee-wrapper text_scroll">
            {/* first div occurance */}
            <div className="float-left mr-2 text-animate">
              <span>{announcements?.announcement1}</span>

              {announcements?.announcement2 && (
                <>
                  <span className="pl-2 pr-2">🎗️</span>
                  <span> {announcements?.announcement2} </span>
                </>
              )}
              {announcements?.announcement3 && (
                <>
                  <span className="pl-2 pr-2">🎗️</span>
                  <span> {announcements?.announcement3} </span>
                </>
              )}
              {announcements?.announcement4 && (
                <>
                  <span className="pl-2 pr-2">🎗️</span>
                  <span> {announcements?.announcement4} </span>
                </>
              )}
            </div>
          </div>
        </h3>
      </div>
      <div className="full-line-bottom -mt-2 " />
    </section>
  );
};

export default Announcements;
