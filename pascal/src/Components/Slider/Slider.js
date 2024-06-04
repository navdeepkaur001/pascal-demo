import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import sliderimg1 from "../../Assets/images/panswap.png";
import hotBitImg from "../../Assets/images/hotbit.png";
import currency from "../../Assets/images/currency.png";
import { getNomicsDetails } from "../../redux/action/user.action";
import Chart from "../Chart/Chart.js";
import "./Slider.scss";
const options = {
  items: 1,
};

function Slider() {
  // const nomicsData1 = useSelector((state) => state.user.nomicData);

  // const [nomicsPrice, setNomicPrice] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    OnInit();
  }, []);

  const OnInit = async () => {
    //fetch price from nomics api via backend

    let result = await dispatch(getNomicsDetails());
    if (result && result.status == 200) {
      sessionStorage.setItem("price", result.data.data[0].price);
    }
  };
  let nomicsPrice = sessionStorage.getItem("price");

  return (
    <div>
      <OwlCarousel
        className="owl-theme swap-slider"
        loop
        margin={10}
        items={1}
        nav
      >
        <div class="item">
          <img className="sliderimg" src={sliderimg1} alt="slider" />
          <p className="slider-title">Listed on Pancakeswap</p>
          <div className="swap-col">
            {/* <div className="swap-list">
              <img src={calendar} alt="cal" />
              <h4 className="date">24 Oct 2021</h4>
              <small>Date</small>
            </div> */}
            <div className="swap-list">
              <div className="price_sec">
                <img src={currency} alt="cal" />
                <span className="date ml-3">
                  {nomicsPrice ? nomicsPrice : 0}
                </span>
              </div>
              <small>Price</small>
            </div>
          </div>
        </div>
        <div class="item">
          <img className="sliderimg" src={hotBitImg} alt="slider" />
          <p className="slider-title">Listed on Hotbit</p>
          <div className="swap-col">
            {/* <div className="swap-list">
              <img src={calendar} alt="cal" />
              <h4 className="date">24 Oct 2021</h4>
              <small>Date</small>
            </div> */}
            <div className="swap-list">
              <div className="price_sec">
                <img src={currency} alt="cal" />
                <span className="date ml-3">
                  {nomicsPrice ? nomicsPrice : 0}
                </span>
              </div>
              <small>Price</small>
            </div>
          </div>
        </div>
      </OwlCarousel>
      {/* <Chart /> */}
    </div>
  );
}

export default Slider;
