
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FcRating, FcClock } from "react-icons/fc";
import { BsFillCalendarDayFill, BsPlayCircleFill } from "react-icons/bs";

const SingleMovies = () => {
    const { id } = useParams()
    const [Mdata, setMData] = useState([])
    const [videodata, setVideoData] = useState([])


    const moviesID = async (id) => {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=a7a3ce25e8b7c135ec27b0b63ae8726c&append_to_response=external_ids`);
        const Data = res.data;
        setMData(Data)
        const video_res = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=a7a3ce25e8b7c135ec27b0b63ae8726c&language=en-US`);

        setVideoData(video_res.data.results[1].key)
        console.log(video_res.data.results)


    }

    useEffect(() => {
        moviesID(id)
    }, [id])
    let rating = Mdata.vote_average
    let year = Mdata.release_date
    let time = Mdata.runtime




    const timeConvert = (time) => {
        var num = time;
        var hours = (num / 60);
        var rhours = Math.floor(hours);
        var minutes = (hours - rhours) * 60;
        var rminutes = Math.round(minutes);
        return (rhours + " h " + rminutes + " min");
    }

    return (
        <>
            <div className='container-fluid mt-5 pt-4 ' >
                <div className="card  rounded-3 bg-card mb-3 ">
                    <div className="row g-0">
                        <div className="col-12 col-lg-6 p-2">
                            <img src={`https://image.tmdb.org/t/p/original${Mdata.backdrop_path}`} className="img-fluid " alt="..." />
                        </div>
                        <div className="col-12 col-lg-6 p-2">
                            <div className="card-body text-white mx-auto">
                                <h5 className="card-title fs-1 ">{Mdata.title}</h5>
                                <p className="card-text fs-6">{Mdata.overview}</p>
                                <div className='d-flex justify-content-around'>
                                    <p className="card-text"><BsFillCalendarDayFill /> {year} </p>
                                    <p className="card-text"> <FcRating /> {Math.round(rating)}/10</p>
                                    <p className="card-text"> <FcClock /> {timeConvert(time)} </p>
                                </div>
                                <div className='text-center pt-5'>
                                    <button className="btn text-white" data-bs-toggle="modal" data-bs-target="#staticBackdrop"> Play  <BsPlayCircleFill className='fs-6 ' /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- Modal --> */}
                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" >
                        <div className="modal-content " style={{ background: 'transparent', border: "none" }}>
                            <div className="text-end">
                                <button type="button" className="btn-close  bg-white " data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <iframe width="100%" height="300px" src={`https://www.youtube.com/embed/${videodata}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default SingleMovies;