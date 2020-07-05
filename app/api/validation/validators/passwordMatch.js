const passwordMatch = (value, {req}) => {
  if (value !== req.body.password_confirmation) {
    throw new Error('Passwords does not match');
  }
  return true;
}

module.exports = passwordMatch;