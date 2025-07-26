import { IBanner } from "@/types/Banner";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Skeleton } from "@heroui/react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import { sortShowingBanners } from "@/utils/sort";

interface PropTypes {
    banners: IBanner[];
    isLoadingBanners: boolean;
}

const HomeSlider = (props: PropTypes) => {
    const { banners, isLoadingBanners } = props;

    return (
        <div className="mx-6 h-[25vw] lg:mx-0">
            {!isLoadingBanners ? (
                <Swiper
                    loop
                    pagination={{
                        clickable: true,
                    }}
                    spaceBetween={30}
                    modules={[Autoplay]}
                    className="h-full w-full"
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                >
                    {sortShowingBanners(banners).map((banner: IBanner) => (
                        <SwiperSlide key={banner._id}>
                            <Image
                                src={`${banner.image}`}
                                alt={`${banner.title}`}
                                className="h-[80%] w-full rounded-2xl object-cover lg:h-[90%]"
                                width={1920}
                                height={800}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <Skeleton className="h-[80%] w-full rounded-2xl" />
            )}
        </div>
    );
};

export default HomeSlider;
