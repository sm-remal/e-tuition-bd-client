import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Award, Target, CheckCircle, TrendingUp, Shield, Clock, ArrowRight, Star, Globe, Lightbulb } from 'lucide-react';
import { Link } from 'react-router';

const About = () => {
    const fadeInUp = {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }
    };

    const stats = [
        { icon: Users, number: '5,000+', label: 'Active Students' },
        { icon: Award, number: '2,500+', label: 'Verified Tutors' },
        { icon: BookOpen, number: '10,000+', label: 'Classes Completed' },
        { icon: TrendingUp, number: '95%', label: 'Success Rate' }
    ];

    const values = [
        {
            icon: Shield,
            title: 'Trust & Transparency',
            description: 'Every tutor undergoes rigorous verification. We ensure complete transparency in qualifications, pricing, and reviews to build lasting trust.'
        },
        {
            icon: Target,
            title: 'Quality First',
            description: 'We prioritize matching students with the most qualified tutors based on subject expertise, teaching style, and learning requirements.'
        },
        {
            icon: Clock,
            title: 'Save Time',
            description: 'Our intelligent matching system and automated workflows eliminate the hassle of finding tutors, saving you valuable time and effort.'
        }
    ];

    const features = [
        'Verified tutor profiles with qualifications and experience',
        'Secure payment gateway with transaction protection',
        'Real-time application tracking and status updates',
        'Admin moderation for quality assurance',
        'Flexible scheduling based on availability',
        'Direct messaging between students and tutors',
        'Detailed performance analytics and reports',
        'Mobile-responsive platform for on-the-go access'
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-base-100 transition-colors duration-300">
            <title>About | e-TuitionBD</title>
            
            {/* Hero Section */}
            <section className="relative bg-blue-50 dark:bg-base-300 text-white overflow-hidden pb-16">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
                </div>

                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-10 left-1/2 w-72 h-72 bg-sky-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

                <div className="container mx-auto px-4 pt-16 pb-24 md:pt-24 md:pb-32 relative">
                    <motion.div
                        className="max-w-4xl mx-auto text-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2.5 mb-8"
                        >
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-sm font-medium text-white/90">Leading Education Platform in Bangladesh</span>
                        </motion.div>

                        <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight text-gray-900 dark:text-white">
                            About <span className="text-blue-600 dark:text-cyan-300">eTuitionBd</span>
                        </h1>

                        <p className="text-lg text-blue-900 dark:text-blue-100 leading-relaxed max-w-3xl mx-auto">
                            Connecting passionate tutors with motivated students through a transparent, efficient, and trustworthy platform that transforms the way education works in Bangladesh.
                        </p>
                    </motion.div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 w-full">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block" style={{ height: 'auto' }}>
                        <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" className="fill-white dark:fill-base-100" />
                    </svg>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-white dark:bg-base-100">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <motion.div
                                    key={index}
                                    {...fadeInUp}
                                    transition={{ delay: index * 0.1 }}
                                    className="text-center group"
                                >
                                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                        <Icon className="w-10 h-10 text-blue-700 dark:text-cyan-400" />
                                    </div>
                                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">{stat.number}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-24 dark:bg-base-200">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
                        <motion.div {...fadeInUp}>
                            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full px-4 py-2 mb-6">
                                <Target className="w-4 h-4" />
                                <span className="text-sm font-semibold">Our Mission</span>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                                Empowering Education Through Technology
                            </h2>

                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                                At eTuitionBd, we believe that finding the right tutor should be simple, transparent, and reliable. Our mission is to revolutionize the tuition ecosystem in Bangladesh by creating a platform where students can easily discover qualified tutors and tutors can connect with students who need their expertise.
                            </p>

                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                                We're building more than just a platform – we're creating a community of learners and educators committed to excellence, transparency, and mutual growth. Every feature we develop is designed to make education more accessible and effective for everyone.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <div className="flex items-center gap-2 bg-white dark:bg-base-300 px-4 py-3 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span className="font-medium text-gray-700 dark:text-gray-200">Verified Tutors</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white dark:bg-base-300 px-4 py-3 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span className="font-medium text-gray-700 dark:text-gray-200">Secure Payments</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white dark:bg-base-300 px-4 py-3 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span className="font-medium text-gray-700 dark:text-gray-200">24/7 Support</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            {...fadeInUp}
                            transition={{ delay: 0.2 }}
                            className="relative"
                        >
                            <div className="relative bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl p-12 shadow-2xl">
                                <div className="absolute inset-0 bg-white/10 rounded-3xl"></div>
                                <Globe className="w-full h-full text-white opacity-20" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center text-white">
                                        <BookOpen className="w-24 h-24 mx-auto mb-4 opacity-90" />
                                        <h3 className="text-2xl font-bold">Making Education Accessible</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -bottom-6 -right-6 bg-cyan-200 dark:bg-cyan-900/30 w-32 h-32 rounded-full -z-10"></div>
                            <div className="absolute -top-6 -left-6 bg-blue-200 dark:bg-blue-900/30 w-32 h-32 rounded-full -z-10"></div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-24 bg-white dark:bg-base-100">
                <div className="container mx-auto px-4">
                    <motion.div className="text-center mb-16 max-w-3xl mx-auto" {...fadeInUp}>
                        <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full px-4 py-2 mb-6">
                            <Lightbulb className="w-4 h-4" />
                            <span className="text-sm font-semibold">Simple Process</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                            How eTuitionBd Works
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            Our streamlined three-step process makes connecting with the perfect tutor effortless
                        </p>
                    </motion.div>

                    <div className="max-w-5xl mx-auto">
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    step: '1',
                                    title: 'Post Your Requirements',
                                    description: 'Students create detailed tuition posts with subject, class level, budget, location, and schedule preferences.',
                                    icon: BookOpen
                                },
                                {
                                    step: '2',
                                    title: 'Review Applications',
                                    description: 'Qualified tutors browse and apply to suitable tuitions. Students receive applications with tutor profiles and qualifications.',
                                    icon: Users
                                },
                                {
                                    step: '3',
                                    title: 'Start Learning',
                                    description: 'Select your preferred tutor, complete secure payment, and begin your educational journey with confidence.',
                                    icon: Award
                                }
                            ].map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        {...fadeInUp}
                                        transition={{ delay: index * 0.15 }}
                                        className="relative"
                                    >
                                        <div className="bg-gradient-to-b from-blue-50 to-white dark:from-base-300 dark:to-base-200 border border-blue-100 dark:border-gray-700 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300 h-full">
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="flex-shrink-0 w-12 h-12 bg-blue-700 text-white rounded-xl flex items-center justify-center font-bold text-xl">
                                                    {item.step}
                                                </div>
                                                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-gray-700 dark:to-gray-600 rounded-xl flex items-center justify-center">
                                                    <Icon className="w-6 h-6 text-blue-700 dark:text-cyan-400" />
                                                </div>
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.description}</p>
                                        </div>
                                        {index < 2 && (
                                            <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                                                <ArrowRight className="w-8 h-8 text-blue-300 dark:text-gray-600" />
                                            </div>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16 bg-blue-50 dark:bg-base-200">
                <div className="container mx-auto px-4">
                    <motion.div className="text-center mb-16 max-w-3xl mx-auto" {...fadeInUp}>
                        <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full px-4 py-2 mb-6">
                            <Star className="w-4 h-4" />
                            <span className="text-sm font-semibold">Our Core Values</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                            What Makes Us Different
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            The principles that guide our mission and drive our success
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {values.map((value, index) => {
                            const Icon = value.icon;
                            return (
                                <motion.div
                                    key={index}
                                    {...fadeInUp}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white dark:bg-base-300 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-900 hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="w-14 h-14 bg-gradient-to-br from-blue-700 to-cyan-600 rounded-xl flex items-center justify-center mb-6">
                                        <Icon className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{value.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{value.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-white dark:bg-base-100">
                <div className="container mx-auto px-4">
                    <motion.div className="text-center mb-16 max-w-3xl mx-auto" {...fadeInUp}>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                            Comprehensive Platform Features
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            Everything you need for a seamless tutoring experience, all in one place
                        </p>
                    </motion.div>

                    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                {...fadeInUp}
                                transition={{ delay: index * 0.05 }}
                                className="flex items-start gap-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-base-300 dark:to-base-200 rounded-xl p-6 border border-blue-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-cyan-800 transition-colors duration-300"
                            >
                                <div className="flex-shrink-0 w-6 h-6 bg-blue-700 rounded-full flex items-center justify-center mt-0.5">
                                    <CheckCircle className="w-4 h-4 text-white" />
                                </div>
                                <p className="text-gray-700 dark:text-gray-200 font-medium">{feature}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
                </div>

                <div className="container mx-auto px-4 relative">
                    <motion.div
                        className="max-w-4xl mx-auto text-center text-white"
                        {...fadeInUp}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Ready to Transform Your Learning Experience?
                        </h2>
                        <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                            Join thousands of students and tutors who trust eTuitionBd for quality education
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to={"/tutors"}>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg inline-flex items-center justify-center gap-2"
                                >
                                    See All Tutors
                                    <ArrowRight className="w-5 h-5" />
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <style jsx>{`
                @keyframes blob {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    25% { transform: translate(20px, -20px) scale(1.1); }
                    50% { transform: translate(-20px, 20px) scale(0.9); }
                    75% { transform: translate(-20px, -20px) scale(1.05); }
                }
                .animate-blob {
                    animation: blob 10s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    );
};

export default About;