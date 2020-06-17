import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { ButtonPrimary } from '../Button/ButtonPrimary';

interface FormBoxProps {
  children: ReactNode
}

export const FormBox = ({ children }: FormBoxProps) => (
  <Form>
    <FormInner>
      {children}
    </FormInner>
  </Form>
);

export const FormBoxText = styled.p`
  margin-top: 24px;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: #8395AE;

  a {
    color: #21ce99;
  }
`;

export const FormButton = styled(ButtonPrimary)`
  margin-top: 24px;

  @media(max-width: 600px) {
    margin-top: 16px;
  }
`;

const Form = styled.form`
  max-width: 570px;
  margin: 24px auto 0;
  padding: 40px 16px;
  background: ${({ theme }) => theme.colors.backgroundPrimary};
  box-shadow: ${({ theme }) => theme.colors.boxShadowPrimary};
  border-radius: 2px;

  @media(max-width: 990px) {
    max-width: 482px;
  }

  @media(max-width: 6000px) {
    padding: 24px 16px;
  }
`;

const FormInner = styled.div`
  max-width: 410px;
  margin: 0 auto;
`;
