import React, { useCallback, useContext, memo, useMemo } from 'react';
import { NORMALIZE_CELL, QUESTION_CELL, FLAG_CELL, CLICK_MINE, CODE, OPEN_CELL, TableContext } from './MineSearch';

const getTdStyle = (code) => {
    switch(code) {
        case CODE.NORMAL:
            return {
                background: '#4F4E4F',
            };
        case CODE.MINE:
            return{
                // background: '#694858' // 테스트용
                background: '#4F4E4F',
            };
        case CODE.CLICKED_MINE:
        case CODE.OPENED:
            return{
                background: 'white'
            };
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
            return {
                background: '#7B9C7B',
            }
        case CODE.FLAG_MINE:
        case CODE.FLAG:
            return {
                background: '#B5766B',
            }
        default:
            return{
                background: 'white'
            };
    }
};

const getTdText = (code) => {
    switch(code) {
        case CODE.NORMAL:
            return '';
        case CODE.MINE:
            // return 'X'; // 테스트용
            return '';
        case CODE.CLICKED_MINE:
            return '펑';
        case CODE.FLAG_MINE:
            case CODE.FLAG:
                return '!';
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
            return '?';
        default:
            return code || '';
    }
}

const Td = memo(({ rowIndex, cellIndex }) => {
    const { tableData, dispatch, halted } = useContext(TableContext);

    const onClickTd = useCallback(() => {
        if(halted) {
            return;
        }
        
        switch (tableData[rowIndex][cellIndex]){
            case CODE.NORMAL:
                dispatch({ type: OPEN_CELL, row: rowIndex, cell: cellIndex });
                return;
            case CODE.MINE:
                dispatch({type: CLICK_MINE, row: rowIndex, cell: cellIndex });
                return;
            case CODE.OPENED:
            case CODE.FLAG_MINE:
            case CODE.FLAG:
            case CODE.QUESTION_MINE:
            case CODE.QUESTION:
                return;
        }
    }, [tableData[rowIndex][cellIndex], halted]);

    const onRightClickTd = useCallback((e) => {
        e.preventDefault();

        if(halted){
            return;
        }
        
        switch (tableData[rowIndex][cellIndex]) {
            case CODE.NORMAL:
            case CODE.MINE:
                dispatch({ type: FLAG_CELL, row: rowIndex, cell: cellIndex });
                return;
            case CODE.FLAG_MINE:
            case CODE.FLAG:
                dispatch({ type: QUESTION_CELL, row: rowIndex, cell: cellIndex });
                return;
            case CODE.QUESTION_MINE:
            case CODE.QUESTION:
                dispatch({ type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex });
                return;
            default:
                return;
        }
    }, [tableData[rowIndex][cellIndex], halted]);

    return useMemo(() => (
        <td
            style={ getTdStyle(tableData[rowIndex][cellIndex]) }
            onClick={onClickTd}
            onContextMenu={onRightClickTd}
        >{ getTdText(tableData[rowIndex][cellIndex]) }</td>
    ), [tableData[rowIndex][cellIndex]]);
});

export default Td;