import Button from './button';

const Banner = props => (
    <div className='slide-container'>
      <img className='image' src={props.img} />
      <div className='slide-content'>
        <div className='logo-container'>
          <p className='slide-logo'>PSU</p>
          <p className='slide-logo'>SPORT</p>
          <p className='slide-logo'>COMPLEX</p>
        </div>
        <Button className='button'>BOOK NOW</Button>
      </div>
      <style jsx>{`
          .slide-container {
            width: 100%;
            height: ${props.height}px;
          }
          .image {
            width: 100%;
            height: ${props.height}px;
            z-index: 0;
            position: absolute;
          }
          .slide-content {
            position: relative;
            z-index: 1;
            padding: 100px 50px 50px 200px;
          }
          .logo-container {
            margin-bottom: 20px;
          }
          .slide-logo {
            color: #FFF;
            margin: 0;
            font-size: 40px
          }
        `}</style>
    </div>
  )

  export default Banner;