import { createContext, useEffect, useState, useMemo } from "react";
import axios from 'axios';

export const MyProducts = createContext();

export const ProductsProvider = ({ children }) => {

    const [productsData, setProductsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [countCategories, setCountCategories] = useState({});
    
    const [filters, setFilters] = useState({
        category: 'all',           
        priceRange: [0, 1000],     
        sortBy: 'featured',        
        searchQuery: ''            
    });

    const getProducts = async () => {
        try {
            setLoading(true);
            const res = await axios.get('https://fakestoreapi.com/products');
            setProductsData(res.data);

            const categoryMap = {};
            res.data.forEach((product) => {
                const cat = product.category;
                categoryMap[cat] = (categoryMap[cat] || 0) + 1;
            });
            setCountCategories(categoryMap);

            const categoryList = Object.keys(categoryMap).map(cat => ({
                name: cat,
                items: `${categoryMap[cat]} items`,
                count: categoryMap[cat],
                icon: getCategoryIcon(cat),
                bg: getCategoryBg(cat)
            }));

            setCategories(categoryList);

        } catch (error) {
            console.error('Error in API->', error)
        } finally {
            setLoading(false);
        }
    }

    const getCategoryIcon = (category) => {
        const icons = {
            "electronics": "💻",
            "jewelery": "💎",
            "men's clothing": "👔",
            "women's clothing": "👗",
            "furniture": "🪑",
            "home": "🏠",
            "sports": "⚽",
            "accessories": "⌚",
            "clothing": "👕",
            "books": "📚",
            "toys": "🧸",
            "beauty": "💄",
            "automotive": "🚗",
            "health": "💊",
            "grocery": "🛒",
            "music": "🎵",
            "gaming": "🎮",
            "photography": "📷"
        };
        return icons[category] || "📦";
    };

    const getCategoryBg = (category) => {
        const bgs = {
            "electronics": "from-blue-500/10 to-transparent",
            "jewelery": "from-yellow-500/10 to-transparent",
            "men's clothing": "from-pink-500/10 to-transparent",
            "women's clothing": "from-purple-500/10 to-transparent",
            "furniture": "from-amber-500/10 to-transparent",
            "home": "from-emerald-500/10 to-transparent",
            "sports": "from-orange-500/10 to-transparent",
            "accessories": "from-violet-500/10 to-transparent",
            "clothing": "from-rose-500/10 to-transparent",
            "books": "from-indigo-500/10 to-transparent",
            "toys": "from-red-500/10 to-transparent",
            "beauty": "from-pink-500/10 to-transparent",
            "automotive": "from-gray-500/10 to-transparent",
            "health": "from-green-500/10 to-transparent"
        };
        return bgs[category] || "from-lime-500/10 to-transparent";
    };

    useEffect(() => {
        getProducts();
    }, []);

    const setCategoriesFilter = (category) => {
        setFilters(prev => ({ ...prev, category: category || 'all' }));
    };

    const setPriceRange = (value) => {
        if (typeof value === 'string') {
            // Handle string values from dropdown
            if (value === 'all') {
                setFilters(prev => ({ ...prev, priceRange: [0, 1000] }));
                return;
            }
            const [min, max] = value.split('-').map(Number);
            if (value === '200+') {
                setFilters(prev => ({ ...prev, priceRange: [200, 10000] }));
            } else {
                setFilters(prev => ({ ...prev, priceRange: [min, max] }));
            }
        } else if (Array.isArray(value)) {
            // Handle array values
            setFilters(prev => ({ ...prev, priceRange: value }));
        }
    };

    const setSortBy = (sortType) => {
        setFilters(prev => ({ ...prev, sortBy: sortType || 'featured' }));
    };

    const setSearchQuery = (query) => {
        setFilters(prev => ({ ...prev, searchQuery: query || '' }));
    };

    const clearFilters = () => {
        setFilters({
            category: 'all',
            priceRange: [0, 1000],
            sortBy: 'featured',
            searchQuery: ''
        });
    };

    const filteredProductsData = useMemo(() => {
        let result = [...productsData];

        if (filters.category !== 'all' && filters.category !== 'All') {
            result = result.filter(product =>
                product.category === filters.category
            );
        }

        const [min, max] = filters.priceRange || [0, 1000];
        result = result.filter(product =>
            product.price >= min && product.price <= max
        );

        if (filters.searchQuery) {
            const query = filters.searchQuery.toLowerCase();
            result = result.filter(product =>
                product.title.toLowerCase().includes(query) ||
                product.category.toLowerCase().includes(query)
            );
        }

        switch (filters.sortBy) {
            case 'price-low':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                result.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
                break;
            default: // featured
                break;
        }

        return result;

    }, [productsData, filters]);

    return (
        <MyProducts.Provider value={{ 
            productsData, 
            setProductsData, 
            loading, 
            setLoading, 
            categories, 
            countCategories,  
            filters,
            setCategoriesFilter,
            setPriceRange,
            setSortBy,
            setSearchQuery,
            clearFilters,
            filteredProductsData
        }}>
            {children}
        </MyProducts.Provider>
    );
};