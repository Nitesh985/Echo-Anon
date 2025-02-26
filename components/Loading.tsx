import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
      <StyledWrapper>
        <div className="loader" />
      </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .loader {
    width: 1.2rem;
    height: 1.2rem;
    border: 0.1em solid rgb(84, 84, 84);
    border-left-color: white;
    border-radius: 45%;
    animation: spin 0.7s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }`;

export default Loader;
