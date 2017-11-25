import React from 'react';
import FileSender from './FileSender';
import ApplicationForm from './ApplicationForm';
import glamorous from 'glamorous';

const Title = glamorous.h1({
  color: '#e46069',
  fontSize: '24px',
  marginBottom: '40px',
})

const Application = () => (
  <div>
    <Title>You are applying for: Sales manager - Patu Systems Oy</Title>
    <FileSender />
    <ApplicationForm />
  </div>
)

export default Application;
