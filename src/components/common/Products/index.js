import React from 'react'
import Product from './Product';
import { useTheme } from 'styled-components';

export default function Products({ products }) {
    const theme = useTheme();

    return (
        <div className={` Products min-h-[100vh] w-full flex justify-center ` + theme.colors.primary}>
            {/* <div className="w-11/12 flex"> */}
            <div className={` w-[97%] justify-center grid grid-cols-none xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 p-5 gap-[15px]  `}>
              {products.map(product => (
                    <Product product={product} />
                )
                )}
            </div>
            {/* </div> */}
        </div>
    )
}
