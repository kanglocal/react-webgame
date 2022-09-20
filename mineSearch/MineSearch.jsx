import React, { useReducer, createContext, useMemo, useEffect, memo } from 'react';
import Table from './Table';
import Form from './Form';

export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0, // 0 이상이면 opened
}

export const TableContext = createContext({
    tableData: [],
    halted: true,
    dispatch: () => {},
});// 기본값

const initialState = {
    tableData: [],
    data: {
        row: 0,
        cell: 0,
        mine: 0,
    },
    timer: 0,
    result: '',
    halted: true,
    openedCount: 0,
};

const plantMine = (row, cell, mine) => {
    console.log(row, cell, mine);
    const candidate = Array(row * cell).fill().map((arr, i) => {
        return i;
    });
    const shuffle = []; // 지뢰가 있는 칸
    while (candidate.length > row * cell - mine){
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen);
    }

    // 정상칸 row * cell 개 생성.
    const data = [];
    for(let i = 0; i < row; i++) {
        const rowData = [];
        data.push(rowData);
        for(let j = 0; j < cell; j++) {
            rowData.push(CODE.NORMAL);
        }
    }

    // 지뢰 심기
    for( let k = 0; k < shuffle.length; k++) {
        const ver = Math.floor(shuffle[k] / cell);
        const hor = shuffle[k] % cell;
        data[ver][hor] = CODE.MINE;
    }

    console.log(data);
    return data;
};

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';



const reducer = (state, action) => {
    switch (action.type){
        case START_GAME:
            return {
                ...state,
                data: {
                    row: action.row,
                    cell: action.cell,
                    mine: action.mine,
                },
                openedCount: 0,
                tableData: plantMine(action.row, action.cell, action.mine),
                halted: false,
                timer: 0,
            };
        case OPEN_CELL:{
            const tableData =[...state.tableData];
            tableData.forEach((row, i) => {
                tableData[i] = [...row];
            });

            const checked = [];
            let openedCount = 0;
            const checkArround = (row, cell) => {
                // 상하 좌우 칸이 아닌 경우 필터링
                if(row < 0 || row >= tableData.length || cell < 0 || cell >= tableData[0].length){
                    return;
                }

                // 내가 빈칸일 때에만
                if([CODE.OPENED, CODE.FLAG_MINE, CODE.FLAG, CODE.QUESTION_MINE, CODE.QUESTION].includes(tableData[row][cell])){
                    return;
                }
                
                if(checked.includes(row + ',' + cell)){
                    // 이미 검사함
                    return;
                }else{
                    checked.push(row + ',' + cell);
                }// 한 번 연 칸은 무시하기

                let arround = [];
                if(tableData[row - 1]){
                    // 윗줄이 있는 경우 윗줄 세 칸을 검사대상에 넣는다.
                    arround = arround.concat([
                        tableData[row - 1][cell - 1],
                        tableData[row - 1][cell],
                        tableData[row - 1][cell + 1]
                    ]);
                }
                // 내 왼쪽칸, 오른쪽칸
                arround = arround.concat(
                    tableData[row][cell - 1],
                    tableData[row][cell + 1],
                );
                if(tableData[row + 1 ]){
                    // 아래줄이 있는 경우 아래줄 세 칸을 검사대상에 넣는다.
                    arround = arround.concat(
                        tableData[row + 1][cell - 1],
                        tableData[row + 1][cell],
                        tableData[row + 1][cell + 1],
                    );
                }
                    
                

                // 주변 칸의 지뢰 개수
                const count = arround.filter(function(v){
                     return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v);
                }).length;

                // tableData[row][cell] = count;

                if(count === 0){
                    // 재귀를 사용해서 지뢰가 하나도 없으면 주변 칸을 연다.
                    if(row > -1){
                        const near = [];
                        if(row - 1 > -1){
                            near.push([row - 1, cell - 1]);
                            near.push([row - 1, cell]);
                            near.push([row - 1, cell + 1]);
                        }
                        near.push([row, cell - 1]);
                        near.push([row, cell + 1]);
                        if(row + 1 < tableData.length){
                            near.push([row + 1, cell - 1]);
                            near.push([row + 1, cell]);
                            near.push([row + 1, cell + 1]);
                        }
                        near.forEach((n) => {
                            if(tableData[n[0][n[1]]] !== CODE.OPENED){
                                checkArround(n[0], n[1]);
                            }
                            // checkArround(n[0], n[1]);
                        })
                    }
                }
                
                if (tableData[row][cell] === CODE.NORMAL){
                    // 열고자 하는 칸이 닫혀있는 칸이면 증가시킨다.
                    openedCount += 1;
                }
                
                tableData[row][cell] = count;
            };

            checkArround(action.row, action.cell);

            let halted = false;
            let result = '';
            console.log(state.data.row * state.data.cell - state.data.mine);
            console.log(state.openedCount);
            console.log(openedCount);
            if(state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount){
                // 승리. 지뢰가 없는 칸 만큼 전부 열면 승리.

                halted = true; // 게임을 멈춘다.
                result = `${state.timer}초만에 승리하셨습니다.`;
            }

            return {
                ...state,
                tableData,
                openedCount: state.openedCount + openedCount,
                halted,
                result,
            };
        }
        case CLICK_MINE:{
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.cell] = CODE.CLICKED_MINE;
            return {
                ...state,
                tableData,
                halted: true,
            };
        }
        case FLAG_CELL:{
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if(tableData[action.row][action.cell] === CODE.MINE){
                tableData[action.row][action.cell] = CODE.FLAG_MINE;
            }else{
                tableData[action.row][action.cell] = CODE.FLAG;
            }
            return {
                ...state,
                tableData,
            };
        }
        case QUESTION_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if(tableData[action.row][action.cell] === CODE.FLAG_MINE){
                tableData[action.row][action.cell] = CODE.QUESTION_MINE;
            }else{
                tableData[action.row][action.cell] = CODE.QUESTION;
            }
            return {
                ...state,
                tableData,
            };
        }
        case NORMALIZE_CELL:{
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if(tableData[action.row][action.cell] === CODE.QUESTION_MINE){
                tableData[action.row][action.cell] = CODE.MINE;
            }else{
                tableData[action.row][action.cell] = CODE.NORMAL;
            }
            return {
                ...state,
                tableData,
            };
        }
        case INCREMENT_TIMER: {
            return {
                ...state,
                timer: state.timer + 1,
            }
        }
        default:
            return state;
    }
}

const MineSearch = memo(() => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { tableData, halted, timer, result } = state;

    // 캐싱
    const value = useMemo(() => ({ tableData: tableData, halted: halted, dispatch}), [tableData, halted]); // dispatch 는 항상 같기때문에 대상배열에 넣지 않아도 된다.

    // 타이머
    useEffect(() => {
        let timer;

        if ( halted === false ) {
            timer = setInterval(() => {
                dispatch({ type: INCREMENT_TIMER });
            }, 1000)
        }
        
        return () => {
            clearInterval();
        }
    }, [halted])


    return(
        // TableContext.Provider로 감싸면, 모든 자식 컴포넌트에서 value 를 가져다 쓸 수 있다.
        // 최적화가 힘든데, 따라서 useMemo로 캐싱을 해야한다.
        <TableContext.Provider value={value}> 
            <Form/>
            <div>{timer}</div>
            <Table/>
            <div>{result}</div>
        </TableContext.Provider>
    );
});

export default MineSearch;