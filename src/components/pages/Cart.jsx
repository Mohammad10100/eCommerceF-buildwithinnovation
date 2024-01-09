import React from 'react'
import Products from '../common/Products'
import { useTheme } from 'styled-components';

export default function Cart({products}) {
  const theme = useTheme();

  return (
    <div className=' flex-col items-center justify-center '>
      <span className={" flex p-3 justify-center " + theme.colors.text+ " " + theme.colors.primary}>Your Cart Items</span>
      <Products products={products}/>
    </div>
  )
}
