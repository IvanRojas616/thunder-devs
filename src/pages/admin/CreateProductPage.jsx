import React, { useRef, useState } from 'react'
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createProduct } from 'utils/apiProducts';

const CreateProductPage = () => {
    document.title = "Create Product";

    const formEditProduct = useRef(null);
    const [redirectToAdmin, setRedirectToAdmin] = useState(false);

    const submitEdition = (e) => {
        e.preventDefault();
        const dataToSendJson = {};
        const dataToSend = new FormData(formEditProduct.current);
        dataToSend.forEach((value, key) => {
            dataToSendJson[key] = value;
        });
        createProduct(dataToSendJson, (response) => {
            console.log(dataToSendJson, response.data);
            toast.success('Create successfully !!!');
            setRedirectToAdmin(true);
        }, (err) => {
            console.log(err);
            toast.error('Error !!!');
        });
        

    }

    return (
        redirectToAdmin ? (
            < Redirect to='/admin/products' />
        ) : (
            <section className="flex justify-center items-center w-full h-full mx-72">
                <form ref={formEditProduct} onSubmit={submitEdition} className="flex flex-col items-center w-full p-4 bg-purple-200 px-28 shadow-lg justify-cnter rounded-xl">
                    <h1 className="mt-2 text-center text-3xl">Create Product</h1>
                    <input type="text" maxLength="10" autoFocus required name="idProduct" className="mx-2 mt-8 mb-2 p-2 border-2 border-gray-400 bg-gray-50 rounded-lg w-full focus:bg-white" placeholder="Enter an unique id product " />
                    <textarea  maxLength="15" type="text" required name="description" className="m-1 p-2 border-2 border-gray-400 bg-gray-50 rounded-lg w-full focus:bg-white " placeholder="Enter a description" />
                    <input type="number" required name="unitPrice" className="m-1 p-2 border-2 border-gray-400 bg-gray-50 rounded-lg w-full focus:bg-white" placeholder="Enter price by unit" />
                    <select name="status" className="m-1 p-1 border-2 border-gray-400 bg-gray-50 rounded-lg w-full hover:bg-white" defaultValue="true">
                        <option value="false">No Disponible</option>
                        <option value="true">Disponible</option>
                    </select>
                    <div className="flex m-6 ">
                        <button type="submit" className="bg-green-500 rounded-lg hover:bg-green-700 py-1 px-4 shadow mr-4 text-lg">Create</button>
                        <button className="bg-red-500 rounded-lg hover:bg-red-700 py-1 px-4 shadow mr-4 text-lg" onClick={() => { setRedirectToAdmin(!redirectToAdmin) }}>Cancel</button>

                    </div>
                </form >
            </section >
        )

    )
}

export default CreateProductPage
