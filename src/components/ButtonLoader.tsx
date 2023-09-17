import styles from '../styles/components/ButtonLoader.module.css';

export const ButtonLoader = () => {
  return(
    <div className={styles.ldsRing}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}