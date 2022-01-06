import React from 'react'

const HomeFooter = () => {
    return (
        <footer className=" flex items-center justify-center p-4 bgApp text-center footerFont">
            <section>
                <p className="flex items-center text-center">
                    <span className="material-icons">
                        bolt
                    </span>
                    &nbsp;Thunder Devs App&nbsp;
                    <span className="material-icons">
                        copyright
                    </span>
                    &nbsp; 2021
                </p>
            </section>

            <section className="flex ml-16 items-center">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><img src="https://maxcdn.icons8.com/Share/icon/win8/Logos/instagram_new1600.png" alt="instagram_profile" className="w-12 m-1" /></a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" ><img src="https://findicons.com/files/icons/2779/simple_icons/2048/github_2048_black.png" alt="profile-github" className="w-16 m-1" /></a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><img src="https://cdn.onlinewebfonts.com/svg/img_432951.png" alt="facebook-profile" className="w-12 m-1" /></a>
        </section>
        </footer >
    )
}

export default HomeFooter
