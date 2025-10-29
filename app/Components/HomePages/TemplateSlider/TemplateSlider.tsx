'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
// import { Eye, Download, Star, ArrowRight } from 'lucide-react';
import { FaEye, FaDownload, FaStar, FaArrowRight } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import Image from 'next/image';
import Link from 'next/link';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

interface Template {
    id: number;
    title: string;
    category: string;
    imgUrl: string;
    rating: number;
    downloads: string;
    description: string;
    tags: string[];
    isPremium?: boolean;
}

const templates: Template[] = [
    {
        id: 1,
        title: "Modern Executive",
        category: "Professional",
        imgUrl: "https://i.ibb.co.com/93ZYs3fg/Black-and-White-Standard-Professional-Resume.png",
        rating: 4.9,
        downloads: "15.2k",
        description: "Perfect for senior-level positions with clean, modern design",
        tags: ["Executive", "Modern", "ATS-Friendly"],
        isPremium: true
    },
    {
        id: 2,
        title: "ATS Optimized",
        category: "Standard",
        imgUrl: "https://i.ibb.co.com/rKPdMqSn/White-and-Black-Modern-New-Graduate-Professional-Resume.png",
        rating: 4.8,
        downloads: "23.1k",
        description: "Guaranteed to pass Applicant Tracking Systems",
        tags: ["ATS", "Simple", "Clean"]
    },
    {
        id: 3,
        title: "Creative Designer",
        category: "Creative",
        imgUrl: "https://i.ibb.co.com/yczJByCn/Black-and-White-Modern-Professional-Resume.png",
        rating: 4.7,
        downloads: "8.9k",
        description: "Stand out with this eye-catching creative template",
        tags: ["Creative", "Design", "Colorful"],
        isPremium: true
    },
    {
        id: 4,
        title: "Tech Professional",
        category: "Tech",
        imgUrl: "https://i.ibb.co.com/50GtT0G/White-and-Black-Modern-New-Graduate-Professional-Resume-1.png",
        rating: 4.9,
        downloads: "19.7k",
        description: "Ideal for software engineers and tech professionals",
        tags: ["Tech", "Minimal", "Professional"]
    },
    {
        id: 5,
        title: "Minimal Impact",
        category: "Minimal",
        imgUrl: "https://i.ibb.co.com/TMnJN5vW/White-Yellow-and-Black-Modern-Professional-Resume.png",
        rating: 4.6,
        downloads: "12.3k",
        description: "Less is more - clean and impactful design",
        tags: ["Minimal", "Clean", "Simple"]
    },
    {
        id: 6,
        title: "AI-Enhanced Pro",
        category: "AI-Powered",
        imgUrl: "https://i.ibb.co.com/7JcqBz6M/Purple-and-White-Clean-and-Professional-Resume.png",
        rating: 5.0,
        downloads: "31.4k",
        description: "AI-optimized layout for maximum impact",
        tags: ["AI", "Smart", "Optimized"],
        isPremium: true
    },
    {
        id: 7,
        title: "Custom Builder",
        category: "Custom",
        imgUrl: "https://i.ibb.co.com/50GtT0G/White-and-Black-Modern-New-Graduate-Professional-Resume-1.png",
        rating: 4.8,
        downloads: "7.2k",
        description: "Fully customizable template for unique needs",
        tags: ["Custom", "Flexible", "Unique"]
    },
];

const TemplateCard: React.FC<{ template: Template; onPreview: (template: Template) => void }> = ({
    template,
    onPreview
}) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Premium Badge */}
            {template.isPremium && (
                <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    PREMIUM
                </div>
            )}

            {/* Image Container */}
            <div className="relative overflow-hidden rounded-t-3xl bg-gray-100">
                {/* <img
                    src={template.imgUrl}
                    alt={template.title}
                    className={`w-full h-64 object-cover transition-all duration-700 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                        } ${isHovered ? 'scale-110' : 'scale-100'}`}
                    onLoad={() => setImageLoaded(true)}
                    onError={(e) => {
                        // Fallback placeholder
                        (e.target as HTMLImageElement).src = `data:image/svg+xml,${encodeURIComponent(`
              <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="#f3f4f6"/>
                <text x="50%" y="50%" text-anchor="middle" fill="#6b7280" font-size="16" font-family="Arial">
                  ${template.title} Preview
                </text>
              </svg>
            `)}`;
                        setImageLoaded(true);
                    }}
                /> */}
                <Image
                    src={template.imgUrl}
                    alt={template.title}
                    fill
                    unoptimized
                    className={`object-cover transition-all duration-700 ${imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
                        } ${isHovered ? "scale-110" : "scale-100"}`}
                    onLoadingComplete={() => setImageLoaded(true)}
                    onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        target.src = `data:image/svg+xml,${encodeURIComponent(`
        <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#f3f4f6"/>
          <text x="50%" y="50%" text-anchor="middle" fill="#6b7280" font-size="16" font-family="Arial">
            ${template.title} Preview
          </text>
        </svg>
      `)}`;
                        setImageLoaded(true);
                    }}
                />
                {/* Overlay Actions */}
                <div className={`absolute inset-0 bg-black/60 flex items-center justify-center gap-4 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
                    }`}>
                    <button
                        onClick={() => onPreview(template)}
                        className="flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-full hover:bg-gray-100 transition-colors duration-200 shadow-lg"
                    >
                        <FaEye size={16} />
                        <span className="text-sm font-medium">Preview</span>
                    </button>
                    <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors duration-200 shadow-lg">
                        <FaDownload size={16} />
                        <span className="text-sm font-medium">Use Template</span>
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors duration-200">
                            {template.title}
                        </h3>
                        <p className="text-sm text-indigo-600 font-medium">{template.category}</p>
                    </div>
                    <div className="flex items-center gap-1">
                        <FaStar size={14} className="text-yellow-400 fill-current" />
                        <span className="text-sm font-semibold text-gray-700">{template.rating}</span>
                    </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {template.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {template.tags.slice(0, 3).map((tag, index) => (
                        <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full hover:bg-indigo-100 hover:text-indigo-600 transition-colors duration-200"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Stats */}
                <div  className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                        <FaDownload size={14} />
                        <span>{template.downloads} downloads</span>
                    </div>
                    <Link href='/create-resume/experience-level/template-selection' className="flex items-center gap-1 text-indigo-600 hover:text-indigo-700 font-medium">
                        <span>Try Now</span>
                        <FaArrowRight size={14} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

const TemplateSlider: React.FC = () => {
    const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate title
            if (titleRef.current) {
                gsap.fromTo(titleRef.current.children,
                    {
                        opacity: 0,
                        y: 30,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.2,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: titleRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        }
                    }
                );
            }
        });

        return () => ctx.revert();
    }, []);

    const handlePreview = (template: Template) => {
        setSelectedTemplate(template);
    };

    return (
        <section ref={sectionRef} className="py-24  bg-[linear-gradient(180deg,rgba(245,255,248,0.9)_0%,rgba(232,250,236,0.85)_40%,rgba(255,255,255,0.98)_100%)] dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-indigo-200/20 rounded-full blur-3xl" />
                <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-blue-200/15 rounded-full blur-3xl" />
            </div>

            <div className="relative container mx-auto px-4">
                {/* Header */}
                <div className="mb-6 lg:mb-8">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Professional Resume
                        <span className="block text-blue-600 dark:text-blue-400">Templates</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto lg:mx-0 rounded-full"></div>
                </div>


                {/* Swiper */}
                <Swiper
                    modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation={{
                        nextEl: '.swiper-button-next-custom',
                        prevEl: '.swiper-button-prev-custom',
                    }}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                    }}
                    autoplay={{
                        delay: 1000,
                        pauseOnMouseEnter: true,
                        disableOnInteraction: false,
                    }}
                    effect="slide"
                    grabCursor={true}
                    centeredSlides={false}
                    breakpoints={{
                        640: { slidesPerView: 1, spaceBetween: 20 },
                        768: { slidesPerView: 2, spaceBetween: 25 },
                        1024: { slidesPerView: 3, spaceBetween: 30 },
                        1280: { slidesPerView: 3, spaceBetween: 35 },
                    }}
                    className="pb-16"
                >
                    {templates.map((template) => (
                        <SwiperSlide key={template.id}>
                            <TemplateCard template={template} onPreview={handlePreview} />
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom Navigation */}
                <div className="flex justify-center items-center gap-4 mt-8">
                    <button className="swiper-button-prev-custom w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-indigo-600 hover:bg-indigo-50">
                        <FaArrowRight size={20} className="rotate-180" />
                    </button>
                    <button className="swiper-button-next-custom w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-indigo-600 hover:bg-indigo-50">
                        <FaArrowRight size={20} />
                    </button>
                </div>

                {/* Call to Action */}
                <div className="text-center mt-16">
                    <p className="text-lg text-gray-600 mb-6">
                        Can not find the perfect template? We have more options available!
                    </p>
                    <div className="my-3 flex items-center justify-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                            <FaStar size={16} className="text-yellow-400 fill-current" />
                            4.8 average rating
                        </span>
                        <span>•</span>
                        <span>50,000+ downloads</span>
                    </div>
                    <Link href="/resume-templates" className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        Browse All Templates
                        <FaArrowRight size={18} />
                    </Link>
                </div>
            </div>

            {/* Preview Modal (Simple implementation) */}
            {selectedTemplate && (
                <div
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                    onClick={() => setSelectedTemplate(null)}
                >
                    <div
                        className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800">{selectedTemplate.title}</h3>
                                <p className="text-indigo-600">{selectedTemplate.category}</p>
                            </div>
                            <button
                                onClick={() => setSelectedTemplate(null)}
                                className="text-gray-400 hover:text-gray-600 text-2xl"
                            >
                                ×
                            </button>
                        </div>
                        {/* <img
                            src={selectedTemplate.imgUrl}
                            alt={selectedTemplate.title}
                            className="w-full h-xl object-cover rounded-xl mb-4  overflow-y-auto"
                        /> */}
                         <Image
                         src={selectedTemplate.imgUrl}
                            alt={selectedTemplate.title}
                            fill
                            className='w-full h-xl object-cover rounded-xl mb-4  overflow-y-auto'
                            unoptimized
                         />
                        <p className="text-gray-600 mb-4">{selectedTemplate.description}</p>
                        <Link href="/resume-templates" className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors duration-200">
                            Use This Template
                        </Link>
                    </div>
                </div>
            )}
        </section>
    );
};

export default TemplateSlider;