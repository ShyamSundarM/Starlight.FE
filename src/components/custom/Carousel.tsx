import { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import styles from "./Carousel.module.css";
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

  const [cardDetails, setCardDetails] = useState<
    { id: number; key: string; value: string }[]
  >([]);

  useEffect(() => {
    const items = carouselKeys.map((key, index) => ({
      key,
      value: siteConfig[key]?.value || "",
      id: index,
    }));
    setCardDetails(items);
  }, [siteConfig]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      skipSnaps: false,
    },
    [
      Autoplay({
        delay: 2000,
        stopOnInteraction: false,
      }),
    ]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", onSelect);

    // Start on slide 2 like you wanted
    emblaApi.scrollTo(1, true);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.viewport} ref={emblaRef}>
        <div className={styles.container}>
          {cardDetails.map((c, index) => {
            const isActive = index === selectedIndex;

            return (
              <div
                key={c.id}
                className={`${styles.slide} ${
                  isActive ? styles.activeSlide : styles.inactiveSlide
                }`}
              >
                <div className={styles.card}>
                  <img src={c.value} alt={c.key} className={styles.image} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
