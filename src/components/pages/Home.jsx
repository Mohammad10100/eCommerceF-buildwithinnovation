import React, { useEffect, useState } from 'react'
import { addItem } from '../../slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components';
import { setTheme } from '../../slices/themeSlice'
import { PiMoonFill } from "react-icons/pi";
import { MdSunny } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from 'react-router-dom'
import Products from '../common/Products/index'
import Cart from './Cart'

export default function Home() {
    const theme = useTheme();
    const dispatch = useDispatch();

    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([])
    const [cartItems, setCartItems] = useState([])
    const [searchTerm, setSearchTerm] = useState({
        name: '',
        maxPrice: '',
    })
    const cartCount = useSelector((state) => state.cart.count);
    const cartProducts = useSelector((state) => state.cart.items);
    const [isCart, setIsCart] = useState(0);

    //fetch all the products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products')
                console.log(response);
                if (!response.ok) {
                    if (response.status === 400) {
                        console.log(response.status, 'something went wrong while fetching the products')
                    }
                } else {
                    console.log('hi');
                    const result = await response.json();
                    setProducts(result.products)
                    setFiltered(result.products);

                }
            } catch (error) {
                console.error("success: false", error.message)
            }
        }

        fetchProducts();
        // eslint-disable-next-line
    }, [])


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSearchTerm((prevSearchTerm) => ({
            ...prevSearchTerm,
            [name]: value,
        }));
    };

    useEffect(()=>{
        const filteredProducts = products.filter(product => {
            const matchesSearch = product.title.toLowerCase().includes(searchTerm.name.toLowerCase())

            const withinPriceRange =
                (!searchTerm.maxPrice || product.price <= searchTerm.maxPrice);

            return withinPriceRange && matchesSearch;
        });
        setFiltered(filteredProducts)
        const filtCartProducts = cartProducts?.filter(product => {
            const matchesSearch = product.title.toLowerCase().includes(searchTerm.name.toLowerCase())
            
            const withinPriceRange =
            (!searchTerm.maxPrice || product.price <= searchTerm.maxPrice);
            
            return withinPriceRange && matchesSearch
        });
        setCartItems(filtCartProducts)
    },[searchTerm])

    const handleAddToCart = () => {
        // TODO:
        // find the product id using this/event keyword 
        // for now i am directly using any one of the ids of product
        const product = products[2];
        console.log(product);

        // use dispatch to dispatch the product 
        dispatch(addItem(product));

        // TODO: 
        // you can use loading also
    }

    const ThemeValue = useSelector(state => state.theme.theme);
    const changeTheme = () => {
        ThemeValue == 'dark' ? dispatch(setTheme('light')) : dispatch(setTheme('dark'));
    }


    return (
        <>
        <div className={` w-full flex justify-center py-2 ` + theme.colors.bg}>
            <div className={` w-11/12 flex justify-between items-center p-1 ` + theme.colors.text}>
                <div className={` flex ` + theme.colors.text_faint}>
                    <input
                        type="text"
                        placeholder="Search products by name"
                        name="name"
                        value={searchTerm.name}
                        onChange={handleInputChange}
                        className={` outline-none border font-semibold rounded-md p-1 mr-2 ` + theme.colors.bg_search}
                    />

                    <input
                        type="text"
                        placeholder="Maximum Price"
                        name="maxPrice"
                        value={searchTerm.maxPrice}
                        onChange={handleInputChange}
                        className={` outline-none border font-semibold rounded-md p-1 ` + theme.colors.bg_search}
                    />
                </div>
                <div className=' flex items-center '>
                    <div className="cart relative mx-3 ">
                        {cartCount > 0 && <p className={`absolute top-[-0.5rem] left-[0.5rem] rounded-full w-4 h-4 size-[0.5rem] text-xs flex justify-center items-center ` + theme.colors.greenish}>{` ${cartCount}`}</p>}
                        <FiShoppingCart onClick={()=>{setIsCart(!isCart)}}/>
                    </div>
                    <div className="theme flex " onClick={changeTheme}>
                        {theme.name == 'light' ? <PiMoonFill /> : <MdSunny />}
                    </div>
                </div>
                {/* <div onClick={handleAddToCart} className=''>Add to Cart</div> */}
            </div>
        </div>
        {isCart?
        (<Cart products={cartItems}/>):(<Products products={filtered}/>)}
        </>
    )
}
