// src>pages>DiaryCreationPage>StarRating.tsx

import React, { useState } from 'react';
import { IoMdStar, IoMdStarOutline } from 'react-icons/io';

interface StarRatingProps {
  rating: number;
  setRating?: (rating: number) => void; // setRating를 선택적으로 변경
  readOnly?: boolean; // readOnly 속성 추가
}

const StarRating: React.FC<StarRatingProps> = ({ rating, setRating, readOnly = false }) => {
  const [hover, setHover] = useState<number>(0);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <label
            key={index}
            style={{ cursor: readOnly ? 'default' : 'pointer', margin: '0 2px' }} // readOnly일 때 커서 기본값
            onMouseEnter={() => !readOnly && setHover(ratingValue)} // readOnly일 때 hover 비활성화
            onMouseLeave={() => !readOnly && setHover(0)} // readOnly일 때 hover 비활성화
          >
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => !readOnly && setRating && setRating(ratingValue)} // readOnly일 때 클릭 비활성화
              style={{ display: 'none' }}
            />
            {ratingValue <= (hover || rating) ? (
              <IoMdStar style={{ fontSize: '24px' }} />
            ) : (
              <IoMdStarOutline style={{ fontSize: '24px' }} />
            )}
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;