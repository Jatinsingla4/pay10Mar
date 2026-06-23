import Image from 'next/image';
import styles from './CertificationLicensing.module.scss';

export default function CertificationLicensing({
  heading = 'Pay Ten Payment Services Provider LLC (Pay10) is licensed and regulated by the Central Bank of the UAE.',
  centralBankImage,
  licensedByHeading = 'Licensed by:',
  licenseImages = [],
}) {
  return (
    <section className={styles.banner}>
      <div className={styles.content}>
        <p className={styles.mainText} data-animation="opacity-up">
          {heading}
        </p>

        {centralBankImage && (
          <div className={styles.centralBankSection} data-animation="opacity-up">
            <div className={styles.logoContainer}>
              <Image
                src={centralBankImage}
                alt="Central Bank of the UAE"
                width={200}
                height={100}
                className={styles.centralBankLogo}
              />
            </div>
          </div>
        )}

        {licensedByHeading && (
          <p className={styles.licensedBy} data-animation="opacity-up">
            {licensedByHeading}
          </p>
        )}

        {licenseImages && licenseImages.length > 0 && (
          <div className={styles.badgesGrid} data-animation="opacity-up" data-anim-delay="200">
            {licenseImages.map((item, index) => (
              <div key={index} className={styles.badgeCard}>
                <Image
                  src={item.Image || item.image || item}
                  alt={`License ${index + 1}`}
                  width={200}
                  height={200}
                  className={styles.badgeImage}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
