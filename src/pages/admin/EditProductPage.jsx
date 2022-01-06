import { useProductToEdit } from 'context/productToEditContext'
import React, { useRef, useState } from 'react'
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { editProduct } from 'utils/apiProducts';

const EditProductPage = () => {
    document.title = "Edit Product";

    const { productToEdit, setProductToEdit } = useProductToEdit();
    const [redirectToAdmin, setRedirectToAdmin] = useState(false);
    const formEditProduct = useRef(null);

    const submitEdition = (e) => {
        e.preventDefault();
        const dataToSendJson = {};
        const dataToSend = new FormData(formEditProduct.current);
        dataToSend.forEach((value, key) => {
            if (!(value === "")) {
                dataToSendJson[key] = value;
            }
        });
        console.log(productToEdit.idProduct);
        editProduct(productToEdit.idProduct, dataToSendJson, (response) => {
            console.log(dataToSendJson, response.data);
            setTimeout(setProductToEdit(null),2500);
            toast.success('Edit successfully !!!');
        }, (err) => {
            console.log(err);
            toast.error('Error !!!');
        });

        

    }

    return (
        <section className="flex justify-center items-center w-full h-full mx-72">

            {
                (productToEdit === null || redirectToAdmin) ? (
                    < Redirect to='/admin/products' />
                ) : (
                    <form ref={formEditProduct} onSubmit={submitEdition} className="flex flex-col items-center w-full p-4 bg-purple-200 px-28 shadow-lg rounded-xl ">
                        <h1 className="mt-2 text-center text-3xl">Edit Product</h1>
                        <h3 type="text" className="mx-2 mt-8 mb-2 p-2 border-2 border-gray-400 bg-gray-50 rounded-lg w-full focus:bg-white">{productToEdit.idProduct}</h3>

                        <textarea autoFocus maxLength="15" type="text" required name="description" className="m-1 p-2 border-2 border-gray-400 bg-gray-50 rounded-lg w-full focus:bg-white " defaultValue={productToEdit.description} />

                        <input type="number" required name="unitPrice" className="m-1 p-2 border-2 border-gray-400 bg-gray-50 rounded-lg w-full focus:bg-white" defaultValue={productToEdit.unitPrice} />
                        <select name="status" className="m-1 p-1 border-2 border-gray-400 bg-gray-50 rounded-lg w-full hover:bg-white" defaultValue={productToEdit.status ? "true" : "false"}>
                            <option value="false">No Disponible</option>
                            <option value="true">Disponible</option>
                        </select>
                        <div className="flex m-6 ">
                            <button type="submit" className="bg-green-500 rounded-lg hover:bg-green-700 py-1 px-4 shadow mr-4 text-lg">Edit</button>
                            <button className="bg-red-500 rounded-lg hover:bg-red-700 py-1 px-4 shadow mr-4 text-lg" onClick={() => { setRedirectToAdmin(!redirectToAdmin) }}>Cancel</button>

                        </div>
                    </form>
                )
            }

        </section>
    )
}

export default EditProductPage
