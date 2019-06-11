import styled from 'styled-components'
import { color, colorScheme, fontSizing,
  flex, breakpoints } from '../DesignComponents/theme'

  export const UserListContainer = styled.div`
    width: 90%;
    ${flex('column','center','center')}
    max-width: 600px;
    padding: 20px 10px;
    border: 1px solid ${colorScheme.secondaryBorderColor}
    border-radius: 5px;
    box-shadow: 0 8px 6px -6px rgba(0,0,0,0.75);
    font-size: ${fontSizing.sm}

    a {
      text-decoration: none;
      color: ${colorScheme.defaultFontColor};
    }

    @media ${breakpoints[0]} {
      h1 {
        font-size: ${fontSizing.m}
      }
    }

  `

  export const Preview = styled.div`
    width: 90%;
    min-width: 300px;
    ${flex('row', 'center', 'space-between')}
    margin: 10px 0;
    padding: 10px;
    border: 1px solid ${color.defaultBorderColor};
    border-radius: 5px;
    background: ${color.primaryBgShading};
    cursor: pointer;

    &:hover {
      color: ${color.lightText};
      background: ${colorScheme.defaultFontColor};
    }
  `

  export const SpinnerContainer = styled.div`
    width: 90%;
    ${flex('column','center','center')};
    background: ${color.primaryBgShading};
  `

 