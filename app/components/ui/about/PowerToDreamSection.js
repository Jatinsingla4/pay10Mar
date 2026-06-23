import styles from './PowerToDreamSection.module.scss';

export default function PowerToDreamSection({ imgPrimary, imgSecondary, heading, description }) {
  return (
    <div className={styles.section}>
      <div className={styles.imagesWrap} data-animation="opacity-up">
        <img src={imgPrimary} alt="" className={styles.imgPrimary} />
        <img src={imgSecondary} alt="" className={styles.imgSecondary} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.heading} data-animation="opacity-up">{heading}</h3>
        <p className={styles.description} data-animation="opacity-up">{description}</p>
      </div>
    </div>
  );
}
