import { useCallback } from 'react'
import useFetch from 'use-http'

const TMDB_KEY = process.env.REACT_APP_TMDB_API_KEY
const APP_URL  = process.env.REACT_APP_URL

export default function useAuthentication() {
    
    const { get, post } = useFetch('https://api.themoviedb.org/3');

    const authorize = useCallback( (token : string) => {
       window.location.href = `https://www.themoviedb.org/authenticate/${token}?api_key=${TMDB_KEY}&redirect_to=${APP_URL}`;
    }, [])
   
    const fetchSessionId = useCallback( async ( token : string ) => {
        
        const sessionData = await post(`/authentication/session/new?api_key=${process.env.REACT_APP_TMDB_API_KEY}`, 
            {
                "request_token": token
            }
        );
    
        if(sessionData.success) {
            return sessionData.session_id;

        } else { 
            return false;
        }

    }, [post])

    
    const setNewToken = useCallback( async () =>  {        
        
        try {
            const tokenData = await get(`/authentication/token/new?api_key=${TMDB_KEY}`);
    
            const { request_token } = tokenData;
    
            localStorage.setItem('tinder_movies_token', JSON.stringify( { token: request_token } ));

            authorize(request_token)

        } catch(err) {
            console.error(err)
        }
       

    }, [authorize, get])


    const authenticate = useCallback( async () =>  {        
        
        if( !localStorage.getItem('tinder_movies_session') ) {
                
            try {
            
                if( !localStorage.getItem('tinder_movies_token') ) {
                   setNewToken(); 
                } else {
    
                    //- Get session_id
                    const { token } = JSON.parse(localStorage.getItem('tinder_movies_token') || '{}') ;
                    
                    const session_id = await fetchSessionId(token);

                    if( session_id ) {

                        localStorage.setItem('tinder_movies_session', JSON.stringify( { session_id } )); 

                        
                    } else {
                        
                        // Retry Authentication 
                        setNewToken()
                    }
                }
            
            } catch(err) {
                console.error(err)
            }
        } 

    }, [fetchSessionId, setNewToken]);

    const isAuthenticated = useCallback( () => {
        
        if( localStorage.getItem('tinder_movies_session') ) {
            return true;
        }

        return false;
 
     }, [])


    const getSessionId = useCallback( () => {
        
        const { session_id } = JSON.parse(localStorage.getItem('tinder_movies_session') || "{}")
        return session_id;

     }, [])

    return { isAuthenticated, getSessionId, authenticate };
}