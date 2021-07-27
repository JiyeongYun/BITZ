export default function ChangePasswordValidation({ password, newPassword, newPasswordConfirm }, isFirst) {
  const errors = {
    password: true,
    newPassword: true,
    newPasswordConfirm: true,
  }

  if (!isFirst.password) {
    if (!password) {
      errors.password = "비밀번호가 입력되지 않았습니다.";
    } else {
      errors.password = ""
    }
  }

  if (!isFirst.newPassword) {
    if (!newPassword) {
      errors.newPassword = "비밀번호가 입력되지 않았습니다.";
    } else if (!/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/.test(newPassword)) {
      errors.newPassword = "비밀번호는 특수문자 / 문자 / 숫자를 포함하여 8~20 자리로 입력해야 합니다.";
    } else {
      errors.newPassword = ""
    }
  }

  if (!isFirst.newPasswordConfirm) {
    if (!newPasswordConfirm) {
      errors.newPasswordConfirm = "비밀번호를 다시 입력해 주세요.";
    } else if (newPasswordConfirm !== newPassword) {
      errors.newPasswordConfirm = "비밀번호가 일치하지 않습니다.";
    } else {
      errors.newPasswordConfirm = ""
    }
  }

  return errors;
}