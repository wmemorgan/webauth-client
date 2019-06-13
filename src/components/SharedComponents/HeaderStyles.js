import styled from 'styled-components'
import {
  colorScheme, fontSizing, fontStyles,
  breakpoints, flex
} from '../DesignComponents/theme'

export const HeaderContainer = styled.header`
  width: 100%;
  ${flex('column', 'center')};
  padding: 20px 10px;
  top: 0;
  z-index: 5;
  box-shadow: 0 5px 3px -3px rgba(0,0,0,0.35);
  background: ${colorScheme.headerBgColor};

  .logout {
    cursor: pointer;
  }

  & a, .logout * {
    font-family: ${fontStyles.headingFont};
  }
  
  & * {
    color: ${colorScheme.headerFontColor};
    font-size: ${fontSizing.xs};
    

    & a, .logout {
      padding: 8px;
      border-radius: 5px;
      text-transform: uppercase;
      font-family: ${fontStyles.headingFont};
      font-weight: bold;
      letter-spacing: 0.1rem;
    }

    & a.active, .logout:active {
      color: ${colorScheme.headerBgColor};
      background: ${colorScheme.headerFontColor};
    }

    a:hover, .logout:hover {
      color: ${colorScheme.headerBgColor};
      background: ${colorScheme.headerFontColor};
    }
  }



  @media ${breakpoints[0]} {
    align-items: flex-start;
    padding-left: 5vw;

    & * {
      font-size: ${fontSizing.xxs};
    }
    
  }

`

export const Nav = styled.nav`
  width: 90%;
  max-width: 600px;
  ${flex('row', 'center', 'space-between')}
  & * {
    text-decoration: none;
  }



  @media ${breakpoints[0]} {
    width: 50%;
    display: ${props => props.show ? 'flex' : 'none'};
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