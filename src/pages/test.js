import EmployeeComponent from "../global/EmployeeComponent";
import styles from "../styles/TestPage.module.css";

export default function TestPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Test Employee Firebase</h1>
      <EmployeeComponent />
    </div>
  );
}
