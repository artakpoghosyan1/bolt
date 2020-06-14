import {css, injectGlobal, keyframes} from "emotion";
import {
    inputFocusedShadowColor, inputOutlineColor,
    inputShadowColor,
    mainBg,
    mainColor,
    mainTextColor, secondaryColor
} from "../../constants/colors";

injectGlobal`
    body {
        color: ${mainTextColor};
        background-color: ${mainBg};
        font-family: "arian-amu", "Helvetica Neue",Arial,"Noto Sans",sans-serif;
    }
    
    #root, body, html {
        height: 100%;
    }
`

export const rotateAnimation = keyframes`
    0% {
        transform: rotate(0) 
    }
    
    100% {
        transform: rotate(360deg) 
    }
`

export const inputClass = css`
    padding-top: 25px; 
    padding-bottom: 25px;
    border-color: #f1f1f1;
    box-shadow: 0 0 9px ${inputShadowColor};
    
    &:focus {
        outline: 1px solid ${inputOutlineColor};
        border-color: transparent;
        box-shadow: 0 0 9px ${inputFocusedShadowColor};
    }
`

export const mainBtnClass = css`
    width: 80%;
    background-color: ${mainColor};
    border-radius: 18px;
    padding-top: 8px;
    padding-bottom: 8px;
`

export const secondaryBtnClass = css`
    width: 100%;
    background-color: ${secondaryColor};
    border-radius: 5px;
    border: none;
    padding-top: 14px;
    padding-bottom: 14px;
    text-align: unset;
`

export const lgMarginBottomClass = css`
    margin-bottom: 40px;
`

export const verticalCenteredLayoutClass = css`
    display: flex;
    flex-direction: column;
    height: 100%;
`

export const centerClass = css`
    text-align: center;
`

export const resetButtonDefaultStyles = css`
    border: none;
    padding: 0;
    background: none;
    cursor: pointer;
    
    &:focus {
        outline: none;
    }
`
