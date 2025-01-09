import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const Testimonial = () => {
  const testimonials = [
    {
      name: "John Doe",
      review: "V-Learn is amazing! It helped me gain confidence and learn new skills quickly.",
      rating: 5,
    },
    {
      name: "Jane Smith",
      review: "The trainers are professional and really helpful. Highly recommend it!",
      rating: 4,
    },
    {
      name: "Emily Johnson",
      review: "A great platform for learning and growing. The sessions are very interactive.",
      rating: 5,
    },
    {
      name: "Michael Brown",
      review: "The booking process is simple and the trainers are very knowledgeable.",
      rating: 4,
    },
    {
      name: "Sophia Davis",
      review: "Absolutely love the platform! The community is very supportive.",
      rating: 5,
    },
    {
      name: "James Wilson",
      review: "I gained so much confidence after using V-Learn. Highly recommend it.",
      rating: 5,
    },
    {
      name: "Olivia Martinez",
      review: "The user interface is smooth and easy to navigate. Excellent experience!",
      rating: 4,
    },
    {
      name: "William Garcia",
      review: "I connected with an amazing trainer. It’s worth every penny.",
      rating: 5,
    },
    {
      name: "Isabella Rodriguez",
      review: "It’s the best platform for skill-building. Highly effective.",
      rating: 5,
    },
    {
      name: "Benjamin Anderson",
      review: "Affordable and high-quality sessions. Totally recommend V-Learn.",
      rating: 4,
    },
  ];

  return (
    <div className="bg-gray-100 font-semibold py-10">
      <h2 className="text-4xl font-bold text-center text-black mb-4">
        What Our Users Say
      </h2>
      <p className="text-center text-gray-700 text-lg mb-8 max-w-2xl mx-auto">
        Hear from our users about their incredible experiences with V-Learn. 
        From gaining confidence to mastering new skills, our platform has made 
        a difference in their lives. Join us and become part of our growing community.
      </p>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="max-w-screen-xl mx-auto"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center text-center h-64">
              <div className="text-xl font-semibold mb-2">{testimonial.name}</div>
              <p className="text-gray-600 mb-4">{testimonial.review}</p>
              <div className="text-yellow-500">
                {"★".repeat(testimonial.rating)}
                {"☆".repeat(5 - testimonial.rating)}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonial;
