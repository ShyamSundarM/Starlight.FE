import Carousel from "@/components/custom/Carousel";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.homeRoot}>
      <Carousel />
      <div className={styles.aboutMeRoot}></div>
    </div>
  );
}
