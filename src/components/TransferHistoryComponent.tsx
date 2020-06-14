import * as React from "react";
import {css} from "emotion";
import {TitleComponent} from "./shared/TitleComponent";
import {StateContext} from "../index"
import {ITransferHistory} from "../shared/models/ITransferHistory";
import {mainColor} from "../constants/colors";
import {formatter} from "../shared/utilities/formatter";
import {TranslateComponent} from "./shared/TranslateComponent";
import Alert from "react-bootstrap/Alert";

const amountClass = css`
    color: ${mainColor};
    font-weight: bold;
    font-size: 21px;
`

const transferItemClass = css`
    display: flex;
    justify-content: space-between;
    padding: 19px 0px;
    
    & + & {
        border-top: 1px solid #ddd;
    }
`

const dateClass = css`
    letter-spacing: 1.1px;
`

const currencyClass = css`
    font-weight: normal;
    margin-left: 3px;
`

export const TransferHistoryComponent: React.FunctionComponent = React.memo(props => {
    const {state} = React.useContext(StateContext);

    return <div>
        <TitleComponent>
            <TranslateComponent messageKey='transferHistory'/>
            <p><TranslateComponent messageKey='prevTransfers'/></p>
        </TitleComponent>

        {state.transferHistories.length ?
            state.transferHistories.map((transfer: ITransferHistory, index: number) => (
                <div className={transferItemClass} key={index}>
                    <span className={amountClass}>
                        {formatter(transfer.amount)}
                        <span className={currencyClass}><TranslateComponent messageKey='currency'/></span>
                    </span>
                    <span className={dateClass}>{transfer.date}</span>
                </div>
            )) :
            <Alert variant='info'>
                <TranslateComponent messageKey='noTransferHistory'/>
            </Alert>
        }
    </div>
})
