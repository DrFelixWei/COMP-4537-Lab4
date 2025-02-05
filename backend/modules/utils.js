function validate(input) {
    const regex = /^[A-Za-z\s.,'’-]+$/;
    return regex.test(input);
  }
  
module.exports = { validate };
  