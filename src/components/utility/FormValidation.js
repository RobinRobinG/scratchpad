function validateForm(state) {
  if (state.hasOwnProperty('username') && state.username === '') {
    return { blankfield: 'username' };
  }
  if (state.hasOwnProperty('email') && state.email === '') {
    return { blankfield: 'email' };
  }
  if (
    state.hasOwnProperty('verificationcode') &&
    state.verificationcode === ''
  ) {
    return { blankfield: 'verificationcode' };
  }
  if (state.hasOwnProperty('password') && state.password === '') {
    return { blankfield: 'password' };
  }
  if (state.hasOwnProperty('oldpassword') && state.oldpassword === '') {
    return { blankfield: 'oldpassword' };
  }
  if (state.hasOwnProperty('newpassword') && state.newpassword === '') {
    return { blankfield: 'newpassword' };
  }
  if (state.hasOwnProperty('confirmpassword') && state.confirmpassword === '') {
    return { blankfield: 'confirmpassword' };
  }
  if (state.hasOwnProperty('title') && state.title === '') {
    return { blankfield: 'title' };
  }
  if (state.hasOwnProperty('body') && state.body === '') {
    return { blankfield: 'note' };
  }
  if (
    state.hasOwnProperty('password') &&
    state.hasOwnProperty('confirmpassword') &&
    state.password !== state.confirmpassword
  ) {
    return { passwordmatch: true };
  }
  if (
    state.hasOwnProperty('newpassword') &&
    state.hasOwnProperty('confirmpassword') &&
    state.newpassword !== state.confirmpassword
  ) {
    return { passwordmatch: true };
  }
  return;
}

export default validateForm;
