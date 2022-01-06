import HomeFooter from 'components/HomeFooter'
import HomeNav from 'components/HomeNav'
import React from 'react'
import 'styles/homeStyles.css'

const PublicLayout = ({ children }) => {
    return (
        <div className="h-screen flex flex-col">
            <HomeNav/>
            <main className="flex flex-col h-full  bgMain items-center justify-center lg:flex-row">
                {children}
            </main>
            <HomeFooter/>
        </div>
    )
}

export default PublicLayout
