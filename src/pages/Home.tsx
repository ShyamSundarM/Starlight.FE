import Carousel from "@/components/custom/Carousel";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.homeRoot}>
      <div className={styles.carouselRoot}>
        <Carousel />
      </div>
      <div className={styles.aboutMeRoot}>
        <div className={styles.point}>
          <div className={styles.title}>
            ✨ Premium UGC for Modern Beauty Brands
          </div>
          <div className={styles.message}>
            Elevating skincare, beauty, lifestyle & fashion through refined,
            story-driven content.
          </div>
        </div>

        <div className={styles.point}>
          <div className={styles.title}>💎 Authentic Visual Storytelling</div>
          <div className={styles.message}>
            Crafted with clean aesthetics, soft tones, and luxury-grade
            attention to detail.
          </div>
        </div>

        <div className={styles.point}>
          <div className={styles.title}>🌸 Beauty & Skincare Expertise</div>
          <div className={styles.message}>
            Real routines, real results — created to build trust and desire.
          </div>
        </div>

        <div className={styles.point}>
          <div className={styles.title}>👗 Lifestyle & Fashion Elegance</div>
          <div className={styles.message}>
            Minimal, modern, and sophisticated — tailored for high-end brand
            presence.
          </div>
        </div>

        <div className={styles.endPoint}>
          ✨ Luxury. Minimalism. Authentic Influence.
        </div>
      </div>
    </div>
  );
}
