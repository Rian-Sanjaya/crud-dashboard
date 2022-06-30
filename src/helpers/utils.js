const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*-._])[A-Za-z\d#?!@$%^&*-._]{8,15}$/;

const logOut = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('userData');
  localStorage.removeItem('menu');
  localStorage.removeItem('shipping');
  window.location.replace('/login');
};

export { passwordRegex, logOut };
