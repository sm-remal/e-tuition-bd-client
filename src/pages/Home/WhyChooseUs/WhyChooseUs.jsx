import React from 'react';
import { Award, Briefcase, ThumbsUp, DollarSign, Handshake, Users } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      icon: Award,
      title: "Standard Of Excellence",
      description: "This slide is 100% editable. Adapt it to your needs and capture your audience's attention",
      color: "bg-blue-500",
      position: "top"
    },
    {
      icon: ThumbsUp,
      title: "Easily Customization",
      description: "This slide is 100% editable. Adapt it to your needs and capture your audience's attention",
      color: "bg-teal-500",
      position: "bottom"
    },
    {
      icon: DollarSign,
      title: "Cost Effective",
      description: "This slide is 100% editable. Adapt it to your needs and capture your audience's attention",
      color: "bg-green-500",
      position: "top"
    },
    {
      icon: Handshake,
      title: "Commitment To Work",
      description: "This slide is 100% editable. Adapt it to your needs and capture your audience's attention",
      color: "bg-blue-600",
      position: "bottom"
    },
    {
      icon: Users,
      title: "Solid Teamwork",
      description: "This slide is 100% editable. Adapt it to your needs and capture your audience's attention",
      color: "bg-teal-600",
      position: "top"
    }
  ];

  const Hexagon = ({ children, color, className = "" }) => (
    <div className={`relative ${className}`} style={{ width: '140px', height: '161px' }}>
      <svg viewBox="0 0 100 115" className="absolute inset-0 w-full h-full">
        <polygon
          points="50 0, 93.3 28.75, 93.3 86.25, 50 115, 6.7 86.25, 6.7 28.75"
          className={`${color} stroke-white transition-all duration-500 hover:scale-110`}
          strokeWidth="3"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 hover:rotate-12">
        {children}
      </div>
    </div>
  );

  const CheckIcon = () => (
    <div className="bg-green-500 rounded-full p-1.5 shadow-md border-2 border-white animate-pulse">
      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Why Choose <span className="text-teal-600">E-Tuition BD</span>
          </h1>
        </div>

        <div className="flex items-center justify-center gap-6 flex-wrap">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isBottom = feature.position === "bottom";
            
            return (
              <div 
                key={index} 
                className="flex flex-col items-center transition-all duration-700 hover:scale-105"
                style={{ 
                  width: '200px',
                  animation: `fadeInUp 0.8s ease-out ${index * 0.2}s both`
                }}
              >
                {/* Top section */}
                {!isBottom && (
                  <div className="flex flex-col items-center mb-4">
                    <CheckIcon />
                    <div className="h-12 w-0.5 bg-gradient-to-b from-gray-400 to-transparent my-2"></div>
                    <h3 className="text-center font-bold text-gray-800 text-sm leading-tight px-4 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-gray-600 text-center px-2 leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="h-12 w-0.5 bg-gradient-to-b from-transparent to-gray-400 my-2"></div>
                  </div>
                )}

                {/* Hexagon with icon */}
                <div className="transform transition-all duration-500 hover:-translate-y-2">
                  <Hexagon color={feature.color}>
                    <Icon className="w-10 h-10 text-white" strokeWidth={2.5} />
                  </Hexagon>
                </div>

                {/* Bottom section */}
                {isBottom && (
                  <div className="flex flex-col items-center mt-4">
                    <div className="h-12 w-0.5 bg-gradient-to-b from-gray-400 to-transparent my-2"></div>
                    <h3 className="text-center font-bold text-gray-800 text-sm leading-tight px-4 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-gray-600 text-center px-2 leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="h-12 w-0.5 bg-gradient-to-b from-transparent to-gray-400 my-2"></div>
                    <CheckIcon />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default WhyChooseUs;