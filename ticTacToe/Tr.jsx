import React, { useRef, useEffect, memo, useMemo } from 'react';
import Td from './Td';

const Tr = memo(({ rowData, rowIndex, dispatch }) => {
    console.log("Tr rendered");

    const ref = useRef([]);
    useEffect(() => {
        console.log(rowData === ref.current[0], rowIndex === ref.current[1], dispatch === ref.current[2]);
        ref.current = [rowData, rowIndex, dispatch]
    },[rowData, rowIndex, dispatch]);

    return (
        <tr>
            {Array(rowData.length).fill().map((td, i) => (
                // 이미 Memo 로 최적화했지만, useMemo 쓸거면 이렇게 하면 된다.
                useMemo(
                        () => <Td key={i} dispatch={dispatch} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]}>{''}</Td>,
                        [rowData[i]]
                    )
            ))}
        </tr>
    )
});

export default Tr;