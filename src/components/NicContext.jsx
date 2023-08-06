// Create a new file (e.g., NicContext.js)

import { createContext, useContext, useState } from 'react';

const NicContext = createContext();

export function useNic() {
    return useContext(NicContext);
}

export function NicProvider({ children }) {
    const [nic, setNic] = useState('');

    return (
        <NicContext.Provider value={{ nic, setNic }}>
            {children}
        </NicContext.Provider>
    );
}
