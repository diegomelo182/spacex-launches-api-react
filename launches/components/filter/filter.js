import React, { useContext } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';

import { ListContext } from '../../contexts';
import validate from './filter-validation';

export default function Filter() {
  const { filter, setFilter } = useContext(ListContext);

  const formik = useFormik({
    initialValues: {
      start: '',
      end: '',
      launch_success: '',
    },
    onSubmit: values => {
      let newFilter = {};
      Object.keys(values).forEach(key => {
        if (values[key] !== '') {
          newFilter[key] = values[key];
        }
      });
      setFilter(newFilter);
    },
    validate,
  });

  const onReset = () => {
    formik.resetForm();
    setFilter({});
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item md={3}>
          <FormControl>
            <FormLabel id="start"
              error={formik?.errors?.start && true}>
              Start Date
            </FormLabel>
            <TextField
              error={formik?.errors?.start && true}
              type="date"
              name="start"
              onChange={formik.handleChange}
              value={formik.values.start}
              helperText={formik?.errors?.start}
            />
          </FormControl>
        </Grid>

        <Grid item md={3}>
          <FormControl>
            <FormLabel id="end"
              error={formik?.errors?.end && true}>
              End Date
            </FormLabel>
            <TextField
              error={formik?.errors?.end && true}
              type="date"
              name="end"
              onChange={formik.handleChange}
              value={formik.values.end}
              helperText={formik?.errors?.end}
            />
          </FormControl>
        </Grid>

        <Grid item md={3}>
          <FormControl>
            <FormLabel id="launch_success"
              error={formik?.errors?.launch_success && true}>
              Mission succeeded
            </FormLabel>
            <RadioGroup
              error={formik?.errors?.launch_success && true}
              aria-labelledby="launch_success"
              defaultValue=""
              name="launch_success"
              onChange={formik.handleChange}
              value={formik.values.launch_success}
            >
              <FormControlLabel value="" control={<Radio />} label="Blank" />
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item md={6}>
          <Button variant="contained" type="submit">Submit</Button>
          <Button
            onClick={() => onReset()}
            variant="contained"
            color="inherit"
          >
            Reset
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
