import React, { useState } from 'react'
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from "@material-ui/core/styles"
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { sub, compareAsc } from 'date-fns'
import Button from '@material-ui/core/Button';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: 650,
    maxWidth: '95%',
    textAlign: 'center', 
    backgroundColor: theme.palette.background.paper,
    overflow: 'hidden',
    boxShadow: theme.shadows[5],
    transition: 'all 300ms linear',
    padding: '3rem',
  },
  header: {
    fontSize: '2rem',
  },
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

const AgeModal = (props) => {

  const classes = useStyles();
  const {open, verifyAge, setModalStatus} = props

  const [selectedDate, setSelectedDate] = useState(new Date());

  // Subtract 21 years from todays date to set as minimum date for entry
  const verifyDate = sub(new Date(), {years: 21});

  // Set the value of date in state
  // Params: date - Date object
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const submitForm = (e) => {

    e.preventDefault();

    // Compare the two dates and return 1 if the 
    // first date is after the second, -1 if the first date is before the second or 0 if dates are equal.
    const isVerified = compareAsc(verifyDate, selectedDate);
    
    if(isVerified > 0) {
      verifyAge(true)
      document.cookie =  "ageVerified=1"
      setModalStatus(false)
    }

    // TextField takes care of displaying incorrect date message
    return 
  }

  return (
    <Modal  
      open={open}
      onClose={setModalStatus}
      aria-labelledby='modal-title'
      aria-describedby='modal-description'
      BackdropComponent={Backdrop}
    >
    <div className={classes.paper}>
      <h2 id="modal-title" className={classes.header}>You must be 21 to enter this site!</h2>
      <p id="modal-description" className={classes.datePrompt}>Please enter your date of birth</p>
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
    </div>
  </Modal>
  )
}

AgeModal.propTypes = {
  open: PropTypes.bool,
  verifyAge: PropTypes.func,
  setModalStatus: PropTypes.func
}

export default AgeModal 