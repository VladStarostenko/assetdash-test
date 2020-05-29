import React from 'react'
import { Screen } from '../common/Screen'
import { Container } from '../common/Container'
import { PageTitle } from '../common/Text/PageTitle'
import { FormBox, FormButton } from '../common/Form/FormBox'
import { Label } from '../common/Form/Label'
import { Input } from '../common/Form/Input'
import { OnboardView } from '../common/OnboardView'

export const ForgotPassword = () => (
  <Screen>
    <OnboardView>
      <Container>
        <PageTitle>Forgot password</PageTitle>
        <FormBox>
          <Label>
            E-mail
            <Input type="email" required/>
          </Label>
          <FormButton type="submit">Remember password</FormButton>
        </FormBox>
      </Container>
    </OnboardView>
  </Screen>
)
