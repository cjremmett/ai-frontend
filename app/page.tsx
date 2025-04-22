
import ChatPane from "@/components/ChatPane";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <h1 className={ styles.cjremmett_header}><a className = { styles.cjremmett_link } href="https://cjremmett.com">cjremmett.com</a></h1>
      <ChatPane />
    </>
  );
}
