
import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

const defaultProps = {
  darkBgColor: "#5F1717", 
  lightBgColor: "#F11010",
  icon: faHeart // <IconDefinition>
}

function Button( { darkBgColor, lightBgColor, icon, onClick } : { onClick: React.MouseEventHandler<HTMLButtonElement> } & typeof defaultProps ) {
    return (
      <Btn onClick={onClick} darkBgColor={darkBgColor} lightBgColor={lightBgColor}>
         <FontAwesomeIcon size="3x" icon={icon} />
      </Btn>
    );
  }

const Btn = styled.button< { darkBgColor: string,  lightBgColor: string} >`
  background: ${props => `linear-gradient(${props.lightBgColor},${props.darkBgColor})` };
  border-radius: 50%;
  width: 90px;
  height: 90px;
  border: 1px solid #000000;
  outline: 0;
`

Button.defaultProps = defaultProps;
  
export default React.memo(Button);