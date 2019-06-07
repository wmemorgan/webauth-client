import styled from 'styled-components'
import { colorScheme, fontSizing, fontStyles,
  breakpoints, flex } from '../DesignComponents/theme'

export const HeaderContainer = styled.header`
  width: 100%;
  ${flex('column','center')};
  padding: 20px 10px;
  top: 0;
  z-index: 5;
  box-shadow:  1px 1px 1px 0px rgba(89,89,89,1);
  background: ${colorScheme.headerBgColor};

  & a * {
    font-family: ${fontStyles.headingFont};
  }
  
  & * {
    color: ${colorScheme.headerFontColor};
    font-size: ${fontSizing.m};
    

    & a {
      padding: 8px;
      border-radius: 5px;
      text-transform: uppercase;
      font-family: ${fontStyles.headingFont};
      letter-spacing: 0.2rem;
    }

    & a.active {
      color: ${colorScheme.headerBgColor};
      background: ${colorScheme.headerFontColor};
    }

    a:hover {
      text-decoration: underline;
      color: ${colorScheme.headerBgColor};
      background: ${colorScheme.headerFontColor};
    }
  }



  @media ${breakpoints[0]} {
    align-items: flex-start;
    padding-left: 5vw;

    & * {
      font-size: ${fontSizing.s};
    }
    
  }

`

export const Nav = styled.nav`
  width: 90%;
  max-width: 600px;
  ${flex('row','center','space-between')}
  & * {
    text-decoration: none;
  }

  @media ${breakpoints[0]} {
    width: 50%;
    display: ${props => props.show ? 'flex': 'none'};
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    z-index: 10;

    & a {
      width: 100%;
      padding: 10px 0;
    }

  }

`

export const CrudNav = styled.div`
  width: 30%;
  ${flex('row', 'center', 'space-between')};

  @media ${breakpoints[0]} {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & a {
      width: 100%;
      padding: 10px 0;
      border-top: 1px solid ${colorScheme.defaultBorderColor};
    }
  }

`

export default HeaderContainer