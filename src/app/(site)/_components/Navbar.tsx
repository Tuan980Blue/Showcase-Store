
import Link from "next/link";
import {useEffect, useRef, useState} from "react";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('home');
    const [isMainNavFixed, setIsMainNavFixed] = useState(false);
    const [mainNavHeight, setMainNavHeight] = useState(0);
    const headerRef = useRef<HTMLDivElement | null>(null);
    const mainNavRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const measureHeights = () => {
            if (mainNavRef.current) {
                setMainNavHeight(mainNavRef.current.offsetHeight || 0);
            }
        };

        const handleScroll = () => {
            if (!headerRef.current) return;
            const headerBottom = headerRef.current.getBoundingClientRect().bottom;
            setIsMainNavFixed(headerBottom <= 0);
        };

        measureHeights();
        handleScroll();
        window.addEventListener('resize', measureHeights);
        window.addEventListener('scroll', handleScroll, {passive: true});
        return () => {
            window.removeEventListener('resize', measureHeights);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const menuItems = [
        {id: 'home', label: 'TRANG CHỦ', icon: '🏠', path: '/'},
        {id: 'products', label: 'SẢN PHẨM', icon: '🎬', path: '/products'},
        {id: 'about', label: 'GIỚI THIỆU', icon: 'ℹ️', path: '/about'},
    ];

    return (
        <nav className="relative shadow-lg">

        </nav>
    );
};

export default Navbar;
