import React from 'react'

import CardContent from '@mui/material/CardContent';


const Banner = (props) => {
    return (
        <>
            {
                
                <div className='m-3 banner-card ' key={props.id}>
                    <div className='banner-wrapper' >
                        <div >
                            <img className='img-fluid banner-img' src={`https://image.tmdb.org/t/p/original${props.bannerData.backdrop_path}`} alt={props.bannerData.title}   />
                        </div>
                        <CardContent className='banner-text'>
                            <div className='banner-title '>
                                {props.bannerData.title}
                                <p>
                                    {props.bannerData.overview}
                                </p>
                            </div>
                        </CardContent>
                    </div>
                </div>
            }


        </>
    )
}
export default Banner;