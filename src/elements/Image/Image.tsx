
import styled from 'styled-components'

function Image( { imageUrl, title, className } : { imageUrl : string, title: string, className?: string } ) {
    return (
      <Img className={className} src={imageUrl} alt={`${title}' image`} />
    );
  }

  const Img = styled.img`
  `
  
  export default Image;