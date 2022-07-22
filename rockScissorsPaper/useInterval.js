// 직접만든 훅!
import { useRef, useEffect } from 'react';

// 기능 : 
// useInterval(() => {
// console.log('Hello');
// }, 1000);

function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    });

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }

        // delay를 null로 만들면 interval이 멈춘다.
        if (delay !== null) {
            
            // delay가 null이 아닐 때 실행된다.
            let id = setInterval(tick, delay);

            // delay가 null일 때 실행된다.
            return () => clearInterval(id);
        }
    }, [delay]);

    
    return savedCallback.current;
}

export default useInterval;