import { useEffect, useState } from "react";
import styles from "./flip.module.css";

interface SiteConfigMap {
  [key: string]: { value: string };
}

interface Props {
  siteConfig: SiteConfigMap;
}

const FlipImage: React.FC<Props> = ({ siteConfig }) => {
  const img1 = siteConfig["LogoUrl"]?.value;
  const img2 = siteConfig["Influencer_logo"]?.value;

  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => prev + 180); // always flip forward
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <div
        className={styles.flip}
        style={{ transform: `rotateY(${rotation}deg)` }}
      >
        {/* Front Image */}
        <img src={img1} className={styles.face} alt="front" />

        {/* Back Image */}
        <img
          src={img2}
          className={`${styles.face} ${styles.back} ${styles.logoImage}`}
          alt="back"
        />
      </div>
    </div>
  );
};

export default FlipImage;
