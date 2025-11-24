import Carousel from "@/components/custom/Carousel";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.homeRoot}>
      <div className={styles.carouselRoot}>
        <Carousel />
      </div>
      <div className={styles.aboutMeRoot}>
        <div>Chinmayi is Starlight</div>
      </div>
    </div>
  );
}
