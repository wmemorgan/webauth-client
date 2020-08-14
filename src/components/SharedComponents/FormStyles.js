import styled from 'styled-components'
import { color, colorScheme, fontSizing, flex, breakpoints } from '../DesignComponents/theme'

export const FormContainer = styled.div`
  width: 600px;
  ${flex('column', 'center', 'center')};
  margin: 20px 0;
  border-radius: 5px;
  border: 1px solid ${colorScheme.secondaryBorderColor}
  border-radius: 5px;
  box-shadow: 0 8px 6px -6px rgba(0,0,0,0.75);
  background: ${color.lightText};
  font-size: ${fontSizing.sm};

  @media ${breakpoints[0]} {
    width: 100%;
    font-size ${fontSizing.sm};
  }

  .windowFrame {
    width: 100%;
    margin: 0;
    padding: 10px;
    border-radius: 5px 5px 0 0;
    background: linear-gradient(to top, #cccccc 0%, #d6d6d6 1px, #ebebeb 100%);

    @media ${breakpoints[0]} {
      padding: 5px;
    }
  }  

  form {
    width: 90%;
    ${flex('column', 'center')};
    padding: 20px;


    @media ${breakpoints[0]} {
      width: 100%;
    }

    & *  {
      margin: 5px 0;
    }

    input {
      width: 100%;
      padding: 5px 10px;
      border: 1px solid ${color.defaultBorderColor};
      border-radius: 5px;
      background: ${color.primaryBgShading};
      line-height: 1.5rem;
    }

    button {
      width: 130px;
      font-size: ${fontSizing.xs};
      letter-spacing: 0.25rem;
      text-transform: uppercase;
      color: ${color.lightText};
      background: ${color.primaryColor};
    }
  }

  button {
    width: 150px;
    font-size: ${fontSizing.xs};
    letter-spacing: 0.25rem;
    text-transform: uppercase;
    color: ${color.lightText};
  }
`
export default FormContainer