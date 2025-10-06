import React, { useState, useEffect } from 'react'
import authApi from '../../api/authApi';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css'
import thongkeApi from '../../api/thongkeApi';
import CountUp from 'react-countup';
import { useOutletContext } from "react-router-dom";
const Home = () => {
  const [images, setImages] = useState([]);
  const [totalKhenthuong, setTotalKhenthuong] = useState([]);
  const [khenthuongtapthe, setKhenthuongtapthe] = useState(0);
  const [khenthuongcanhan, setKhenthuongcanhan] = useState(0);
  const [kiluatcanhan, setKiluatcanhan] = useState(0);
  const [totalCanbo, setTotalCanbo] = useState(0);
  const [totalDangvien, setTotalDangvien] = useState(0);
  const [totalNam, setTotalNam] = useState(0);
  const [totalNamDangvien, setTotalNamDangvien] = useState(0);
  const [totalNuDangvien, setTotalNuDangvien] = useState(0);
  const [handleChangeNotifications, handleLoading] = useOutletContext();
  useEffect(() => {
    const fetch = async () => {
      let res = await authApi.getImgActive();
      setImages(res.data)
    };

    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      handleLoading(true)
      try {
        const [res1, res2] = await Promise.all([
          thongkeApi.getNumberCanboOrDangvienDangCongtac(),
          thongkeApi.getNumberKhenthuongKiluatDangCongtac()
        ]);

        setTotalCanbo(res1.data.numbers_canbo);
        setTotalNam(res1.data.nam_canbos)
        setTotalDangvien(res1.data.numbers_dangvien)
        setTotalNamDangvien(res1.data.nam_dangviens)
        setTotalKhenthuong(res2.data.number_khenthuongs_of_tapthe + res2.data.number_khenthuongs_of_canhan)
        setKhenthuongtapthe(res2.data.number_khenthuongs_of_tapthe)
        setKhenthuongcanhan(res2.data.number_khenthuongs_of_tapthe)
        setKiluatcanhan(res2.data.number_kiluats_of_canhan)
        setTotalNuDangvien(res1.data.nu_dangviens)
        // console.log(res2.data.nu_dangviens)
        handleLoading(false)
      } catch (error) {
         handleLoading(false)
        console.log(error.message)
      }
    };

    fetch()
  }, [])

  const settings = {
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
    <div className='pr-2' data-aos="fade-left" data-aos-once="true">
      <div className='flex md:flex-row flex-col md:flex-nowrap md:space-x-3'>
        <div className="relative md:basis-1/4 shadow-md shadow-gray-500 overflow-hidden rounded-md" >
          <div className="bg-gradient-to-r flex items-center justify-center from-[#ff0000] to-yellow-400 w-full h-44">
            <div className='text-center'>
              <p className='font-bold text-[48px] text-white'><CountUp end={totalCanbo} duration={2} /></p>
              <div className='flex space-x-4'>
                <span className='flex items-center space-x-2 text-[#0008ff] text-[28px] font-bold'><span className='text-white text-[24px]'>Nam:</span> <CountUp end={totalNam} duration={2} /></span>
                <span className='flex items-center space-x-2 text-[#0008ff] text-[28px] font-bold'><span className='text-white text-[24px]'>Nữ:</span> <CountUp end={totalCanbo - totalNam} duration={2} /></span>
              </div>
            </div>
          </div>
          <img src="/namcongan.png" alt="avatar" className='absolute top-0  h-52 z-10' />
          <p className='text-center bg-yellow-300/75  text-[rgb(0 0 0)] font-semibold'>Tổng số cán bộ, chiến sĩ</p>
          <div className="absolute bg-[url('/nentrongdong.png')] opacity-30 backdrop-blur-sm  h-full bg-cover w-full bg-no-repeat top-0"></div>
        </div>
        <div className="relative md:basis-1/4 shadow-md shadow-gray-500 overflow-hidden rounded-md" >
          <div className="bg-gradient-to-l flex items-center justify-center from-[#ff0000] to-yellow-400 w-full h-44">
            <div className='text-center'>
              <p className='font-bold text-[48px] text-white'><CountUp end={totalDangvien} duration={2} /></p>
               <div className='flex space-x-4'>
                <span className='flex items-center space-x-2 text-[#0008ff] text-[28px] font-bold'><span className='text-white text-[24px]'>Nam:</span> <CountUp end={totalNamDangvien} duration={2} /></span>
                <span className='flex items-center space-x-2 text-[#0008ff] text-[28px] font-bold'><span className='text-white text-[24px]'>Nữ:</span> <CountUp end={totalNuDangvien} duration={2} /></span>
              </div>
            </div>
          </div>
          <img src="/dangvien.png" alt="avatar" className='absolute top-0 h-40 z-10 right-[-16px]' />
          <p className='text-center bg-yellow-300/75  text-[rgb(0 0 0)] font-semibold'>Tổng số đảng viên</p>
          <div className="absolute bg-[url('/nentrongdong.png')] opacity-30 backdrop-blur-sm  h-full bg-cover w-full bg-no-repeat top-0"></div>
        </div>
        <div className="relative md:basis-1/4 shadow-md shadow-gray-500 overflow-hidden rounded-md" >
          <div className="bg-gradient-to-r flex items-center justify-center from-[#ff0000] to-yellow-400 w-full h-44">
             <div className='text-center'>
              <p className='font-bold text-[48px] text-white'><CountUp end={totalKhenthuong} duration={2} /></p>
               <div className='flex space-x-4 ml-12'>
                <span className='flex items-center space-x-2 text-[#0008ff] text-[28px] font-bold'><span className='text-white text-[24px]'>Tập thể:</span> <CountUp end={khenthuongtapthe} duration={2} /></span>
                <span className='flex items-center space-x-2 text-[#0008ff] text-[28px] font-bold'><span className='text-white text-[24px]'>Cá nhân:</span> <CountUp end={khenthuongcanhan} duration={2} /></span>
              </div>
            </div>
          </div>
          <img src="/khenthuong.png" alt="avatar" className='absolute top-8 h-32 z-10' />
          <p className='text-center bg-yellow-300/75  text-[rgb(0 0 0)] font-semibold'>Tổng số lượt khen thưởng</p>
          <div className="absolute bg-[url('/nentrongdong.png')] opacity-30 backdrop-blur-sm  h-full bg-cover w-full bg-no-repeat top-0"></div>
        </div>
        <div className="relative md:basis-1/4 shadow-md shadow-gray-500 overflow-hidden rounded-md" >
          <div className="bg-gradient-to-l flex items-center justify-center from-[#ff0000] to-yellow-400 w-full h-44">
             <div className='text-center'>
              <p className='font-bold text-[48px] text-white'><CountUp end={kiluatcanhan} duration={2} /></p>
            </div>
          </div>
          <img src="/kiluat.png" alt="avatar" className='absolute top-6 h-32 z-10 right-[-20px]' />
          <p className='text-center bg-yellow-300/75  text-[rgb(0 0 0)] font-semibold'>Tổng số lượt bị kỉ luật</p>
          <div className="absolute bg-[url('/nentrongdong.png')] opacity-30 backdrop-blur-sm  h-full bg-cover w-full bg-no-repeat top-0"></div>
        </div>
      </div>
      <div className='mt-4 relative'>
        <div className='bg-[#750505] opacity-10 absolute top-0 w-full h-full'></div>
        <div className="overflow-hidden border border-yellow-300 rounded-lg bg-[url('/nentrongdong.png')] h-[calc(100vh-300px)] bg-no-repeat bg-cover">
          <Slider {...settings}>
            {images.map(image => (
              <div key={image.url}>
                <img className='shadow shadow-yellow-500 max-h-[calc(100vh-460px)]' src={`/img/${image.url}`} alt="anh" />
                <p className='text-center relative z-20 text-lg mt-2 p-2 rounded-md text-[darkred] font-medium uppercase'>{image.noidung}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  )
}

export default Home