import styles from '../styles/500.module.scss';

export default function Custom500() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.text}>
        <h1>500</h1>
      </div>
      <h3>something went wront on the server...</h3>
      <h6>i'm more of a frontend guy</h6>
    </div>
  )
}
