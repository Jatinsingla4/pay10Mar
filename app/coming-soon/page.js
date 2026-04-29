import React from 'react'
import Style from './coming-soon.module.scss'
import Link from 'next/link'

const page = () => {
  return (
    <>
    <section className={Style.wrapper}>
      <div className={Style.coming_soon_main}>
        <div className={Style.coming_soon_content}>
          <h2 data-animation="opacity-up">Coming soon</h2>
          <h3 data-animation="opacity-up">Something exciting is on the way!</h3>

          <p data-animation="opacity-up">
          Our new page is under construction, stay tuned for updates and get ready for what’s coming next.
          </p>

          <div data-animation="opacity-up">
            <Link href="/">Visit the homepage</Link>
          </div>
        </div>

        <div className={Style.coming_soon_img} data-animation="scale-up">
          <img src="/images/coming_soon_img/comingsoon.svg" alt="Coming soon" />
        </div>
      </div>
    </section>
    </>
  )
}

export default page