const path = require('path'); // node에서 경로 쉽게 조작하기 위한 것. node 깔려있으면 자동으로 path 가 깔려있다.

// 일케 설정하고, 터미널에서 webpack 딱 치면 알아서 생성해주는게 아니라 그전에
// package.json 의 script 에 등록을 해주거나 명령어로 등록을 해줘야 동작함.
// 아니면 npx webpack 이라고 명령어 치면 실행 된다.
module.exports = {
    name: 'word-relay-setting',
    mode: 'development', // 실서비스 : production
    devtool: 'eval', // eval = 빠르게! 
    resolve: {
        extensions: ['.js', '.jsx']
    },

    entry: { // ★ 중요! : 입력 
        //app: ['./client.jsx', './WordRelay.jsx'],
        app: ['./client'], // 윗줄에서 왜 WordRelay.jas 뺏냐면, client.jsx 에서 WordRelay.jsx 를 불러오고 있기 때문임. 확장자도 안써도된다.(resolve 설정 넣으면!)
    },

    module: { // 연결해주는 아이~!
        rules: [{ // 규칙! 의미 : js파일이나 jsx 파일을 babel-loader를 통해 최신문법을 옛날 문법으로 바꿔라
            test: /\.jsx?/, // 규칙을 적용할 파일들
            loader: 'babel-loader',
            options: {// 옵션
                presets: ['@babel/preset-env', '@babel/preset-react'], // 다운받은 preset-env , preset-react 를 넣어주면 된다.
                plugins: ['@babel/plugin-proposal-class-properties']
            },
        }],
    },

    output: {// ★ 중요! : 출력
        path: path.join(__dirname, 'dist'), // __dirname : 현재 폴더에 들어있는 / dist : dist 라는 이름의 폴더
        filename: 'app.js'
    }
}