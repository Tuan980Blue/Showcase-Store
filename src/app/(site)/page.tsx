import React from 'react';
import SidebarCatgory from "@/app/(site)/_components/SidebarCatgory";

const HomePage = () => {
    return (
        <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col lg:flex-row">
                <div className="hidden lg:block">
                    <SidebarCatgory />
                </div>

                {/* Main Content Area */}
                <div className="flex-1 min-w-0">
                    {/* Main content của web sẽ được đặt ở đây */}
                </div>
            </div>
        </div>
    );
};

export default HomePage;