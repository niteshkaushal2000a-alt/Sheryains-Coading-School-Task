// src/hooks/useLocation.js
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export const useLocation = () => {
    const [location, setLocation] = useState({
        city: '',
        state: '',
        country: '',
        loading: true,
        error: null,
        coordinates: null,
        fullAddress: ''
    });

    useEffect(() => {
        getCurrentLocation();
    }, []);

    const getCurrentLocation = () => {
        if (!navigator.geolocation) {
            setLocation(prev => ({
                ...prev,
                loading: false,
                error: 'Geolocation is not supported'
            }));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                
                try {
                    const address = await getAddressFromCoords(latitude, longitude);
                    
                    setLocation({
                        city: address.city || address.town || address.village || '',
                        state: address.state || '',
                        country: address.country || '',
                        fullAddress: address.fullAddress || '',
                        loading: false,
                        error: null,
                        coordinates: { latitude, longitude }
                    });
                } catch (error) {
                    setLocation(prev => ({
                        ...prev,
                        loading: false,
                        error: 'Failed to get address',
                        coordinates: { latitude, longitude }
                    }));
                }
            },
            (error) => {
                let errorMessage = 'Unable to retrieve location';
                if (error.code === 1) errorMessage = 'Location permission denied';
                else if (error.code === 2) errorMessage = 'Location unavailable';
                else if (error.code === 3) errorMessage = 'Location request timeout';
                
                setLocation(prev => ({
                    ...prev,
                    loading: false,
                    error: errorMessage
                }));
            },
            { enableHighAccuracy: true, timeout: 10000 }
        );
    };

    const refreshLocation = () => {
        setLocation(prev => ({ ...prev, loading: true, error: null }));
        getCurrentLocation();
    };

    return { ...location, refreshLocation };
};

// Helper function
const getAddressFromCoords = async (latitude, longitude) => {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
        );
        const data = await response.json();
        
        if (data && data.address) {
            return {
                city: data.address.city || data.address.town || data.address.village || '',
                state: data.address.state || data.address.region || '',
                country: data.address.country || '',
                fullAddress: data.display_name || ''
            };
        }
        return { city: '', state: '', country: '', fullAddress: '' };
    } catch (error) {
        console.error('Error fetching address:', error);
        return { city: '', state: '', country: '', fullAddress: '' };
    }
};