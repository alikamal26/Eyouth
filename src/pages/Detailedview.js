import React, { useState, useEffect } from 'react'
import {useLocation , useNavigate} from 'react-router-dom';
import axios from 'axios'
import {
    Button
  } from '@mui/material'
import Table from 'react-bootstrap/esm/Table';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import '../stylesheets/Detailedview.css'

export default function Detailedview() {
    const location = useLocation()
    const navigate = useNavigate()
    const [movie, setMovie] = useState()

    const getDetailedMovie = async()=>{
        console.log(location.state)
            await axios({
                url: `https://api.themoviedb.org/3/movie/${location.state.id}?api_key=59a92dc4ad6bc09b9bc5f3564a295e5b&language=en-US`,
                method: 'get',
                data: {
                    page: '1',
                    limit: '100',
                    includeDeleted:true
                },
            })
              .then(res=>{
                  console.log(res)
                  setMovie(res.data)
              })
    }
    
    const goBack = ()=>{
        navigate(`/movies`)
    }

    useEffect(() => {
        getDetailedMovie()
    }, [])
    return (
        <div className="movieBody">
            <div className="divHead">
                <ArrowBackIcon className="arrowBack" onClick={()=> goBack()}/>
                <span className="movieName">{location.state.title}</span>
            </div>
            {movie?
            <div className="movieInfoCard">
                {/* <span className="movieInfo">Movie Info</span> */}
                <div className="infoDiv">
                    <p className="infoTitle"><strong>Release Date:</strong></p>
                    <p className="infoData">{movie.release_date}</p>
                </div>
                <div className="infoDiv">
                    <p className="infoTitle"><strong>Popularity:</strong></p>
                    <p className="infoData">{movie.popularity}</p>
                </div>
                <div className="infoDiv">
                    <p className="infoTitle"><strong>Vote Average:</strong></p>
                    <p className="infoData">{movie.vote_average}</p>
                </div>
                <div className="infoDiv">
                    <p className="infoTitle"><strong>Vote Count:</strong></p>
                    <p className="infoData">{movie.vote_count}</p>
                </div>
                <div className="infoDiv">
                    <p className="infoTitle"><strong>Budget:</strong></p>
                    <p className="infoData">{movie.budget}</p>
                </div>
                <div className="infoDiv">
                    <p className="infoTitle"><strong>Revenue:</strong></p>
                    <p className="infoData">{movie.revenue}</p>
                </div>
                <div className="infoDiv">
                    <p className="infoTitle"><strong>Runtime:</strong></p>
                    <p className="infoData">{movie.runtime}</p>
                </div>
                <div className="infoDiv">
                    <p className="infoTitle"><strong>Status:</strong></p>
                    <p className="infoData">{movie.status}</p>
                </div>
                <div className="infoDiv">
                    <p className="infoTitle"><strong>Genres:</strong></p>
                    <p className="infoData">{movie.budget}</p>
                </div>
                <div className="infoDiv">
                    <p className="infoTitle"><strong>Spoken Languages:</strong></p>
                    {movie.spoken_languages.map(language =>{
                        return (
                            <p className="infoData" key={language.english_name}>{language.english_name}</p>
                        )
                    })}   
                </div>
                <div className="infoDiv">
                    <p className="infoTitle"><strong>Production Companies:</strong></p>
                    {movie.production_companies.map(company =>{
                        return (
                            <p className="infoData" key={company.name}>{company.name}</p>
                        )
                    })}   
                </div>
                <div className="infoDiv">
                    <p className="infoTitle"><strong>Genres:</strong></p>
                    {movie.genres.map(genre =>{
                        return (
                            <p className="infoData" key={genre.name}>{genre.name}</p>
                        )
                    })}   
                </div>
            </div>
            :
            ""
}
        </div>
    )
}
