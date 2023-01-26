import Image from "next/image";
import Demo from "./Demo";
import { Inter } from "@next/font/google";
import styles from "./page.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    // className={styles.main}
    <main >
      <Demo />
    </main>
  );
}
