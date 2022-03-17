
import styled from 'styled-components'

function Title( { text, className } : { text : string, className?: string }) {
    return (
      <Heading className={className}>
        { text }
      </Heading>
    );
  }
  
const Heading = styled.h1`
  font-size: 30px;
  line-height: 35px;
`

export default Title;



  
