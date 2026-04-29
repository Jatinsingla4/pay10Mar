import ContactCtaBtn from './ContactCtaBtn';
import styles from './TextCenterBlock.module.scss';

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
        {/* <ContactCtaBtn variant="orange" /> */}
      </div>
    </section>
  );
}
