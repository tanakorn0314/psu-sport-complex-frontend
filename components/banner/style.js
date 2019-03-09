import styled from 'styled-components';
const height = 300;

const BannerWrapper = styled.div`
  width: 100%;
  height: ${height}px;
    .image {
    width: 100%;
    height: ${height}px;
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
`;

export default BannerWrapper;