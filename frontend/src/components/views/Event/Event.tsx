import React, { useEffect } from "react";
import useEvent from "./useEvent";
import DisplayCard from "@/components/ui/DisplayCard";
import { sortEventsByCreationDate } from "@/utils/sort";
import { IEvent } from "@/types/Event";
import { useRouter } from "next/router";
import useChangeURL from "@/hooks/useChangeURL";
import EventFooter from "./EventFooter";
import {
    ALLOWED_LIMITS,
    LIMIT_DEFAULT,
    PAGE_DEFAULT,
} from "@/constants/list.constants";
import EventFilter from "./EventFilter";

const Event = () => {
    const { dataEvents, isLoadingEvents, isRefetchingEvents } = useEvent();

    const { isReady, replace } = useRouter();
    const {
        currentCategory,
        currentIsFeatured,
        currentIsOnline,
        currentLimit,
        setUrlExplore,
        currentSearch,
    } = useChangeURL();

    useEffect(() => {
        if (isReady) {
            if (!ALLOWED_LIMITS.includes(currentLimit as string)) {
                replace({
                    query: {
                        limit: LIMIT_DEFAULT,
                        page: PAGE_DEFAULT,
                        category: currentCategory || "",
                        isOnline: currentIsOnline || "",
                        isFeatured: currentIsFeatured || "",
                    },
                });
                return;
            }

            setUrlExplore();
        }
    }, [isReady]);

    return (
        <div className="flex w-full flex-col justify-center gap-6 px-4 lg:flex-row lg:px-0">
            <EventFilter />
            <div className="min-h-[70vh] w-fit flex-1">
                <div className="mb-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {!isLoadingEvents && !isRefetchingEvents
                        ? sortEventsByCreationDate(dataEvents?.data).map(
                              (event: IEvent) => (
                                  <DisplayCard
                                      key={`card-event-${event._id}`}
                                      type="event"
                                      data={event}
                                  />
                              ),
                          )
                        : Array.from({ length: 3 }).map((_, index) => (
                              <DisplayCard
                                  key={`card-event-skeleton-${index}`}
                                  type="event"
                                  isLoading={
                                      isLoadingEvents || isRefetchingEvents
                                  }
                              />
                          ))}
                </div>
                {!isLoadingEvents && dataEvents?.data.length > 0 && (
                    <EventFooter totalPages={dataEvents?.totalPages} />
                )}
            </div>
        </div>
    );
};

export default Event;
