import * as React from 'react'
import news from '../assets/news.jpg'
import {css} from "emotion";
import {TitleComponent} from "./shared/TitleComponent";

const newsImgClass = css`
    width: 100%;
    margin-bottom: 20px;
`

export const NewsComponent: React.FunctionComponent = React.memo(() => {
    return <div>
        <TitleComponent>
            Ի՞նչ դեղամիջոցներ է հարկավոր ունենալ տանը Covid-19-ով վարակակիրներին
        </TitleComponent>
        <img src={news} alt="" className={newsImgClass}/>
        <p>
            Առողջապահության նախարարի խորհրդատու (ինֆեկցիոն հիվանդությունների գծով) Նարինե Սարգսյանցի հետ զրույցում անդրադարձ է կատարվում տանը բուժվող քաղաքացիների համար անհրաժեշտ դեղամիջոցներին:
        </p>
    </div>
})
