import React from 'react';
import './Footer.css';

const Testimonial = () => {

  // eslint-disable-next-line no-unused-vars

  return (
    <>
      <section className='container mb-5'>
  <div className="row d-flex justify-content-center">
    <div className="col-md-10 col-xl-8 text-center">
      <h1 className="my-5">Testimonials</h1>
    </div>
  </div>

  <div className="row text-center" style={{display: 'flex', margin: 'auto', alignItems: 'center', justifyContent: 'center'}}>
    <div className="col-md-4 mb-5 mb-md-0">
      <div className="d-flex justify-content-center mb-4">
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp"
          className="rounded-circle shadow-1-strong"
          width="150"
          height="150"
          alt='testimonial-img'
        />
      </div>
      <h5 className="mb-3">Maria Smantha</h5>
      <h6 className="text-primary mb-3">Web Developer</h6>
      <p className="px-xl-3">
        <i className="testimonial-i fas fa-quote-left pe-2"></i>
        <p className='testimonial-heading'>I don't have words to thank this man, I'm really grateful to have this channel and website in my daily routine. If you're a mere beginner, then you can trust this guy and can put your time into his content. I can assure you that it'll be worth it.</p>
      </p>
      <ul className="list-unstyled d-flex justify-content-center mb-0">
        <li>
          <i className="fas fa-star fa-sm text-warning"></i>
        </li>
        <li>
          <i className="fas fa-star fa-sm text-warning"></i>
        </li>
        <li>
          <i className="fas fa-star fa-sm text-warning"></i>
        </li>
        <li>
          <i className="fas fa-star fa-sm text-warning"></i>
        </li>
        <li>
          <i className="fas fa-star-half-alt fa-sm text-warning"></i>
        </li>
      </ul>
    </div>
    <div className="col-md-4 mb-5 mb-md-0">
      <div className="d-flex justify-content-center mb-4">
        <img
          src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg"
          className="rounded-circle shadow-1-strong"
          width="150"
          height="150"
          alt='testimonial-img'
        />
      </div>
      <h5 className="mb-3">John Joe</h5>
      <h6 className="text-primary mb-3">YouTuber | Founder of codewithjohn.com | Web developer</h6>
      <p className="px-xl-3">
        <i className="testimonial-i fas fa-quote-left pe-2"></i>
        <p className='testimonial-heading'>For everyone who wants to level up their #Coding and #Dev skills - seriously, this channel is for you! Both basic and advanced stacks are covered on this channel, and one can learn according to his skill levels. And the icing on the cake is, everything is available for free.
        </p>
      </p>
      <ul className="list-unstyled d-flex justify-content-center mb-0">
        <li>
          <i className="fas fa-star fa-sm text-warning"></i>
        </li>
        <li>
          <i className="fas fa-star fa-sm text-warning"></i>
        </li>
        <li>
          <i className="fas fa-star fa-sm text-warning"></i>
        </li>
        <li>
          <i className="fas fa-star fa-sm text-warning"></i>
        </li>
        <li>
          <i className="fas fa-star fa-sm text-warning"></i>
        </li>
      </ul>
    </div>
  </div>
</section>
    </>
  )
}

export default Testimonial;
