import React, { Component } from 'react';

// class 밖에 얘네 나와있는 이유 : state가 안쓰이고있어서 render안시켜도되기때문!!!!
const rspCoords = {
    바위: '0',
    가위: '-142px',
    보: '-284px'
};

const scores = {
    가위: 1,
    바위: 0,
    보: -1,
};

const computerChoice = (imgCoord) => {
    // entries : 객체가 가진 모든 프로퍼티를 키와 값 쌍으로 배열 형태로 반환한다.
    return Object.entries(rspCoords).find(function(v){
        return v[1] === imgCoord;
    })[0];
};

class RSPClass extends Component {
    state= {
        result: '',
        imgCoord: '0',
        score: 0,
    };

    interval;
    // 렌더가 성공적으로 실행된 후, 이게 실행된다.( 첫 렌더 이후에만 실행된다. )
    // 여기서 비동기 요청을 많이 한다.
    // 비동기요청 예 ) setInterval
    // setInterval, setTimeout 은 콘솔에도 쌓이지만, 메모리도 쌓이기때문에 꼭 정리해야한다.
    // 완료되지 않은 비동기 요청은 unmount에서 정리해야한다!!
    componentDidMount(){
        this.interval = setInterval(this.changeHand, 60);
    }

    // 이 함수가 true이면 reRendering이 일어나고, false면 일어나지 않는다.
    // shouldComponentUpdate(nextProps, nextState, nextContext){
    //     return true;
    // }

    // 리렌더링 이후 실행된다.
    // componentDidUpdate(){

    // }

    // 부모컴포넌트에 의해 사라질 때
    // 컴포넌트가 제거되기 직전.
    // 비동기 요청 정리(종료)를 여기서 많이 한다.
    componentWillUnmount(){
        clearInterval(this.interval);
    }

    changeHand = () => {
            
        // * 비동기함수가 바깥의 변수를 참조하면 closer가 발생한다.
        const {imgCoord} = this.state; // 이 line이 함수 밖에 있으면 closer 문제로 정상 동작하지 않는다. 비동기이기때문에.

        if(imgCoord === rspCoords.바위){
            this.setState({
                imgCoord: rspCoords.가위,
            });
        }else if(imgCoord === rspCoords.가위){
            this.setState({
                imgCoord: rspCoords.보,
            });
        }else if(imgCoord === rspCoords.보){
            this.setState({
                imgCoord: rspCoords.바위,
            });
        }
    }

    onClickBtn = (choice) => (e) => {
        // e.preventDefault();
        const {imgCoord} = this.state;
        
        // 1. 잠시 멈춘다.
        clearInterval(this.interval); 

        // 2. 점수 계산
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if(diff === 0 ){
            this.setState({
                result: '비겼습니다.',
            });
        }else if([-1, 2].includes(diff)){
            this.setState((prevState) => {
                return {
                    result: '이겼습니다!^0^',
                    score: prevState.score + 1,
                };
            });
        }else{
            this.setState((prevState) => {
                return {
                    result: '졌습니다!ㅜㅜ',
                    score: prevState.score - 1,
                };
            });
        }
        // 3. 1초 후에 다시 손을 움직이게 한다.
        setTimeout(() => {
            this.interval = setInterval(this.changeHand, 100);
        }, 1000)

        
    }

    // * render 안에는 setState가 들어가면 안된다. setState할 때 reder 되기 때문에 무한 렌더링 됨.
    render() {
        const { result, score, imgCoord} = this.state;
        return (
            <>
                <div id="computer" style= {{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}}/>
                <div>
                    {/* 아래와 같이 메서드 안에 함수를 호출하는 경우 다르게 쓸 수 있는 패턴!!
                        : () => 이부분 없애고, 해당 함수에 화살표붙이기 = 고위함수, 고차함수*/}
                    {/* <button id="rock" className="btn" onClick={() => this.onClickBtn('바위')}>바위</button>
                    <button id="scissor" className="btn" onClick={() => this.onClickBtn('가위')}>가위</button>
                    <button id="paper" className="btn" onClick={() => this.onClickBtn('보')}>보</button> */}
                    <button id="rock" className="btn" onClick={this.onClickBtn('바위')}>바위</button>
                    <button id="scissor" className="btn" onClick={this.onClickBtn('가위')}>가위</button>
                    <button id="paper" className="btn" onClick={this.onClickBtn('보')}>보</button>
                </div>
                <div>{result}</div>
                <div>현재 {score}점</div>
            </>
        );
    }
}

export default RSPClass;