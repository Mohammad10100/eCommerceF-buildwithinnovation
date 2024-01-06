import React, { useEffect, useState } from 'react'

export default function Home() {
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([])
    const [searchTerm, setSearchTerm] = useState({
        name: '',
        maxPrice: '',
    })

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
            </div>
        </>
    )
}
