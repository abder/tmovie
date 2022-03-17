import { useCallback, useEffect, useState, useRef } from 'react'
import useFetch from 'use-http'

const POPULAR_MOVIES_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}`

const MOVIE_IMAGE_URL = 'https://image.tmdb.org/t/p/w400/'

type randomMovie = {
    id: number,
    title: string,
    image: string
}

const totalPages = 500; // Set per API 

export default function useRandomMovie() {

    const didInitialize = useRef(false);

    const [ movie, setMovie ] = useState<randomMovie>( { id: 0, title: "", image: ""} )

    const [ movies, setMovies ] = useState<any | [] >([])

    const { get, response, loading, error } = useFetch(POPULAR_MOVIES_URL)
    
    const getRandomMovie = useCallback( ( moviesList ) => {

        const randomItem = Math.floor( Math.random() * moviesList.length );
        
        let movieData : randomMovie = {
            id: moviesList[randomItem]?.id,
            title: moviesList[randomItem]?.title,
            image: `${MOVIE_IMAGE_URL}${moviesList[randomItem]?.poster_path}`
        };

        const newMoviesList = moviesList.filter((el : any, i: number) => i !== randomItem)
        
        return { movie: movieData, moviesList: newMoviesList }
        
    }, [] );

    
    const fetchNewPage = useCallback( async () => {
        
        const randomPage = Math.floor(Math.random() * totalPages) + 1;
            
        const data = await get(`&page=${randomPage}`)
            
        if ( response.ok ) {
            
            const { movie, moviesList } = getRandomMovie(data.results)

            setMovies(moviesList); 

            setMovie(movie);
        }

    }, [ response.ok, get, getRandomMovie ] )
    
    
    const refresh = useCallback( () => {
        
        if( movies.length > 0 ) {

            const { movie, moviesList } = getRandomMovie(movies)
            
            setMovies(moviesList); 

            setMovie(movie);
        }

        if( movies.length === 0 ) {
            fetchNewPage();
        }
        
    }, [ fetchNewPage, getRandomMovie, movies ] );
   
    useEffect(() => { 
        if( !didInitialize.current )  {
            refresh(); 
            didInitialize.current = true; 
        }  
    }, [ refresh ] ) 
    
    return { movie, refresh, loading, error }; 
}