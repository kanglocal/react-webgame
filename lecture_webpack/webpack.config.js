const path = require('path'); // node에서 경로 쉽게 조작하기 위한 것. node 깔려있으면 자동으로 path 가 깔려있다.
const { webpack } = require('webpack');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');


// 일케 설정하고, 터미널에서 webpack 딱 치면 알아서 생성해주는게 아니라 그전에
// package.json 의 script 에 등록을 해주거나 명령어로 등록을 해줘야 동작함.
// 아니면 npx webpack 이라고 명령어 치면 실행 된다.
// 요 순서대로 적기~~~~~~~~~~^0^
module.exports = {
    name: 'word-relay-setting',
    mode: 'development', // 실서비스 : production
    devtool: 'eval', // eval = 빠르게!  실서비스 : hidden-source-map
    resolve: {
        extensions: ['.js', '.jsx']
    },

    entry: { // ★ 중요! : 입력 
        //app: ['./client.jsx', './WordRelay.jsx'],
        app: ['./client'], // 윗줄에서 왜 WordRelay.jas 뺏냐면, client.jsx 에서 WordRelay.jsx 를 불러오고 있기 때문임. 확장자도 안써도된다.(resolve 설정 넣으면!)
    },

    module: { // 연결해주는 아이~! 얘가 Loader 임
        rules: [{ // 규칙! 의미 : js파일이나 jsx 파일을 babel-loader를 통해 최신문법을 옛날 문법으로 바꿔라
            test: /\.jsx?$/, // 규칙을 적용할 파일들
            loader: 'babel-loader',
            options: {// 옵션
                presets: [
                    // ['@babel/preset-env',{
                    //     "useBuiltIns": "entry","corejs":3
                    //     // targets: {
                    //     //     browsers: ['> 5% in KR','last 2 chrome versions'],
                    //     //     // 첫번째 것 : 한국에서 5퍼센트 이상 점유율을 가진 브라우저만 지원
                    //     //     // 두번째 것 : 마지막이랑 마지막에서 두번째 크롬버전만 호환되도록 설정함.
                    //     //     // ∵오래된버전 바벨이 번역하려면 점점 느려짐.
                    //     //     // 옵션 볼 수 있는 곳 : github.com/browserslist
                    //     // },
                    //     // "debug": true,
                    // }],
                    '@babel/preset-env',
                    '@babel/preset-react',
                ], // 다운받은 preset-env , preset-react 를 넣어주면 된다.
                // preset : plugin 들의 모음.
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                    'react-refresh/babel',// 자동 npm run dev(로딩) 시켜주는 설정
                ]
            },
        }],
    },
    plugins: [// 웹팩에서 기본적으로 적용되는 모듈이랑 룰스같은거 말고 추가적으로 하고싶은거 있는경우
        // new webpack.LoaderOptionsPlugin({debug: true}), // 로더에 옵션을 집어넣는 옵션
        new RefreshWebpackPlugin()// 자동 npm run dev(로딩) 시켜주는 설정

    ],
    output: {// ★ 중요! : 출력
        path: path.join(__dirname, 'dist'), // __dirname : 현재 폴더에 들어있는 / dist : dist 라는 이름의 폴더
        filename: 'app.js',
        publicPath: '/dist/',
    },
    // webpack.config.js에 결과 돌린걸 dist폴더에 메모리로 저장해놓는다. dev서버는 변경점을 감지한다.
    // package.json 에 script 의 명령어를 이전에는 webpack 으로  해놓았었으나 리프레시를 적용위해 "dev": "webpack serve --env development" 로 변경했다.
    devServer: { // dev서버 설정
        // publicPath: '/dist/', :: 이건 이제 사용되지 않는다고한다.
        devMiddleware: { publicPath: '/dist'}, // 웹팩이 빌드한 파일들이 위치하는 경로
        static: { directory: path.resolve(__dirname) }, // index.html과 같은 실제존재하는 정적파일들의 경로
        hot: true,// 자동 npm run dev(로딩) 시켜주는 설정
    }

};