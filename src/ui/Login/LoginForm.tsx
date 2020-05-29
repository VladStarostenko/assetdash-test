import React from 'react'
import { Label } from '../common/Form/Label'
import { FormBox, FormBoxText, FormButton } from '../common/Form/FormBox'
import { Input } from '../common/Form/Input'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { LoginCheckbox } from './LoginCheckbox'

export const LoginForm = () => (
  <FormBox>
    <Label>
      E-mail
      <Input type="email" required/>
    </Label>
    <Label>
      Password
      <Input type="password" required/>
    </Label>
    <FormRow>
      <LoginCheckbox/>
      <ForgotPasswordLink to="forgot-password">Forgot passoword?</ForgotPasswordLink>
    </FormRow>
    <FormButton type="submit">Log In</FormButton>
    <FormBoxText>Don’t have an account? <Link to="/sign-up">Sign Up</Link></FormBoxText>
  </FormBox>
)

const FormRow = styled.div`
  display: flex;  
  align-items: center;
  justify-content: space-between;
  margin: 16px 0 0;
`

const ForgotPasswordLink = styled(Link)`
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  color: #8395AE;
`
