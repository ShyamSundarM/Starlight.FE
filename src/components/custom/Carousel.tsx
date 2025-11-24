import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

import styles from "./Carousel.module.css";
import { useEffect, useState } from "react";
import { useAppDataStore } from "@/context/store/appDataStore";

const carouselKeys = [
  "carousel_chinmayi_red_dress_standing_nature",
  "carousel_chinmayi_blue_saree_sitting_diwali",
  "carousel_chinmayi_pink_saree_standing",
  "carousel_chinmayi_standing_pink_dress",
  "carousel_chinmayi_blue_saree_diwali",
  "carousel_chinmayi_sitting_yellow_dress",
  "carousel_chinmayi_holding_calf",
  "carousel_chinmayi_sitting_blue_dress",
  "carousel_chinmai_standing_black_saree",
];

export default function Carousel() {
  const { siteConfig } = useAppDataStore();
  useEffect(() => {
    const items = carouselKeys.map((key, index) => ({
      key,
      value: siteConfig[key].value || "",
      id: index,
    }));
    setCardDetails(items);
  }, [siteConfig]);
  const [cardDetails, setCardDetails] = useState<
    {
      id: number;
      key: string;
      value: string;
    }[]
  >([]);

  return (
    <div className={styles.wrapper}>
      <Swiper
        initialSlide={1}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={2.8}
        //loop={true}
        navigation={true}
        //spaceBetween={-120}
        modules={[EffectCoverflow, Navigation, Autoplay]}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 300,
          modifier: 1.6,
          slideShadows: false,
        }}
        className={styles.swiperContainer}
      >
        {cardDetails.map((c) => (
          <SwiperSlide key={c.id}>
            <div className={styles.card}>
              <img src={c.value} alt={c.key} className={styles.image} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
