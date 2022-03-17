

import React from 'react'
import styled from 'styled-components';

function Filter() {
    return (
      <Container />
    );
  }

const Container = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0.0001) 17.46%, rgba(0, 0, 0, 0.0001) 51.29%, rgba(0, 0, 0, 0.0001) 80.73%, rgba(0, 0, 0, 0.0001) 86.4%, #000000 100%);
`
  
export default React.memo(Filter);