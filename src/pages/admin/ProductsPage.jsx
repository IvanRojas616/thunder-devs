import ProductCard from 'components/admin/ProductCard'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { retrieveAllProducts } from 'utils/apiProducts'
import { nanoid } from 'nanoid'
import { Tooltip } from '@mui/material'
import ReactLoading from 'react-loading';

const ProductsPage = () => {
    document.title = "Products";

    const [listProducts, setListProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    //put as a dependency for useEffect()
    const [makeARequest, setMakeARequest] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
        setLoading(true);
        const retrieveProducts = async () =>  {
            await retrieveAllProducts((response) => {
                setListProducts(response.data);
                console.log("get products");
                console.log(response.data);
                setLoading(false);
            }, (error) => {
                toast.error("Error 500", error);
                console.log("ja",error);
                setLoading(false);
            });
        }

        if (localStorage.getItem('token')) {
            retrieveProducts();
        }

    }, [makeARequest])

    useEffect(() => {
        if (search === "") {
            setMakeARequest(!makeARequest);
        }
        else {
            setListProducts(
                listProducts.filter((element) => {
                    return Object.values(element).join(" ").toLowerCase().includes(search.toLowerCase());
                })
            )
        }
        //here don't put listProducts, because setListProducts change it when useEffect is called, so that will generate an infinite loop
        //this is a possible refactoring code
        // eslint-disable-next-line
    }, [search])

    return (
        <section className="flex flex-col h-full w-full m-2 items-center ">
            <h1 className="text-center font-extrabold text-4xl my-8">Products List</h1>
            <form className="flex w-full justify-center mb-8">
                <input type="text" name="search" className="rounded-md focus:border-dashed focues:bg-green-100 shadow-green-200 p-3 mx-7 w-72" onInput={(e) => {
                    setSearch(e.target.value)
                }} placeholder="Search by id, price or description"/>
                <Tooltip arrow placement="right-start" title="Create a new product">
                    <Link to="/admin/products/create">
                        <button className="bg-green-400 w-12 h-12 rounded-full flex items-center justify-center"><span className="material-icons">
                            add_circle
                        </span></button>
                    </Link>
                </Tooltip>
            </form>
            {
                loading ? (
                    <ReactLoading type="spin" color="#000"/>
                ) : (
                    <ul className="flex flex-col md:flex-row lg:flex-row flex-wrap p-4 justify-center">
                {
                    listProducts.length !== 0 ? 
                    (listProducts.map((product) => {
                        return (
                            <ProductCard product={product} executeEffectDependency={setMakeARequest} make={makeARequest} key={nanoid()} />
                        )
                    })
                    ):
                    (
                        <div className="mt-4 ml-7 text-lg text-center">Not found</div>
                    )
                }
            </ul>
                )
            }
        </section>
    )
}

export default ProductsPage

