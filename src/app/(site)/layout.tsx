
import Navbar from "@/app/(site)/_components/Navbar";
import Footer from "@/app/(site)/_components/Footer";


export default function SiteLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div
            style={{
                backgroundImage:
                    "linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.6)), url(/backgroud.png)",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
                minHeight: '100vh',
            }}
        >
            <div className="flex flex-col">
                {/* Navigation */}
                <Navbar />

                {/* Main Content */}
                <main className="min-h-screen flex-1">
                    {children}
                </main>

                {/* Footer */}
                <Footer />
            </div>

        </div>
    );
}


