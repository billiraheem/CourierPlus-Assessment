import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, LogOut, Menu, X } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '../../utils/cn';
import { DashboardProvider, useDashboard } from '../../context/DashboardContext';

const DashboardLayoutContent = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const location = useLocation();
    const { title } = useDashboard();

    const navItems = [
        { label: 'Blogs', path: '/dashboard/blogs', icon: <LayoutDashboard size={20} /> },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0",
                    !isSidebarOpen && "-translate-x-full lg:hidden"
                )}
            >
                <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100">
                    <span className="text-xl font-bold text-primary italic">TrackPlus</span>
                    <button className="lg:hidden" onClick={() => setIsSidebarOpen(false)}>
                        <X size={20} />
                    </button>
                </div>

                <div className="p-4 space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors",
                                location.pathname.startsWith(item.path)
                                    ? "bg-primary/10 text-primary"
                                    : "text-text-secondary hover:bg-gray-100 hover:text-text-primary"
                            )}
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                    ))}
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                    <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50">
                        <LogOut size={18} className="mr-2" />
                        Logout
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8">
                    <div className="flex items-center gap-4">
                        <button className="lg:hidden" onClick={() => setIsSidebarOpen(true)}>
                            <Menu size={24} />
                        </button>
                        <h2 className="text-lg font-semibold text-text-primary capitalize">
                            {title}
                        </h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                            U
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export const DashboardLayout = () => {
    return (
        <DashboardProvider>
            <DashboardLayoutContent />
        </DashboardProvider>
    );
};
