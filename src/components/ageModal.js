import React, { useState } from 'react'
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from "@material-ui/core/styles"
import { sub, compareAsc } from 'date-fns'
import AgeGateForm from './ageGateForm'

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

  // Create a function to pass to the form

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
      <AgeGateForm 
        submitForm={submitForm} 
        verifyDate={verifyDate} 
        handleDateChange={handleDateChange}
        selectedDate={selectedDate}
      />
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