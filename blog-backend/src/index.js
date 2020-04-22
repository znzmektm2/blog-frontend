require('dotenv').config(); // 프로젝트 참여자 각각이 MacOS, Windows, Linux 등을 사용한다면
// 환경변수 설정하는 방법이 다르기 때문에 dotenv 라이브러리가 대신 설정해준다.

const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const api = require('./api');
const mongoose = require('mongoose');

const {
  PORT: port = 4000, // 값이 존재하지 않는다면 4000을 기본값으로 사용
  MONGO_URI: mongoURI
} = process.env;

mongoose.Promise = global.Promise; // Node의 Promise를 사용하도록 설정
mongoose.connect(mongoURI, {useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => { //{ useNewUrlParser: true } 를 적지 않으면 deprecatedError 가 발생한다. 
    console.log('connected to mongodb');
  }).catch((e) => {
    console.log(e);
  });

const app = new Koa();
const router = new Router();

// ctx => {...} 코드가 하나의 미들웨어이다. 
// 첫번째 파라미터는 ctx로 웹 요청과 응답에 대한 정보를 지님.
// 두번째 파라미터는 next로 다음 미들웨어를 실행시키는 함수이다.

// app.use(async (ctx, next) => { 
//   console.log(1);
//   await next();
//   console.log('bye');
//   // next().then(() => {
//   //   console.log('bye');
//   // })
// });

// app.use((ctx, next) => { 
//   console.log(2);
//   next();
// });

// app.use((ctx) => { 
//   ctx.body = 'hello world';
// });

// 라우터 설정
// router.get('/', (ctx) => {
//   ctx.body = '홈';
// });

// router.get('/about', (ctx) => {
//   ctx.body = '소개';
// })

// router.get('/about/:name?', (ctx) => {
//   const { name } = ctx.params;
//   // name의 존재 유무에 따라 다른 결과 출력
//   ctx.body = name ? `${name}의 소개` : '소개';
// })

// router.get('/posts', (ctx) => {
//   const { id } = ctx.query;
//   // id의 존재 유무에 따라 결과 출력
//   ctx.body = id ? `포스트 #${id}` : '포스트 아이디가 없습니다.';
// })

// 라우터 설정
router.use('/api', api.routes()); // api 라우트 적용

// 라우터 적용 전에 bodyparser 적용
// 클라이언트 측에서 json 형식으로 바디를 보내면 서버측에서 ctx.request.body 등으로 접근할 수 있게됨
app.use(bodyParser());

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
  console.log('listening to port', port);
});