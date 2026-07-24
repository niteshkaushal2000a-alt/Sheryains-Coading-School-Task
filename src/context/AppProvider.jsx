import { SignUpProvider } from './SignUpProvider';
import { AuthProvider } from './AuthProvider';
import { ProductsProvider } from './ProductsProvider';

import React from 'react'
import { CartProvider } from './CartProvider';

const AppProvider = ({ children }) => {
    return (
        <SignUpProvider>
            <AuthProvider>
                <ProductsProvider>
                    <CartProvider>
                        {children}
                    </CartProvider>
                </ProductsProvider>
            </AuthProvider>
        </SignUpProvider>
    )
}

export default AppProvider
