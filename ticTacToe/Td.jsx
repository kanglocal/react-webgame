import React, { useCallback, useEffect, useRef, memo } from 'react'; // useEffect, useRef 는 reRendering이 일어나는 원인을 찾기 위해 넣었다.
// import { CLICK_CELL, CHANGE_TURN } from './TicTacToe';
import { CLICK_CELL } from './TicTacToe';

const Td = memo(({ rowIndex, cellIndex, dispatch, cellData }) => {
    console.log("Td Rendered");

    // < reRendering 원인 찾기
    const ref = useRef([]);
    useEffect(() => {
        // console.log(rowIndex === ref.current[0], cellIndex === ref.current[1], dispatch === ref.current[2], cellData === ref.current[3]);
        // console.log(cellData, ref.current[3]);
        ref.current = [rowIndex, cellIndex, dispatch, cellData];
    },[rowIndex, cellIndex, dispatch, cellData]);
    // reRendering 원인 찾기 [결과 : 문제없음. Tr을 보자.]>

    const onClickTd = useCallback(() => {
        console.log(rowIndex, cellIndex);
        if(cellData) {
            return;
        }
        // useReducer 는 state가 비동기적으로 바뀐다. 비동기인 state에서 뭔가 처리하려면 useEffect 를 써줘야한다.
        dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
        // dispatch({ type: CHANGE_TURN }); // 여기서 쓰면 비동기문제로 winner 를 찾을 수 없다. 따라서 tictactoe.jsx 에서 다룬다.
    }, [cellData]);
    return (
        <td onClick={onClickTd}>{cellData}</td>
    )
});

export default Td;