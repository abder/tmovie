
import { Logo } from '../../elements'
import styled from 'styled-components'

function Header() {
    return (
      <Container>
        <Logo />
      </Container>
    );
}

const Container = styled.header`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 0;
`

export default  Header;