
import { useRef } from 'react';
import { Image, Title, Filter } from '../../elements'
import styled from 'styled-components'
import { useSwipe } from '../../hooks'

type propTypes = {
   title: string, 
   imageUrl: string, 
   onDislike: React.MouseEventHandler<HTMLButtonElement>,
   onLike: React.MouseEventHandler<HTMLButtonElement> 
}
 
function Movie( { title, imageUrl, onDislike, onLike } : propTypes ) {

  const swipe = useRef<HTMLDivElement>(document.createElement("div"));
  
  useSwipe( { element: swipe.current, onSwipeRight: onLike, onSwipeLeft: onDislike } )

    return (
      <Container>
        <PosterWrapper ref={swipe}>
            <Poster imageUrl={imageUrl} title={title} />
            <StyledTitle text={title}/>
            <Filter />
        </PosterWrapper>
      </Container>
    );
  }

const Container = styled.div`
  position: relative;
  height: 100%;
`

const PosterWrapper = styled.div`
  position: relative;
`


const Poster = styled(Image)`
  width: 100%;
  height: ${65 * window.innerHeight / 100}px;
`

const StyledTitle = styled(Title)`
  flex-basis: 100%;
  position: absolute;
  margin: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
`
  
export default Movie;