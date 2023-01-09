import React, { useEffect, useState, useRef} from "react"
import { useAppDispatch } from "../../hooks/reducer"
import { Arrow } from "./arrow";

interface ISliderProps {
    images: string[],
}

export function ImageSlider({images}: ISliderProps) {
  const dispatch = useAppDispatch()
  const sliderWrap = useRef<HTMLDivElement>(null);
  let [width, setWidth] = useState(0);
  

  const [state, setState] = useState({
    activeIndex: 0,
    translate: 0,
    transition: 0.45
  })

  useEffect(() => {
    setWidth(sliderWrap!.current!.clientWidth - 10);
    //const newPosition = this.elements[this.currentIndex].getBoundingClientRect().left - sliderWrap!.current!.getBoundingClientRect().left;
  }, []);
  

  const { translate, transition, activeIndex } = state;

  const nextSlide = () => {
    if (activeIndex === images.length - 1) {
      return setState({
        ...state,
        translate: 0,
        activeIndex: 0
      })
    }
    setState({
      ...state,
      activeIndex: activeIndex + 1,
      translate: (activeIndex + 1) * width
    })
  }

  const prevSlide = () => {
    if (activeIndex === 0) {
      return setState({
        ...state,
        translate: (images.length - 1) * width,
        activeIndex: images.length - 1
      })
    }

    setState({
      ...state,
      activeIndex: activeIndex - 1,
      translate: (activeIndex - 1) * width,
    })
  }
  
    return (
      <div className="slider" ref={sliderWrap}>
        <div className="slider__wrapper"
            style={{ transform: `translate3d(-${translate}px, 0, 0)`, transition: `transform ${transition} linear`}}
        >
            {
                images.map((slide, index) => (
                    <div
                        className={index === activeIndex ? 'slide__item active' : 'slide__item'}
                        key={index}
                    >
                            <img src={slide} alt='' className='image' />
                    </div>
                ))
            }
        </div>
        <div className="slider__controls" style={{display: `${images.length > 0 ? 'flex' : 'none'}`}}>
            <button className="btn slider__control slider__control--left" onClick={prevSlide}>
                <Arrow />
            </button>
            <button className="btn slider__control" onClick={nextSlide}>
                <Arrow />
            </button>
        </div>
      </div>
    );
};
