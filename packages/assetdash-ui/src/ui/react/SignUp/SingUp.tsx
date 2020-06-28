import React from 'react';
import {Screen} from '../common/Screen';
import {Container} from '../common/Container';
import {PageTitle} from '../common/Text/PageTitle';
import {SignUpForm} from './SignUpForm';
import {OnboardView} from '../common/OnboardView';

export const SingUp = () => (
  <Screen>
    <OnboardView>
      <Container>
        <PageTitle>Sign Up</PageTitle>
        <SignUpForm/>
      </Container>
    </OnboardView>
  </Screen>
);
