import React from 'react'
import { FormBox, FormBoxText, FormButton } from '../common/Form/FormBox'
import { Label } from '../common/Form/Label'
import { Input } from '../common/Form/Input'
import { Link } from 'react-router-dom'

export const SignUpForm = () => (
  <FormBox>
    <Label>
      E-mail
      <Input type="email" required/>
    </Label>
    <Label>
      Password
      <Input type="password" required/>
    </Label>
    <Label>
      Password
      <Input type="password" required/>
    </Label>
    <FormButton type="submit">Sign Up</FormButton>
    <FormBoxText>Already have an account? <Link to="/login">Log In</Link></FormBoxText>
  </FormBox>
)
