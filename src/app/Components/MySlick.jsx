'use client'
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const CustomArrow = ({ className, style, onClick, isNext }) => {

  return (
    <div
      className={className}
      style={{
        ...style,
        // Resetting Slick's default behavior
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        
        // Your Custom Styling
        backgroundColor: "black",
        borderRadius: "50%",
        width: "50px",
        height: "50px",
        zIndex: 50,
        color: "white",
        opacity: "0.5",
        fontSize: "20px", // Slightly smaller font looks better in a 50px circle
        // --- POSITIONING LOGIC ---
        // Adjust these numbers to bring arrows closer/further
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        left: isNext ? "auto" : "calc(50% - 350px)", 
        right: isNext ? "calc(50% - 350px)" : "auto",
      }}
      onClick={onClick}
    >
      {/* This span helps bypass the default slick-theme icon styling */}
      <span style={{ display: "block", marginTop: "-2px" }}>
        {isNext ? ">" : "<"}
      </span>
    </div>
  );
};

function MySlick() {
    const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    nextArrow:<CustomArrow isNext={true}/>,
    prevArrow:<CustomArrow isNext={false}/>
  };

  const BUCKET_URL = "https://jhcposnstqhynbmubhyn.supabase.co/storage/v1/object/public/images";

  return (
    <div>
      <Slider {...settings}>
            <div className="flex! justify-center items-center">
              <Image
                src={encodeURI(`${BUCKET_URL}/Badman Dawn.png`)}
                alt="Mockup 1"
                width={360}
                height={540}
                loading="eager"
                className="h-112.5 w-auto"
                style={{ height: 'auto' }}
              />
            </div>
            <div className="flex! justify-center items-center">
              <Image
                src={encodeURI(`${BUCKET_URL}/Attraction Newton.png`)}
                alt="Mockup 2"
                width={360}
                height={540}
                loading="eager"
                className="h-112.5 w-auto"
                style={{ height: 'auto' }}
              />
            </div>
            <div className="flex! justify-center items-center">
              <Image
                src={encodeURI(`${BUCKET_URL}/Baby Hall.png`)}
                alt="Mockup 3"
                width={360}
                height={540}
                loading="eager"
                className="h-112.5 w-auto"
                style={{ height: 'auto' }}
              />
            </div>
            <div className="flex! justify-center items-center">
              <Image
                src={encodeURI(`${BUCKET_URL}/Bang Kwai.png`)}
                alt="Mockup 4"
                width={360}
                height={540}
                loading="eager"
                className="h-112.5 w-auto"
                style={{ height: 'auto' }}
              />
            </div>
            <div className="flex! justify-center items-center">
              <Image
                src={encodeURI(`${BUCKET_URL}/Beach Heartbreakers.png`)}
                alt="Mockup 5"
                width={360}
                height={540}
                loading="eager"
                className="h-112.5 w-auto"
                style={{ height: 'auto' }}
              />
            </div>
            <div className="flex! justify-center items-center">
              <Image
                src={encodeURI(`${BUCKET_URL}/Bird Independence.png`)}
                alt="Mockup 6"
                width={360}
                height={540}
                loading="eager"
                className="h-112.5 w-auto"
                style={{ height: 'auto' }}
              />
            </div>
            <div className="flex! justify-center items-center">
              <Image
                src={encodeURI(`${BUCKET_URL}/Bonnie Holocaust.png`)}
                alt="Mockup 6"
                width={360}
                height={540}
                loading="eager"
                className="h-112.5 w-auto"
                style={{ height: 'auto' }}
              />
            </div>
            <div className="flex! justify-center items-center">
              <Image
                src={encodeURI(`${BUCKET_URL}/Bride Intrigue.png`)}
                alt="Mockup 6"
                width={360}
                height={540}
                loading="eager"
                className="h-112.5 w-auto"
                style={{ height: 'auto' }}
              />
            </div>
            <div className="flex! justify-center items-center">
              <Image
                src={encodeURI(`${BUCKET_URL}/Academy Dinosaur.png`)}
                alt="Mockup 6"
                width={360}
                height={540}
                loading="eager"
                className="h-112.5 w-auto"
                style={{ height: 'auto' }}
              />
            </div>
          </Slider>
    </div>
  )
}

export default MySlick
