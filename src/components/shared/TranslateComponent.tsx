import React from "react";
import {useTranslation} from "react-i18next";

interface ITranslateComponentProps {
    messageKey: string
}

export const TranslateComponent: React.FunctionComponent<ITranslateComponentProps> = React.memo((props) => {
    const {t} = useTranslation();

    return t(props.messageKey)
})
