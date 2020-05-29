import React, { useState } from 'react'
import styled from 'styled-components'
import { Checkbox } from '../common/Checkbox/Checkbox'

export const LoginCheckbox = () => {
  const [checked, setChecked] = useState(false)

  return (
    <Row>
      <Checkbox id="login-checkbox" value={checked} onChange={setChecked}/>
      <CheckboxLabel htmlFor="login-checkbox">Keep me login</CheckboxLabel>
    </Row>
  )
}

const Row = styled.div`
  display: flex;
  align-items: center;
`

const CheckboxLabel = styled.label`
  margin-left: 8px;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: #1F3840;
`
