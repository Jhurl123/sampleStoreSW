import React, { useState } from 'react'
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles"
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  datePrompt: {
    marginBottom: '2em',
    fontSize: '1.3rem'
  },
  formContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    marginBottom: '2rem'
  }
}))

const AgeGateForm = props =>  {

  const { submitForm, verifyDate, handleDateChange, selectedDate } = props
  const classes = useStyles()

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <form onSubmit={(e) => submitForm(e)}>
        <Grid className={classes.formContainer} container >
          <KeyboardDatePicker
            className={classes.picker}
            disableToolbar
            disableFuture
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Enter Your Age"
            maxDate={verifyDate}
            maxDateMessage="You must be 21 years of age!"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
            <Button size="large" variant="contained" type="submit">Enter Now</Button>
        </Grid>
      </form>
    </MuiPickersUtilsProvider>
  )
}

AgeGateForm.propTypes = {
  submitForm: PropTypes.func, 
  verifyDate: PropTypes.string, 
  handleDateChange: PropTypes.func, 
  selectedDate: PropTypes.string 
}

export default AgeGateForm