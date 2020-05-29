import React from 'react'
import { Screen } from '../common/Screen'
import { PageTitle } from '../common/Text/PageTitle'
import { Container } from '../common/Container'
import { LoginForm } from './LoginForm'
import { OnboardView } from '../common/OnboardView'

export const Login = () => (
  <Screen>
    <OnboardView>
      <Container>
        <PageTitle>Log in</PageTitle>
        <LoginForm/>
      </Container>
    </OnboardView>
  </Screen>
)
