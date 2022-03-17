


import styled from 'styled-components'

const defaultProps =  {
    text: "T-Movie",
} 

function Logo( { text } : typeof defaultProps) {
    return (
      <Text >
        { text }
      </Text>
    );
}

const Text = styled.span`
    text-transform: uppercase;
    font-size: 30px;
`
    
Logo.defaultProps = defaultProps;
  
export default Logo;