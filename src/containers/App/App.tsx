import { useEffect } from 'react'
import { Header, Movie, Footer } from '../../components'
import styled from 'styled-components'
import { useRandomMovie, useAuthentication, useSavedMovie } from '../../hooks'

function App() {

  const { movie, refresh, loading } = useRandomMovie();
  const { isAuthenticated, authenticate } = useAuthentication();
  const { saveMovie, isSaving } = useSavedMovie();
 
  useEffect( () => {
    if( !isAuthenticated() ) {
      authenticate();
    };
  }, [ authenticate, isAuthenticated ]);

  if( !isAuthenticated() ) return <Container>Loading...</Container>

  if( !process.env.REACT_APP_TMDB_API_KEY ) return <Container>You need to setup an API key!</Container>
  
  return (
    <Container>
      <Header />
      { 
        loading || isSaving ? 
          "Loading..." : 
          <Movie 
            imageUrl={movie?.image} 
            title={movie?.title}
            onDislike={refresh} 
            onLike={() => saveMovie(movie.id, refresh)}  
          />  
      }
      <Footer
          onDislike={refresh} 
          onLike={() => saveMovie(movie.id, refresh)}  
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: ${window.innerHeight}px;
  text-align: center;
`

export default App;
