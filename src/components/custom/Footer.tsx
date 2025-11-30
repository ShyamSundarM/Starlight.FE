import { useAppDataStore } from "@/context/store/appDataStore";
import styles from "./footer.module.css";
import { Icon } from "@iconify/react";

export default function Footer() {
  const appData = useAppDataStore();
  return (
    <footer className={styles.footerRoot}>
      <div className={styles.row1}>
        <div className={styles["name"]}>Chinmayi is Starlight</div>
        <div className={styles.socialTags}>
          {appData.socialLinks.map((link) => (
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              key={link.id}
            >
              <Icon icon={link.logo} width="16" className={styles.icon} />
            </a>
          ))}
        </div>
      </div>
      <div className={styles.row2}>
        © {new Date().getFullYear()} Starlight. All rights reserved.
      </div>
    </footer>
  );
}
