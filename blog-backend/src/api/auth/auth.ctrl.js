const { ADMIN_PASS: adminPass } = process.env;

exports.login = (ctx) => {
  const { password } = ctx.request.body;
  if(adminPass === password) {
    ctx.body = {
      success: true
    };
    // 로그인에 성공하면 logged 값을 true로 설정합니다
    ctx.session.logged = true;
  } else {
    ctx.body = {
      success: false
    };
    ctx.status = 401; // Unauthorized
  }
};

exports.check = (ctx) => {
  ctx.body = {
    // ! 문자를 두 번 입력하여 값이 존재하지 않을 때도 false를 반환하도록 설정합니다
    // **느낌표 두개(!!)를 사용하면 0, null, undefined 등과 같은 정의 되지 않은 변수들을 강제 변환하여 정확한 논리 결과인 false로
    // **느낌표 한개(!)를 사용하면 false로 만들어 준다
    logged: !!ctx.session.logged
  };
};

exports.logout = (ctx) => {
  ctx.session = null;
  ctx.status = 204; // No Content
}