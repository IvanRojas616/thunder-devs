import { useProductToEdit } from 'context/productToEditContext';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Dialog } from '@mui/material';
import { deleteProduct } from 'utils/apiProducts';
import { toast } from 'react-toastify';

const ProductCard = ({ product, executeEffectDependency, make}) => {
    const { setProductToEdit } = useProductToEdit();
    const [openDialog, setOpenDialog] = useState(false);

    const deleteProductR = () => {

      deleteProduct(product.idProduct, (response) => {
        console.log(response);
        toast.success("Delete Success");
        executeEffectDependency(!make);
      }, (err) => {
          toast.error("Error delete", err);
      });

      setOpenDialog(false);
      console.log(make);
    }

    return ( 
        <li className="flex flex-col bg-indigo-500 shadow-lg rounded-lg m-2 p-2 w-52 items-center">
            <img src="https://cdn0.iconfinder.com/data/icons/cosmo-layout/40/box-512.png" alt={product.name} className="w-24 h-24 m-2 shadow-md bg-gray-300 rounded mb-4 p-2"/>
            <p className="text-center text-white">{product.idProduct}</p>
            <p className="text-center text-white w-28 h-12 break-words">{product.description}</p>
            <p className="text-center text-white">{product.unitPrice}</p>
            <p className="text-center text-white object-cover">{product.status ? "Disponible" : "No Disponible"}</p>
            <div className="flex justify-around my-3">
            <Link to='/admin/products/edit'>
                <button className="shadow-md mr-8 focus:scale-150" onClick={() => { setProductToEdit(product)} }>
                    <p><span className="material-icons hover:text-white">mode_edit</span></p>
                </button>
            </Link> 

            <button onClick={() => { setOpenDialog(true) }} className="shadow-md" >
            <p><span className="material-icons hover:text-red-500">delete</span></p>
            </button>
            <Dialog open={openDialog}>
          <div className='p-8 flex flex-col bg-blue-800 opacity-80 shadow-xl'>
            <h1 className='opacity-100 text-2xl font-bold'>
              ¿Está seguro de querer eliminar el producto?
            </h1>
            <div className='flex w-full items-center justify-center my-4'>
              <button
                className='opacity-100 mx-2 px-4 py-2 bg-green-500 text-white hover:bg-green-700 rounded-md shadow-md'
                onClick={() => {deleteProductR()}}
              >
                Sí
              </button>
              <button
                onClick={() => setOpenDialog(false)}
                className='opacity-100 mx-2 px-4 py-2 bg-red-500 text-white hover:bg-red-700 rounded-md shadow-md'
              >
                No
              </button>
            </div>
          </div>
        </Dialog>
            
            </div>
        </li>
    )
}

export default ProductCard
