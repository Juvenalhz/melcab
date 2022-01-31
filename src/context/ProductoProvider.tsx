 
import { ProductoContext } from './ProductoContext';

interface props {
    children: JSX.Element | JSX.Element[]  
}

export const ProductoProvider = ({ children }: props) => {
    return
    (<ProductoContext.Provider value={{}}>
        {children}
    </ProductoContext.Provider>)
};
