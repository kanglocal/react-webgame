import React, { useState, useReducer, useCallback, useEffect } from 'react';
import Table from './Table';

const initialState = {
    winner: '',
    turn: 'O',
    tableData: [['','',''],['','',''],['','','']],
    recentCell: [-1, -1],
    draw: false,
};

// 얘네 변수로 따로 빼는게 좋다. action의 이름은 대문자로하는게 일반적.
// export 를 붙이는건 모듈로 만들어 다른곳에서 (Td에서) 쓸 수 있게하기위함이다.
export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';
export const RESET_WINNER = 'RESET_WINNER';
export const SET_DRAW = 'SET_DRAW';

// action을 어떻게 처리할지 관리하는 함수
const reducer = (state, action) => {
    switch(action.type) {
        case SET_WINNER:
            return {
                ...state,
                winner: action.winner,
            };
        case CLICK_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...tableData[action.row]]; // immer 라는 라이브러리로 가독성을 해결할 수 있다.
            tableData[action.row][action.cell] = state.turn;
            return{
                ...state,
                tableData,
                recentCell: [action.row, action.cell],
            };
        }
        case CHANGE_TURN: {
            return {
                ...state,
                turn: state.turn  === 'O' ? 'X' : 'O'
            }
        }
        case RESET_GAME: {
            return {
                ...state,
                // winner: '',
                turn: 'O',
                tableData: [['','',''],['','',''],['','','']],
                recentCell: [-1, -1],
            };
        }
        case RESET_WINNER: {
            return {
                ...state,
                winner: '',
            }
        }
        case SET_DRAW: {
            return {
                ...state,
                draw: action.draw,
            }
        }
        default:
            return state;
    }
};

const TicTacToe = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { tableData, turn, winner, recentCell, draw } = state; // 구조분해

    const onClickTable = useCallback(() => {
        // table 클릭시 winner 를 O 로 바꾼다. : dispatch 를 사용할거고, dispatch 안에 들어가는건 action 객체이다.
        // action 이 dipatch 될 때 마다 reducer 함수가 실행된다.
        dispatch({ type: SET_WINNER, winner: 'O'});
    }, []);

    useEffect(()=> {
        const [row, cell] = recentCell;

        if(row < 0) {
            return;
        }

        let win = false;
        if(tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn){
            win = true;
        }
        if(tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn){
            win = true;
        }
        if(tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn){
            win = true;
        }
        if(tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn){
            win = true;
        }

        if(win){
            // 승리한 사람이 있을 경우
            dispatch({ type: SET_WINNER, winner: turn });
            dispatch({ type: RESET_GAME });
        }else{
            // 무승부 검사
            let allMarked = true; // all 이 true면 무승부라는 뜻.
            let markedCnt = 0;
            tableData.forEach((row) => {
                row.forEach((cell) => {
                    if(!cell) {
                        allMarked = false;
                    }else{
                        markedCnt++;
                    }
                });
            });

            if(markedCnt == 1){
                // 처음 누른 경우, winner 를 비운다.
                dispatch({ type: RESET_WINNER });
                dispatch({ type: SET_DRAW, draw: false });
            }

            if(allMarked){
                dispatch({ type: SET_DRAW, draw: true });
                dispatch({ type: RESET_GAME });
            }else{
                dispatch({ type: CHANGE_TURN });
            }
        }

    }, [recentCell]);

    return (
        <>
            <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch}/>
            {winner && <div>{winner}님의 승리!</div>}
            {draw && <div>무승부!</div>}
        </>
    )
};

export default TicTacToe;