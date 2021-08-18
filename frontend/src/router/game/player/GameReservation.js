import GameApi from 'api/GameApi';
import React, { useContext } from 'react'
import { gameStore } from 'store/gameStore';
import { store } from 'store/store';
import "./GameReservation.css"

function GameReservation ({ history, match }) {
    const globalState = useContext(store);
    const { value } = globalState;
    const gameStoreData = useContext(gameStore);
    const { aboutGame } = gameStoreData;
    const { params } = match

    // PJW - 입금 확인 요청 버튼
    const RequestPaymentCheck = () => {
        GameApi.requsetPaymentCheck({
            "userEmail": value.isLogin,
            "gameId": params.gameId
            },
            ()=>{
                alert('입금 확인 요청이 완료되었습니다!')
                history.push(`/detail/${aboutGame.gameInfo.id}`)
            },
            (error)=>{console.log(error)}
        )
    }

    // PJW - 예약 취소 버튼
    const CancelReservation = () => {
        GameApi.cancelReservation({
            "userEmail": value.isLogin,
            "gameId": params.gameId
            },
            ()=>{
                alert('예약이 취소되었습니다.')
                history.push(`/detail/${aboutGame.gameInfo.id}`)
            },
            (error)=>{console.log(error)}
        )
    }

    const copyAccount = () => {
        const textarea = document.createElement("textarea")
        textarea.value = aboutGame.businessProfile.account
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand("copy")
        document.body.removeChild(textarea)
        alert("계좌번호가 복사되었습니다.")
    }

    if (!aboutGame.businessProfile) {
        alert('다시 예약해주세요.')
        history.push(`/detail/${params.gameId}`)
        return <div></div>
    } else {
            return (
                <div className="GameReservation">
                    <div className="bank_info">
                        <div className="GameReservation__account">
                            {aboutGame.businessProfile.bank}은행
                        </div>
                        <div className="GameReservation__account">
                            {aboutGame.businessProfile.account}
                        </div>
                        <p onClick={copyAccount}>복사하기</p>
                    </div>
                    <p className="GameReservation__warning">
                        * 30분 이내로 입금을 완료해주세요.
                    </p>
                    <div>
                        <p className="GameReservation__announcement">
                            입금을 완료하신 후
                        </p>
                        <p className="GameReservation__announcement">
                            <span>"입금 완료했어요!"</span> 버튼을 눌러주세요.
                        </p>
                    </div>
                    
                    <div className="GameReservation__buttons">
                        <button onClick={RequestPaymentCheck}>입금 완료했어요!</button>
                        <button onClick={CancelReservation}>취소할래요.</button>
                    </div>
                </div>
        )
    }
}

export default GameReservation