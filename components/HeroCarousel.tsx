"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { heroImages } from "@/constants";
import Image from "next/image";
const HeroCarousel = () => {
  return (
    <div className="hero-carousel">
      <Carousel
        //autoPlay
        infiniteLoop
        //interval={2000}
        showThumbs={false}
        showArrows={false}
        showStatus={false}
      >
        {heroImages.map((heroImage) => (
          <Image
            src={heroImage.imgUrl}
            alt={heroImage.alt}
            width={484}
            height={484}
            className="object-contain"
            key={heroImage.alt}
          />
        ))}
      </Carousel>
      <Image
        src="/assets/icons/hand-drawn-arrow.svg"
        alt="arrow"
        width={175}
        height={175}
        className="max-xl:hidden absolute -left-[15%] bottom-0 z-0"
      />
    </div>
  );
};

export default HeroCarousel;
