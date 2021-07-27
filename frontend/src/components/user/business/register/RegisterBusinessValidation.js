export default function RegisterBusinessValidation({ email, name, password, passwordConfirm, phoneNumber, birthYear, birthMonth, birthDay, businessRegistration }, isFirst) {
  const errors = {
    email: true,
    name: true,
    password: true,
    passwordConfirm: true,
    phoneNumber: true,
    birth: false,
    businessRegistration: false,
  }

  if (!isFirst.email) {
    if (!email) {
      errors.email = "이메일이 입력되지 않았습니다.";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.email = "입력된 이메일 형식이 유효하지 않습니다.";
    } else {
      errors.email = ""
    }
  }

  if (!isFirst.name) {
    if (!name) {
      errors.name = "이름이 입력되지 않았습니다.";
    } else {
      errors.name = ""
    }
  }

  if (!isFirst.password) {
    if (!password) {
      errors.password = "비밀번호가 입력되지 않았습니다.";
    } else if (!/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/.test(password)) {
      errors.password = "비밀번호는 특수문자 / 문자 / 숫자를 포함하여 8~20 자리로 입력해야 합니다.";
    } else {
      errors.password = ""
    }
  }

  if (!isFirst.passwordConfirm) {
    if (!passwordConfirm) {
      errors.passwordConfirm = "비밀번호를 다시 입력해 주세요.";
    } else if (passwordConfirm !== password) {
      errors.passwordConfirm = "비밀번호가 일치하지 않습니다.";
    } else {
      errors.passwordConfirm = ""
    }
  }

  if (!isFirst.phoneNumber) {
    if (!phoneNumber) {
      errors.phoneNumber = "핸드폰 번호가 입력되지 않았습니다.";
    } else if (!/^010-?([0-9]{4})-?([0-9]{4})$/.test(phoneNumber)) {
      errors.phoneNumber = "010-0000-0000 형식으로 입력해 주세요.";
    } else {
      errors.phoneNumber = ""
    }
  }

  if (!isFirst.birthYear && !isFirst.birthMonth && !isFirst.birthDay) {
    if (!birthYear || !birthMonth || !birthDay) {
      errors.birth = "생년월일 정보를 입력해 주세요.";
    } else if (!/^(19[0-9][0-9]|20\d{2})$/.test(birthYear) || !/^([1-9]|[1-2][0-9]|3[0-1])$/.test(birthDay)) {
      errors.birth = "올바른 생년월일 정보를 입력해 주세요.";
    } else {
      errors.birth = ""
    }
  }

  if (!businessRegistration) {
    errors.businessRegistration = "pdf, png, jpeg 파일을 업로드해 주세요.";
  } else if (!/\.(pdf|jpe?g|png)$/i.test(businessRegistration)) {
    errors.businessRegistration = "pdf, png, jpeg 형식으로 업로드해 주세요.";
  } else {
    errors.businessRegistration = ""
  }

  return errors;
}