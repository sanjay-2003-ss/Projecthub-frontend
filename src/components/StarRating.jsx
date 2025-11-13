import { useState } from 'react';

function StarRating({ initialRating = 0, onRate, readOnly = false }) {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  const handleClick = (value) => {
    if (!readOnly) {
      setRating(value); 
      if (onRate) onRate(value); 
    }
  };

  return (
    <div className="flex gap-1 items-center" aria-label={`Star rating: ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= (hover || rating);

        return (
          <button
            key={star}
            type="button"
            aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
            onClick={() => handleClick(star)}
            onMouseEnter={() => !readOnly && setHover(star)}
            onMouseLeave={() => !readOnly && setHover(0)}
            className={`text-3xl transition-transform duration-200 ease-in-out ${
              readOnly ? 'cursor-default' : 'cursor-pointer hover:scale-125'
            }`}
            disabled={readOnly}
          >
            <span
              className={`transition-all duration-200 ${
                filled
                  ? 'text-yellow-400 drop-shadow-md scale-110'
                  : 'text-gray-300 scale-100'
              }`}
            >
              ★
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default StarRating;
