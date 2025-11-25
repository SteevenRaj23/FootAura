import React from "react";

export default function ProductCard({
  image,
  title,
  price,
  rating = 5,
 onAddToCart
}) {
  return (
    <div className="w-full max-w-sm bg-neutral-primary-soft p-6 border border-gray-300 rounded-2xl shadow-xs">
      <a href="#">
        <img
          className="rounded-base mb-6 h-64 w-full object-contain"
          src={image}
          alt={title}
        />
      </a>

      <div>
        {/* Rating */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            {Array.from({ length: rating }).map((_, i) => (
              <svg
                key={i}
                className="w-5 h-5 text-yellow-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
              </svg>
            ))}
          </div>

          <span className="bg-brand-softer border border-brand-subtle text-fg-brand-strong text-xs font-medium px-1.5 py-0.5 rounded-sm text-blue-600">
            {rating} out of 5
          </span>
        </div>

        {/* Title */}
        <a href="#">
          <h5 className="text-xl text-heading font-semibold tracking-tight ">
            {title}
          </h5>
        </a>

        {/* Price + Button */}
        <div className="flex items-center justify-between mt-6">
          <span className="text-3xl font-extrabold text-heading">
            ${price}
          </span>

          <button
            type="button"
            onClick={onAddToCart}
            className="inline-flex items-center text-white bg-blue-600 hover:bg-blue-700 box-border border rounded-xl border-transparent focus:ring-4 focus:ring-blue-500 shadow-xs font-medium leading-5 rounded-base text-sm px-3 py-2 focus:outline-none"
          >
            <svg
              className="w-4 h-4 me-1.5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
              />
            </svg>
            Add to cart 
          </button>
        </div>
      </div>
    </div>
  );
}
