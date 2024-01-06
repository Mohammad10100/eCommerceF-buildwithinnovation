import React, { useEffect, useState } from 'react'
import Cart from "../common/Cart";
import { addItem } from '../../slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function Home() {
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([])
    const [searchTerm, setSearchTerm] = useState({
        name: '',
        maxPrice: '',
    })
    const cartCount = useSelector((state) => state.cart.count);

    //fetch all the products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products')
                if (!response.ok) {
                    if (response.status === 400) {
                        console.log(response.status, 'something went wrong while fetching the products')
                    }
                } else {
                    const result = await response.json();
                    setProducts(result.products)
                }
            } catch (error) {
                console.error("success: false", error.message)
            }
        }
        
        fetchProducts();
        setFiltered(products);
    }, [])


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSearchTerm((prevSearchTerm) => ({
            ...prevSearchTerm,
            [name]: value,
        }));

        const filteredProducts = products.filter(product => {
            const matchesSearch = product.title.toLowerCase().includes(searchTerm.name.toLowerCase())

            const withinPriceRange =
                (!searchTerm.maxPrice || product.price <= searchTerm.maxPrice);

            return withinPriceRange && matchesSearch
        }
        );
        setFiltered(filteredProducts)

    };

    const handleAddToCart = ()=>{
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


    return (
        <>
            <div>
                <div>
                    <input
                        type="text"
                        placeholder="Search products by name"
                        name="name"
                        value={searchTerm.name}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <input
                        type="text"
                        placeholder="Maximum Price"
                        name="maxPrice"
                        value={searchTerm.maxPrice}
                        onChange={handleInputChange}
                    />
                </div>
                {` ${cartCount}`}
                <Cart />
                <div onClick={handleAddToCart}>Add to Cart</div>
            </div>
        </>
    )
}
