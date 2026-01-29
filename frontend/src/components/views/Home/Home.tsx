import Image from "next/image";
import HomeEventList from "./HomeEventList";
import HomeSlider from "./HomeSlider";
import useHome from "./useHome";
import { Skeleton } from "@heroui/react";
import HomeCategoryList from "./HomeCategoryList";
import { IBanner } from "@/types/Banner";

const Home = () => {
    const {
        dataBanners,
        dataCategories,
        dataFeaturedEvents,
        dataLatestEvents,
        isLoadingBanners,
        isLoadingCategories,
        isLoadingFeaturedEvents,
        isLoadingLatestEvents,
    } = useHome();

    const sortedBanners = dataBanners?.data?.sort((a: IBanner, b: IBanner) =>
        (b.title as string).localeCompare(a.title as string),
    );

    const [banner, ...homeSliderBanners] = sortedBanners || [];

    return (
        <div>
            <HomeSlider
                banners={homeSliderBanners}
                isLoadingBanners={isLoadingBanners}
            />
            <HomeEventList
                title="Featured Events"
                events={dataFeaturedEvents?.data}
                isLoading={isLoadingFeaturedEvents}
            />
            <Skeleton
                isLoaded={!isLoadingBanners}
                className="mx-6 mb-6 h-fit rounded-2xl lg:mx-0"
            >
                <Image
                    src={banner?.image}
                    alt="Front page banner"
                    width={1920}
                    height={800}
                    className="h-[80%] w-full rounded-2xl object-cover object-center lg:my-8 lg:h-[90%]"
                />
            </Skeleton>
            <HomeEventList
                title="Latest Events"
                events={dataLatestEvents?.data}
                isLoading={isLoadingLatestEvents}
            />
            <HomeCategoryList
                title="Event By Category"
                dataCategories={dataCategories?.data}
                isLoadingCategories={isLoadingCategories}
            />
        </div>
    );
};

export default Home;
