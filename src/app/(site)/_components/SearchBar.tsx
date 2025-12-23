"use client";

import { useState, FormEvent, useEffect, useRef } from "react";
import { useProductSearch } from "@/app/(site)/_hooks";
import SearchResultsDropdown from "./SearchResultsDropdown";

/**
 * SearchBar Component
 * Standalone search bar component with integrated search functionality
 * Displays search results in a dropdown for immediate product selection
 */
const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [clickedOutside, setClickedOutside] = useState(false);
    const searchContainerRef = useRef<HTMLDivElement>(null);
    const { search, results, loading, error, clear } = useProductSearch();

    // Derive showResults from state instead of using useEffect
    const hasSearchContent = searchQuery.trim().length > 0;
    const hasSearchState = results.length > 0 || loading || error;
    const showResults = isFocused && !clickedOutside && hasSearchContent && hasSearchState;

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                searchContainerRef.current &&
                !searchContainerRef.current.contains(event.target as Node)
            ) {
                setClickedOutside(true);
            } else {
                setClickedOutside(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Auto-search with debounce (searches automatically as user types)
    useEffect(() => {
        const trimmedQuery = searchQuery.trim();
        
        // Clear results immediately if input is empty
        if (!trimmedQuery) {
            clear();
            return;
        }

        // Debounce: wait 500ms after user stops typing before searching
        const debounceTimer = setTimeout(() => {
            const performSearch = async () => {
                try {
                    await search(trimmedQuery);
                } catch (error) {
                    console.error('Search error:', error);
                }
            };
            performSearch();
        }, 500);

        // Cleanup: clear timer if user types again before delay completes
        return () => {
            clearTimeout(debounceTimer);
        };
    }, [searchQuery, search, clear]);

    const handleSearch = async (e: FormEvent) => {
        e.preventDefault();
        const trimmedQuery = searchQuery.trim();
        
        if (!trimmedQuery) {
            clear();
            return;
        }

        // Immediate search on button click (no debounce)
        try {
            await search(trimmedQuery);
        } catch (error) {
            console.error('Search error:', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
    };

    const handleResultClick = () => {
        setSearchQuery('');
        setIsFocused(false);
        setClickedOutside(false);
        clear();
    };

    return (
        <div className="" ref={searchContainerRef}>
            <form onSubmit={handleSearch} className="flex">
                <div className="flex-1 relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleInputChange}
                        onFocus={() => {
                            setIsFocused(true);
                            setClickedOutside(false);
                        }}
                        onBlur={() => {
                            // Delay to allow click events on results to fire first
                            setTimeout(() => setIsFocused(false), 200);
                        }}
                        placeholder="Tìm kiếm sản phẩm..."
                        className="w-full px-4 py-2 pl-10 border rounded focus:outline-none"
                        style={{
                            borderColor: "var(--border-light)",
                            color: "var(--text-dark)",
                            backgroundColor: "var(--bg-mint)",
                        }}
                    />
                    <svg
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        style={{ color: "var(--text-light)" }}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    
                    {/* Search Results Dropdown */}
                    {showResults && (
                        <SearchResultsDropdown
                            results={results}
                            loading={loading}
                            error={error}
                            onClose={handleResultClick}
                        />
                    )}
                </div>
                <button
                    type="submit"
                    className="px-6 py-2 rounded transition-colors font-medium"
                    style={{
                        backgroundColor: "var(--btn-primary)",
                        color: "var(--text-inverse)",
                    }}
                    disabled={loading || !searchQuery.trim()}
                >
                    {loading ? "Đang tìm..." : "Tìm kiếm"}
                </button>
            </form>
            <p
                className="text-xs mt-1 italic"
                style={{ color: "var(--text-light)" }}
            >
                Tìm sản phẩm: Đèn, Chuột, Máy đo huyết áp, Camera...
            </p>
        </div>
    );
};

export default SearchBar;

