export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validateName = (name) => {
  return name.trim().length > 0;
};

export const validateAge = (age) => {
  const numAge = Number(age);
  return !isNaN(numAge) && numAge >= 18;
};

export const validatePassword = (password) => {
  return password.length >= 6;
};
