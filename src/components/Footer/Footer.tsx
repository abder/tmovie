
import React from 'react'
import styled from 'styled-components'
import { FaButton} from '../../elements'
import { faPoop } from '@fortawesome/free-solid-svg-icons'

type propTypes = {
    onDislike: React.MouseEventHandler<HTMLButtonElement>,
    onLike: React.MouseEventHandler<HTMLButtonElement> 
}
  
function Footer({ onDislike, onLike } : propTypes) {
    return (
      <Container>
        <FaButton onClick={onDislike} icon={faPoop} darkBgColor="#634A05" lightBgColor="#E7BD0D"/>
        <FaButton onClick={onLike}/>
      </Container>
    );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  position: absolute;
  bottom: 20px;
`

export default React.memo(Footer);