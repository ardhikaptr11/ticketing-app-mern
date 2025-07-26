import Image from "next/image";
import HomeEventList from "./HomeEventList";
import HomeSlider from "./HomeSlider";
import useHome from "./useHome";
import { Skeleton } from "@heroui/react";
import HomeCategoryList from "./HomeCategoryList";

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

    return (
        <div>
            <HomeSlider
                banners={dataBanners?.data}
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
                    src="https://res.cloudinary.com/dryfiuvhw/image/upload/v1753281372/zentix-uploads/lcqiloahiokbnkyansst.jpg"
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
