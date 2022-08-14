import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import { useNavigate } from "react-router-dom";
import {
    FormControl,
    Input,
    InputLabel,
    Button,
  } from '@mui/material'
import '../stylesheets/Listview.css'
import { MdLock } from 'react-icons/md'

export default function Listview() {
    const navigate = useNavigate()
    const [movies, setMovies] = useState([])
    const [movie, setMovie] = useState()
    const [filteredMovies, setFilteredMovies] = useState([])
    
    let i=1
    const handleSearchInput = (event)=>{
        const newMovies = movies.filter(
            (x) =>
            x.title.includes(event.target.value)
        )
        setFilteredMovies(newMovies)
    }
    const handleLogout = ()=>{
        navigate('/')
    }
    const allMovies = async()=>{
        await axios({
            url: `https://api.themoviedb.org/3/movie/popular?api_key=59a92dc4ad6bc09b9bc5f3564a295e5b&language=en-US`,
            method: 'get',
            data: {
                page: '1',
                limit: '100',
                includeDeleted:true
            },
        })
          .then(res=>{
              setMovies(res.data.results)
              setFilteredMovies(res.data.results)
          })
    }

    const getDetailedMovie = async(movieId)=>{
        let movieTemp = {}
        for(let movie of movies){
            if(movie.id == movieId){
                setMovie(movie)
                movieTemp=movie
                break;
            }
        }
        console.log(movie)
        navigate(`/movie/${movieId}`,{state:movieTemp})
    }

    useEffect(() => {
        allMovies()
    }, [])

    return (
        <div>
            <div className='section' onClick={() => handleLogout()}>
            <span>
                <MdLock className='iconSidebar' />
            </span>
            <span className='moduleName'>Logout</span>
             </div>
            <div className="searchRow">
                <FormControl className='searchForm' onChange={handleSearchInput}>
                    <InputLabel htmlFor='search' style={{marginLeft:"-13px"}}>Search</InputLabel>
                    <Input id='search' aria-describedby='search' />
                </FormControl>
            </div>
        
            <div className="moviesList">
            <Table className="moviesListView">
                <thead>
                    <tr className="moviesListViewHeaders">
                        <th>#</th>
                        <th>Title</th>
                        <th>Release Date</th>
                        <th>Popularity</th>
                        <th>Vote Average</th>
                        <th>Vote Count</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredMovies.map(movie =>{
                        return (
                            <tr className="listviewDataRow" key={movie.id} onClick={()=>getDetailedMovie(movie.id)}>
                                <td className="listviewDataCell">{i++}</td>
                                <td className="listviewDataCell">{movie.title}</td>
                                <td className="listviewDataCell">{movie.release_date}</td>
                                <td className="listviewDataCell">{movie.popularity}</td>
                                <td className="listviewDataCell">{movie.vote_average}</td>
                                <td className="listviewDataCell">{movie.vote_count}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            </div>
        </div>
    )
}
