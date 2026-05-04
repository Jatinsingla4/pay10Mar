import Image from 'next/image';
import styles from './TextCenterBlock.module.scss';
import Link from 'next/link';

const gridBoxes = [
  {
    heading: 'Merchant App',
    img1: '/images/foo-app1.svg',
    img2: '/images/foo-app2.svg',
  },
  {
    heading: 'Consumer App',
    img1: '/images/foo-app1.svg',
    img2: '/images/foo-app2.svg',
  },
];

export default function TextCenterBlock({
  heading = 'The Possibilities are Endless',
  description = 'Protect your time, money, and peace of mind with fast, easy, secure payments and transfers from anywhere in the world. Thanks to the Pay10 app, you can spend your time and money on living your best life.',
}) {
  return (
    <section className={styles.banner}>
      <div className={styles.content}>
        <h3 className={styles.kicker} data-animation="opacity-up">{heading}</h3>
        <p className={styles.desc} data-animation="opacity-up">
          {description}
        </p>

        <div className={styles.boxes_grid}>
          {gridBoxes.map((box, idx) => (
            <div key={idx} className={styles.box}>
              <h3>{box.heading}</h3>
              <div className={styles.btns}>
                <Link href="#">
                  <Image
                    width={151}
                    height={36}
                    loading="eager"
                    src={box.img1}
                    alt="App Links"
                  />
                </Link>
                <Link href="#">
                  <Image
                    width={129}
                    height={36}
                    loading="eager"
                    src={box.img2}
                    alt="App Links"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
        {/* <ContactCtaBtn variant="orange" /> */}
      </div>
    </section>
  );
}
