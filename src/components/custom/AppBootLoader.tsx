import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import styles from "./AppBootLoader.module.css";

interface AppBootLoaderProps {
  isLoading: boolean;
  finalWords?: string[];
}

export default function AppBootLoader({
  isLoading,
  finalWords = ["Ready", "Set", "Go"],
}: AppBootLoaderProps) {
  const [showWords, setShowWords] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => setShowWords(true), 300);
      setTimeout(() => setDone(true), 2000);
    }
  }, [isLoading]);

  if (done) return null;

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-[9999]">
      {!showWords ? (
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-10 w-10 animate-spin text-gray-600" />
          <p className="text-gray-600 text-lg">Loading store ...</p>
        </div>
      ) : (
        <div className="flex gap-5 text-4xl font-bold">
          {finalWords.map((word, i) => (
            <span
              key={i}
              className={styles.wordEnter}
              style={{ animationDelay: `${i * 0.5}s` }}
            >
              {word}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
