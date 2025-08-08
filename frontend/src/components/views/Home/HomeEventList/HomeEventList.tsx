import Card from "@/components/ui/DisplayCard";
import DisplayCard from "@/components/ui/DisplayCard";
import { IEvent } from "@/types/Event";
import { sortEventsByCreationDate } from "@/utils/sort";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

interface PropTypes {
    title: string;
    events: (IEvent & { createdAt: string })[];
    isLoading: boolean;
}

const HomeEventList = (props: PropTypes) => {
    const { title, events, isLoading } = props;

    return (
        <section>
            <div className="mb-2 flex items-center justify-between px-6 lg:px-0">
                <h2 className="text-2xl font-bold text-danger">{title}</h2>
                <div className="group flex cursor-pointer items-center gap-2">
                    <Link
                        {...(title.toLowerCase().includes("featured")
                            ? { href: "/events?isFeatured=true" }
                            : { href: "/events" })}
                    >
                        See all
                    </Link>
                    <FaArrowRight className="transition duration-300 ease-out group-hover:translate-x-1" />
                </div>
            </div>
            {events?.length === 0 ? (
                <div className="w-full px-6 text-center lg:px-0">
                    <p className="text-lg text-gray-500">
                        {title.includes("Featured")
                            ? "No featured events have been published yet"
                            : "No events have been published yet."}
                    </p>
                </div>
            ) : (
                <div className="grid auto-cols-[20rem] grid-flow-col gap-6 overflow-x-auto py-2 pb-4 lg:grid-cols-4 lg:px-1">
                    {!isLoading
                        ? sortEventsByCreationDate(events).map(
                              (event: IEvent) => (
                                  <DisplayCard
                                      key={`card-event-${event._id}`}
                                      type="event"
                                      data={event}
                                      className="first:ml-6 last:mr-6 lg:first:ml-0 lg:last:mr-0"
                                  />
                              ),
                          )
                        : Array.from({ length: 4 }).map((_, index) => (
                              <DisplayCard
                                  key={`card-event-skeleton-${index}`}
                                  type="event"
                                  className="first:ml-6 last:mr-6 lg:first:ml-0 lg:last:mr-0"
                                  isLoading={isLoading}
                              />
                          ))}
                </div>
            )}
        </section>
    );
};

export default HomeEventList;
