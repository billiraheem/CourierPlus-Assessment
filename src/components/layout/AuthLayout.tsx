import { Outlet } from 'react-router-dom';
import loginImg from '../../assets/login.jpg';

export const AuthLayout = () => {
    return (
        <div className="flex h-full w-full overflow-hidden">
            {/* Left Side - Image & Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-zinc-900 flex-shrink-0 flex-col" style={{
                backgroundImage: `url(${loginImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>

                {/* Main Content Area */}
                <div className=" flex-1 flex flex-col items-center justify-center px-12">
                    {/* Glassmorphism Card */}
                    <div
                        className="w-full max-w-sm rounded-3xl p-8 shadow-2xl flex flex-col"
                        style={{
                            height: '380px',
                            background: 'rgba(255, 255, 255, 0.15)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)'
                        }}
                    >
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold italic tracking-wide text-white">TrackPlus</h1>
                        </div>

                        <h2 className="text-lg font-medium leading-relaxed mb-auto text-white">
                            Your trusted gateway to seamless logistics services, anytime, anywhere.
                        </h2>

                        <button className="mt-auto self-start px-6 py-2 bg-white text-gray-800 font-medium rounded-md hover:bg-gray-100 transition-colors text-sm">
                            Track shipment
                        </button>
                    </div>

                    <div className="flex items-center justify-center gap-4 mt-4 border-blue-200">
                        <button className="text-white/70 hover:text-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </button>

                        <div className="flex space-x-2">
                            <div className="h-2 w-2 rounded-full bg-white/40 cursor-pointer" />
                            <div className="h-2.5 w-2.5 rounded-full bg-white cursor-pointer" />
                            <div className="h-2 w-2 rounded-full bg-white/40 cursor-pointer" />
                        </div>

                        <button className="text-white/70 hover:text-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Download App Section - Bottom */}
                <div className="flex-[0] px-12 pb-8">
                    <p className="text-white text-sm font-medium mb-3">Download the TrackPlus App</p>
                    <div className="flex gap-3">
                        <a href="#" className="flex items-center gap-2 bg-black text-white px-3 py-1.5 rounded-md hover:bg-gray-900 transition-colors">
                            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 9.99l-2.302 2.302-8.634-8.634z" />
                            </svg>
                            <div className="text-left">
                                <div className="text-[9px] leading-tight opacity-80">GET IT ON</div>
                                <div className="text-xs font-semibold leading-tight">Google Play</div>
                            </div>
                        </a>

                        <a href="#" className="flex items-center gap-2 bg-black text-white px-3 py-1.5 rounded-md hover:bg-gray-900 transition-colors">
                            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                            </svg>
                            <div className="text-left">
                                <div className="text-[9px] leading-tight opacity-80">Download on the</div>
                                <div className="text-xs font-semibold leading-tight">App Store</div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white overflow-y-auto">
                <div className="w-full max-w-md">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};