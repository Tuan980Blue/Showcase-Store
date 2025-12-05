
import Navbar from "@/app/(site)/_components/Navbar";
import Footer from "@/app/(site)/_components/Footer";
import EnhancedPopcornAnimation from "@/app/(site)/_components/EnhancedPopcornAnimation";


export default function SiteLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <div className="flex flex-col">
                {/* Navigation */}
                <Navbar />

                {/* Main Content */}
                <main className="min-h-screen flex-1 relative">
                    {children}
                </main>

                {/* Footer */}
                <Footer />
            </div>
        </div>
    );
}


