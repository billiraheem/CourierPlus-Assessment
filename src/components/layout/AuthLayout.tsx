import { Outlet } from 'react-router-dom';
import loginImg from '../../assets/login.jpg';

export const AuthLayout = () => {
    return (
        <div className="flex min-h-screen w-full font-sans">
            {/* Left Side - Image/Branding */}
            <div className="hidden lg:flex w-1/2 relative bg-primary">
                <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-50" style={{ backgroundImage: `url(${loginImg})` }}></div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-black/40" />

                <div className="relative w-full flex flex-col justify-between p-12 text-white z-10">
                    <div>
                        <h1 className="text-3xl font-bold italic">TrackPlus</h1>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-4xl font-bold leading-tight">
                            Your trusted gateway to seamless logistics services, anytime, anywhere.
                        </h2>
                        <div className="flex space-x-2">
                            <div className="h-2 w-2 rounded-full bg-white/50" />
                            <div className="h-2 w-2 rounded-full bg-white" />
                            <div className="h-2 w-2 rounded-full bg-white/50" />
                            <div className="h-2 w-2 rounded-full bg-white/50" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <p className="text-sm font-medium opacity-90">Download the TrackPlus App</p>
                        <div className="flex gap-4">
                            <div className="bg-black text-white px-4 py-2 rounded flex items-center gap-2 cursor-pointer border border-gray-700">
                                <div className="text-xs">GET IT ON <br /><span className="text-lg font-bold">Google Play</span></div>
                            </div>
                            <div className="bg-black text-white px-4 py-2 rounded flex items-center gap-2 cursor-pointer border border-gray-700">
                                <div className="text-xs">Download on the <br /><span className="text-lg font-bold">App Store</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex flex-col justify-center items-center p-8 bg-white">
                <div className="w-full max-w-md space-y-8">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};
