import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import axios from "axios";
import Banner from './Banner';
import { NavLink } from 'react-router-dom';




const Movies = () => {



  const [hover, setHover] = useState()
  const [apiData, setapiData] = useState([])
  const [bannerData, setbannerData] = useState([])
  const [curPage, setCurPage] = useState(1)
  const [parr, setParr] = useState([1])
  const [favourite, setFavourite] = useState([])
  const [searchMovie, setSearchMovies] = useState('')

  console.log(searchMovie);

  let URL = `https://api.themoviedb.org/3/movie/popular?api_key=a7a3ce25e8b7c135ec27b0b63ae8726c&language=en-US+&page=${curPage}`
  let search_url = 'https://api.themoviedb.org/3/search/movie?api_key=a7a3ce25e8b7c135ec27b0b63ae8726c'

  const callApi = async (url) => {
    const res = await axios.get(url);
    console.log(res.data.results)
    setapiData(res.data.results)
    setbannerData(res.data.results[0])
  }

 let url
  if (searchMovie != '') {

    url=search_url + '&query=' + searchMovie;
  } else {
    url=URL
  }
    
   
  useEffect(() => {
    let timeout =setTimeout(()=>{
      callApi(url);
    },800);
    return()=> clearTimeout(timeout)
   
  }, [searchMovie]);



  const changeMovies = async () => {
    const res = await axios.get(
      URL
    );
    setapiData(res.data.results)

  }



  const handleLeft = () => {
    if (curPage == 1) {
      setCurPage(curPage)
      changeMovies()
    }
    else {
      setCurPage(curPage - 1)
      changeMovies()
    }

  }
  const handleRight = () => {
    setCurPage(curPage + 1)
    setParr((pre) => {
      return [...pre, curPage + 1]
    })
    changeMovies()

  }
  const prr = parr.filter((ele, index) => {
    return parr.indexOf(ele) == index;
  });


  const handlePage = (value) => {
    if (value != curPage)
      setCurPage(value)
    changeMovies()
  }

  const handleFavouries = (movie) => {
    let oldData = JSON.parse(localStorage.getItem('favmovies') || '[]')
    if (favourite.includes(movie.id)) {
      oldData = oldData.filter((m) => m.id != movie.id)
    } else {
      oldData.push(movie)
    }
    localStorage.setItem('favmovies', JSON.stringify(oldData))
    console.log(oldData);
    handleFavouriesState();
  }
  const handleFavouriesState = () => {
    console.log('i am called');
    let oldData = JSON.parse(localStorage.getItem('favmovies') || '[]')
    let temp = oldData.map((movie) => movie.id)
    setFavourite([...temp])
  }
  return (


    <>

      <div className=' col-8 col-lg-4 mx-auto mt-5  '>
        <input type="search" class="form-control" placeholder="What are you looking for ?" 
        value={searchMovie} onChange={(e) => setSearchMovies(e.target.value)} />
      </div>
      <div className='mb-4 '>
        <Banner bannerData={bannerData} />
      </div>


      {
        apiData.length == 0 ?
          <div className='d-flex justify-content-center m-5'>
            <div class="spinner-border text-dark" style={{ width: "8rem", height: "8rem" }} role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
          :
          <div className='m-2  movies-card'>
            {
              apiData.map((curElem) => {
                return (
                  
                  <Card className='movies-wrapper ' key={curElem.id} onMouseEnter={() => setHover(curElem.id)}>
                    <NavLink to={`movies/${curElem.id}`}>
                    <CardMedia >
                      <img src={`https://image.tmdb.org/t/p/original${curElem.poster_path}`} alt={curElem.title} className="img-fluid movies-img" />
                    </CardMedia>
                    </NavLink>
                    <CardContent className='movies-text'>
                      <div className='movies-title '>
                        {curElem.title}
                      </div>

                    </CardContent>
                    <div className='movies-btn'>
                      {
                        hover == curElem.id && <Button variant="contained" onClick={() => handleFavouries(curElem)}> {favourite.includes(curElem.id) ? 'Remove' : 'Add'}</Button>

                      }

                    </div>

                  </Card>
                  
                )

              })
            }
          </div>
      }




      <div className='col-lg-12 col-10   d-flex justify-content-center'>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item"><a className="page-link text-dark " onClick={handleLeft}>&#60;&#60; Previous</a></li>
            {
              prr.map((value) => (


                <li className="page-item" >

                  <a className="page-link" style={{
                    background: value == curPage ? '#000000 ' : '#fff ',
                    color: value == curPage ? '#fff ' : '#000000',
                  }}
                    onClick={() => handlePage(value)} >{value}
                  </a>
                </li>
              ))
            }
            <li className="page-item"><a className="page-link text-dark" onClick={handleRight} >Next &#62;&#62; </a></li>
          </ul>
        </nav>
      </div>

    </>
  )
}

export default Movies;