import { Button } from "../ui/button";
import styles from "./footer.module.css";
import { Icon } from "@iconify/react";

export default function Footer() {
  return (
    <footer className={styles.footerRoot}>
      <div className={styles.row1}>
        <div className={styles["name"]}>Chinmayi is Starlight</div>
        <div className={styles.socialTags}>
          <a
            href="https://www.instagram.com/for_you__products/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon
              icon="skill-icons:instagram"
              width="16"
              className={styles.icon}
            />
          </a>
          <a
            href="https://www.threads.com/@for_you__products"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon icon="hugeicons:threads" width="16" className={styles.icon} />
          </a>

          <a
            href="https://www.youtube.com/@for_you__products"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon
              icon="logos:youtube-icon"
              width="16"
              className={styles.icon}
            />
          </a>

          <a
            href="https://in.pinterest.com/for_you__products"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon icon="logos:pinterest" width={16} className={styles.icon} />
          </a>
        </div>
      </div>
      <div className={styles.row2}>
        © {new Date().getFullYear()} Starlight. All rights reserved.
      </div>
    </footer>
  );
}
