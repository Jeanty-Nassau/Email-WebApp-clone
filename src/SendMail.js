import React from 'react'
import './SendMail.css'
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { closeSendMessage } from './features/mailSlice';
import { db } from './firebase';
import firebase from 'firebase/compat/app'

function SendMail() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = (formData) => {
    console.log(formData);
    db.collection('emails').add({
      to: formData.to,
      subject: formData.subject,
      message: formData.message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    dispatch(closeSendMessage());
  };
  const dispatch = useDispatch();
  return (
    <div className='sendMail'>
      <div className='sendMail-header'>
        <h3>New Message</h3>
        <IconButton onClick={() => dispatch(closeSendMessage())}>
          <CloseIcon className='sendMail-close' />
        </IconButton>

      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder='To' type="email" name="to" {...register('to', { required: true })} />
        {errors.to && <p className='sendMail-error'>To is Required!</p>}

        <input placeholder='Subject' type="text" name="subject" {...register('subject', { required: true })} />
        {errors.subject && <p className='sendMail-error'>Subject is Required!</p>}

        <input placeholder='Message...' type="text" name="message" className='sendMail-message' {...register('message', { required: true })} />
        {errors.message && <p className='sendMail-error'>Message is Required!</p>}

        <div className='sendMail-options'>
          <Button className='sendMail-send' variant='contained' color='primary' type='submit'>Send</Button>
        </div>
      </form>
    </div>
  )
}

export default SendMail
