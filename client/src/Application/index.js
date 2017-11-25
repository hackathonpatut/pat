import React from 'react'
import ApplicationForm from './ApplicationForm'
import glamorous from 'glamorous'

const Title = glamorous.h1({
  color: '#2295c1',
  fontSize: '24px',
  marginBottom: '40px'
})

const Application = () => (
  <div>
    <Title>You are applying for: Sales manager - Patu Systems Oy</Title>
    <ApplicationForm />
  </div>
)

export default Application
