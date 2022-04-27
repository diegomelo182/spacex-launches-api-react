const validate = (values, _props) => {
  const errors = {};
  const { start, end } = values;

  if (start && !end) {
    errors.end = 'Required';
  } else if (!start && end) {
    errors.start = 'Required';
  }

  return errors;
};

export default validate;
