import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

import a from "../../assets/banners/a.jpg";
import b from "../../assets/banners/b.jpg";
import c from "../../assets/banners/c.jpg";
import d from "../../assets/banners/d.jpg";
import e from "../../assets/banners/e.jpg";
import f from "../../assets/banners/f.jpg";
import g from "../../assets/banners/g.jpg";
import h from "../../assets/banners/h.jpg";
import i from "../../assets/banners/i.jpg";
import j from "../../assets/banners/j.jpg";
import k from "../../assets/banners/k.jpg";
import l from "../../assets/banners/l.jpg";

const images = [a, b, c, d, e, f, g, h, i, j, k];

export default function HeroSlider() {
    return (
        <div className="absolute inset-0 z-0">
            <Swiper
                modules={[Autoplay, EffectFade]}
                effect="fade"
                loop={true}
                speed={1200}
                autoplay={{
                    delay: 4500,
                    disableOnInteraction: false,
                }}
                className="h-full w-full"
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className="h-full w-full bg-cover bg-center bg-no-repeat"
                            style={{
                                backgroundImage: `url(${image})`,
                            }}
                        >
                            <div className="h-full w-full bg-black/45"></div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}