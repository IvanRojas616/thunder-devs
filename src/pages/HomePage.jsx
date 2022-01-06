import React from 'react'

const HomePage = () => {
    document.title = "Thunder Devs App";

    return (
        <>
        <section className="ml-10 py-5 lg:py-1">
            <p className="text-white fontMain text-5xl w-4/5"><span className="text-blue-900">Manage</span> your bussiness like you want </p>
        </section>
        <section className=" flex items-center pl- 10 mr-10 w-2/5">
            <img src="https://images.pexels.com/photos/1882309/pexels-photo-1882309.jpeg?cs=srgb&dl=pexels-vit%C3%B3ria-santos-1882309.jpg&fm=jpg" alt="happiness" className="w-36 h-42 p-2 border-opacity-95 rounded-lg opacity-20 lg:w-72 lg:h-max"/>
        </section>
        </>
    )
}

export default HomePage
