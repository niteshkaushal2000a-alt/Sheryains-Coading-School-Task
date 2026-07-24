import { Toaster } from 'sonner'
import React from 'react'

const Toaster = () => {
    return (
        <>
            <Toaster
                position="top-right"  // position set karein
                richColors           // rich colors enable karein
                expand={true}        // expand on hover
            />
            {/* Your app content */}
        </>
    );
}

export default Toaster