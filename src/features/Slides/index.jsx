import React, { useState, useEffect } from 'react'
import authApi from '../../api/authApi';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css'
const SlidesComponent = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      let res = await authApi.getImgActive();
      setImages(res.data)
    };

    fetch();
  }, []);

  const settings = {
    // customPaging: function(i) {
    //   console.log(i)
    //   return (
    //     <a>
     
    //     {/* Hiển thị hình thu nhỏ của hình ảnh trong mảng */}
    //     <img
    //       src={`/img/${images[i].url}`}
    //       alt={`Thumbnail ${i + 1}`}
    //       style={{ width: '200px', height: '200px', objectFit: 'cover' }}
    //     />
    //     </a>
    //   );
    // },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    fade: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false
  };
  return (
    <div style={{ height: 'calc(100vh - 80px)', overflow: 'hidden' }} className=" border-yellow-300 p-3 mr-2 border-[2px] rounded-lg h-[cacl(100% - 58px)]  bg-red-700">
      <div className="overflow-hidden border border-yellow-300 p-8 rounded-lg bg-[url('/nentrongdong.png')] bg-no-repeat bg-cover">
        <Slider {...settings}>
          {images.map(image => (
            <div key={image.url}>
              <img className='shadow shadow-slate-900 max-h-[calc(100vh-250px)]' src={`/img/${image.url}`} alt="anh" />
              <p className='text-center relative z-20 text-lg mt-2 p-2 text-red-600 font-bold'>{image.noidung.toUpperCase()}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default SlidesComponent