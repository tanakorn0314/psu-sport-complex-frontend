import Button from '../buttons/button';
import BannerWrapper from './style';

const Banner = props => (
    <BannerWrapper>
      <img className='image' src={props.img} />
      <div className='slide-content'>
        <div className='logo-container'>
          <p className='slide-logo'>PSU</p>
          <p className='slide-logo'>SPORT</p>
          <p className='slide-logo'>COMPLEX</p>
        </div>
        <Button className='button' onClick={props.onClick}>BOOK NOW</Button>
      </div>
    </BannerWrapper>
  )

  export default Banner;