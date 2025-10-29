'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FaStar, FaCheckCircle } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// ✅ React Icons
import { FaGoogle, FaAmazon, FaMicrosoft, FaApple, FaFacebook, FaSpotify, FaUber, FaAirbnb } from 'react-icons/fa';

interface Review {
  id: number;
  name: string;
  role: string;
  text: string;
  rating: number;
  date: string;
  verified: boolean;
  title: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Scott Robinson",
    role: "Software Engineer",
    text: "What made my experience so successful was the man on the other end of the phone who guided me through the entire process.",
    rating: 5,
    date: "September 4",
    verified: true,
    title: "The gentleman that helps me m..."
  },
  {
    id: 2,
    name: "Miriam S.",
    role: "Marketing Manager",
    text: "Great resources, easy to use and helped me gain a new role. Thank you!",
    rating: 5,
    date: "September 4",
    verified: false,
    title: "Great resources"
  },
  {
    id: 3,
    name: "Anthony Marshall",
    role: "Project Manager",
    text: "Was initially wary of subscription due to neg. reviews, but cancellation and customer service was excellent.",
    rating: 5,
    date: "September 4",
    verified: true,
    title: "Wasn't sure at first"
  },
  {
    id: 4,
    name: "Sarah Johnson",
    role: "UX Designer",
    text: "Amazing platform! The AI suggestions really helped me create a professional resume that got me interviews.",
    rating: 5,
    date: "September 3",
    verified: true,
    title: "Outstanding AI features"
  },
  {
    id: 5,
    name: "David Chen",
    role: "Data Analyst",
    text: "Simple, effective, and professional. Got my dream job within 2 weeks of using this platform.",
    rating: 5,
    date: "September 2",
    verified: true,
    title: "Got my dream job!"
  },
  {
    id: 6,
    name: "Emma Wilson",
    role: "HR Specialist",
    text: "The templates are modern and ATS-friendly. Highly recommend for anyone looking to upgrade their resume.",
    rating: 5,
    date: "September 1",
    verified: false,
    title: "Modern and ATS-friendly"
  },
];

// ✅ Brand Icons Array
const brands = [
  { name: 'Google', icon: <FaGoogle className="w-6 h-6 text-red-500" /> },
  { name: 'Amazon', icon: <FaAmazon className="w-6 h-6 text-yellow-600" /> },
  { name: 'Microsoft', icon: <FaMicrosoft className="w-6 h-6 text-blue-600" /> },
  { name: 'Apple', icon: <FaApple className="w-6 h-6 text-gray-800 dark:text-gray-700" /> },
  { name: 'Meta', icon: <FaFacebook className="w-6 h-6 text-blue-500" /> },
  { name: 'Spotify', icon: <FaSpotify className="w-6 h-6 text-green-500" /> },
  { name: 'Uber', icon: <FaUber className="w-6 h-6 text-black dark:text-black" /> },
  { name: 'Airbnb', icon: <FaAirbnb className="w-6 h-6 text-pink-500" /> },
];

const StarRating: React.FC<{ rating: number; size?: 'sm' | 'md' | 'lg' }> = ({
  rating,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <div className="flex items-center space-x-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          // Updated: emerald color for stars
          className={`${sizeClasses[size]} ${star <= rating ? 'text-emerald-500 fill-emerald-500' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );
};

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-full flex flex-col min-h-[240px]">
      {/* Header with stars and verification */}
      <div className="flex items-center justify-between mb-3">
        <StarRating rating={review.rating} size="sm" />
        <div className="flex items-center space-x-2">
          {review.verified && (
            <>
              <FaCheckCircle className="w-4 h-4 text-gray-400" />
              <span className="text-xs text-gray-500">Verified</span>
            </>
          )}
        </div>
      </div>

      {/* Title */}
      <h3 className="font-semibold text-gray-900 mb-2 text-sm">
        {review.title}
      </h3>

      {/* Review Text */}
      <p className="text-gray-700 text-sm mb-4 flex-grow leading-relaxed">
        {review.text}
      </p>

      {/* Author Info */}
      <div className="mt-auto">
        <div className="text-sm">
          <span className="font-medium text-gray-900">{review.name}</span>
          <span className="text-gray-500 ml-1">• {review.date}</span>
        </div>
      </div>
    </div>
  );
};

export default function ReviewSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for entrance animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.12 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      // Updated: emerald background gradient
      className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-6 lg:mb-8 text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            What users say about
            {/* Updated: emerald color */}
            <span className="block text-emerald-600 dark:text-emerald-400">Resume Builder</span>
          </h2>
          {/* Updated: emerald underline */}
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-600 to-emerald-600 mx-auto lg:mx-0 rounded-full"></div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

          {/* Left Side - Fixed Rating Summary */}
          <div className={`lg:w-1/3 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <div className="bg-white rounded-xl shadow-lg p-8 sticky top-8">

              {/* Overall Rating */}
              <div className="text-center mb-8">
                <div className="text-4xl font-bold text-gray-900 mb-2">Great</div>
                <StarRating rating={4} size="lg" />
                <p className="text-gray-600 mt-4 text-lg">
                  Based on <span className="font-semibold">1,170 reviews</span>
                </p>
              </div>

              {/* Trustpilot Logo */}
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center space-x-2">
                  {/* Updated: emerald star */}
                  <FaStar className="w-6 h-6 text-emerald-500 fill-emerald-500" />
                  <span className="font-bold text-lg text-gray-900">Trustpilot</span>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-4 border-t pt-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">5 star reviews</span>
                  <span className="font-semibold text-gray-900">892</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">4 star reviews</span>
                  <span className="font-semibold text-gray-900">203</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">3 star reviews</span>
                  <span className="font-semibold text-gray-900">51</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">2 star reviews</span>
                  <span className="font-semibold text-gray-900">18</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">1 star reviews</span>
                  <span className="font-semibold text-gray-900">6</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Swiper Slider */}
          <div className={`lg:w-2/3 transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="pb-6"
            >
              {reviews.map((review) => (
                <SwiperSlide key={review.id}>
                  <ReviewCard review={review} />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Show 5 star reviews text */}
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">Showing our 5 star reviews</p>
            </div>

            {/* ---------- New: Brands Infinite Slider with React Icons ---------- */}
            <div className="mt-8 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="mb-4 text-center">
                <h3 className="text-lg font-semibold text-gray-900">Subscribers have been hired by:</h3>
              </div>

              <Swiper
                modules={[Autoplay]}
                spaceBetween={24}
                slidesPerView={2}
                loop={true}
                autoplay={{
                  delay: 1500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: false
                }}
                speed={2500}
                breakpoints={{
                  320: { slidesPerView: 2 },
                  640: { slidesPerView: 3 },
                  768: { slidesPerView: 4 },
                  1024: { slidesPerView: 6 },
                }}
                className="py-2"
                aria-label="Client brands carousel"
              >
                {brands.concat(brands).map((brand, idx) => (
                  <SwiperSlide key={`${brand.name}-${idx}`} className="flex items-center justify-center">
                    <div className="flex items-center justify-center px-4 py-3 bg-gray-50 rounded-lg border border-gray-100 min-w-[120px]">
                      <div className="flex items-center space-x-3">
                        {brand.icon}
                        <div className="text-sm font-medium text-gray-800">{brand.name}</div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}