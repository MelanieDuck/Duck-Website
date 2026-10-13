import React from 'react'
import type { Review } from '@/types'
import SectionLabel from './SectionLabel'

interface ReviewsProps {
  reviews: Review[]
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex gap-0.5 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-amber-400' : 'text-gray-200'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.363 1.118l1.287 3.957c.299.921-.756 1.688-1.539 1.118l-3.368-2.448a1 1 0 00-1.176 0l-3.368 2.448c-.783.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.363-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
        </svg>
      ))}
    </div>
  )
}

const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
  if (!reviews || reviews.length === 0) return null

  return (
    <section id="reviews" className="py-16 md:py-24 px-5 md:px-12 bg-gray-50 border-t border-gray-100">
      <div className="max-w-[1080px] mx-auto">
        <SectionLabel text="What Our Guests Say" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 rounded-xl p-6 md:p-7 shadow-sm flex flex-col"
            >
              <StarRating rating={review.rating} />
              <p className="text-[14px] text-gray-600 leading-[1.7] flex-1 mb-5">
                "{review.text}"
              </p>
              <div className="pt-4 border-t border-gray-100">
                <p className="text-[13px] font-medium text-gray-900">{review.author}</p>
                <p className="text-[12px] text-gray-400 mt-0.5">{review.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Reviews
