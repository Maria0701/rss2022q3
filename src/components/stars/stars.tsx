import { TOTAL_STARS } from "../../jsons/links"
import { Star } from "./star1"
import { Star2 } from "./star2"
import './stars.css'

interface IRating {
    rating: number
}

export function Rating({rating}: IRating) {

  const getWidth = (rating:number, id:number): string => {
    if (Math.floor(rating / id) >= 1) {
      
      return '100%';
    } if ((id % rating) > 0 && Math.floor(rating / id) < 1) {
      return `${id % rating * 100}%`;
    } else {
      return '0%';
    }
  };

    return (
      <div className={`rating`}>
          {[... new Array(TOTAL_STARS)].map((_, id) => (
            <button 
              className="rating__item btn" 
              key={id}
              >
                <span className="rating__star rating__star--inactive">
                  <Star />
                </span>
                <span className="rating__star rating__star--active" style={{width: getWidth(rating, id + 1)}}>
                  <Star2 />
                </span>
              </button>
          ))}
      </div>
    )
  }
  