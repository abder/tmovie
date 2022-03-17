import { useCallback } from 'react';
import useFetch from 'use-http'
import { useAuthentication } from '../'

const TMDB_KEY = process.env.REACT_APP_TMDB_API_KEY

export default function useSavedMovie() {

    const { post, response, loading } = useFetch('https://api.themoviedb.org/3');

    const { getSessionId } = useAuthentication()
    
    const saveMovie = useCallback(
        
        async ( media_id: number, callback: Function ) => {
            
            try {
                const sessionId = getSessionId();

                await post(`/account/account_id/favorite?api_key=${TMDB_KEY}&session_id=${sessionId}`, {
                    favorite: true,
                    media_type: "movie",
                    media_id
                });

                if(response.ok) {
                    callback();
                }

            } catch(err) {
                console.error(err);
            }
            
    }, [getSessionId, post, response.ok]);

    return { saveMovie, isSaving: loading };
}