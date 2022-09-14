import React, { useEffect, useState } from 'react'
import { SiImdb } from "react-icons/si";
import { NavLink } from 'react-router-dom';
import Navbar from './Navbar';

const Favourite = () => {

    const [genres, setGenres] = useState([])
    const [movies, setMovies] = useState([])
    const [currgenre, setCurrGenre] = useState('All Genres')
    const [search, setSearch] = useState('')

    const favMovies = () => {
        let genreids = {
            28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
            27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
        };
        let Data = JSON.parse(localStorage.getItem('favmovies') || '[]')

        const temp = []
        Data.forEach((movieObj) => {
            if (!temp.includes(genreids[movieObj.genre_ids[0]])) {
                temp.push(genreids[movieObj.genre_ids[0]]);
            }
        })
        temp.unshift('All Genres');
        setGenres([...temp])
        setMovies([...Data])

    }
    // console.log(movies);



    useEffect(() => {
        favMovies();
    }, []);



    const handleGenreChange = (genre) => {
        setCurrGenre(genre)
    }

    let genreids = {
        28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
        27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
    };

    let filterarr = [];
    if (search == '') {
        filterarr = movies

    } else {
        filterarr = movies.filter((moviObj) => {
            let title = moviObj.original_title.toLowerCase();
            return title.includes(search.toLowerCase())
        })
    }

    if (currgenre != 'All Genres') {
        filterarr = movies.filter((moviObj) => genreids[moviObj.genre_ids[0]] == currgenre)
    }


    const handleDelete = (id) => {
        let newarr = [];
        newarr = movies.filter((movieObj) => movieObj.id != id)
        setMovies([...newarr])
        localStorage.setItem("favmovies", JSON.stringify(newarr))
    }

    return (
        <>
        
            <div className='row mt-5 m-3' >
                <div className='col-10 col-lg-3 col-md-4 mx-auto mt-5 '>
                    <ui className="rounded-3">
                        {
                            genres.map((genre) => {
                                return (
                                    currgenre == genre ?
                                        <li class="list-group-item" style={{ background: '#000000', color: 'white', fontWeight: 'bold' }} >{genre}</li> :
                                        <li class="list-group-item" style={{ background: 'white', color: '#000000' }} onClick={() => handleGenreChange(genre)}>{genre}</li>
                                )

                            })
                        }
                    </ui>
                </div>
                <div className='col-lg-9  col-12 col-md-8 mx-auto mt-5'>
                    <div class="col-lg-6  col-10 mx-auto mb-3">

                        <input type="search" class="form-control" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search....." />
                    </div>
                    {
                        filterarr.map((moviesObj) => {
                            return (
                                <div >
                                    <div class="card mb-3 bg-nav text-light ">
                                        <div class="row g-0">
                                        
                                            <div class="col-md-2">
                                                <img src={`https://image.tmdb.org/t/p/original${moviesObj.backdrop_path}`} class="img-fluid rounded-start" alt="..." />
                                            </div>
                                            <div class="col-md-8">
                                                <div class="card-body  " >
                                                    <h5 class="card-title">{moviesObj.original_title}</h5>
                                                    <p class="card-text text-white">{moviesObj.release_date.substring(0, 4)} &nbsp;&nbsp; <SiImdb className='fs-5 ' />&nbsp; {moviesObj.vote_average} &nbsp; &nbsp;  {genreids[moviesObj.genre_ids[0]]}</p>

                                                </div>
                                            </div>
                                           
                                            <div className='col-md-2  d-flex my-auto mx-auto'>
                                                <button type="button" class="btn btn-outline-danger" onClick={() => handleDelete(moviesObj.id)}>Remove</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            )
                        })
                    }


                </div>
            </div>
        </>
    )
}

export default Favourite