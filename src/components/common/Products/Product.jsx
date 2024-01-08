import React from 'react'
import { useTheme } from 'styled-components';

export default function Product({product}) {
  const theme = useTheme();

  return (
    <div className={theme.colors.primary + ` h-fit flex-col ticket py-[0.8rem] px-[1.2rem] flex border-2 rounded-lg shadow-md gap-[0.5rem] `  + theme.colors.text_faint+ ' ' + theme.colors.border_color}>
      <img src={product.thumbnail} alt="" className=' w-[20vw] h-[20vh]' />
      <div className='h-[4rem] flex '>
      <p className=' text-sm h-full '>
        {/* {product.description} */}
        {product.description.split(/\s+/).slice(0,7).join(' ')}
        </p>
      </div>
      <div className="priced flex justify-between">
      <p>{product.price}</p>
      <p>{product.discountPercentage}</p>
      </div>
    </div>
  )
}
