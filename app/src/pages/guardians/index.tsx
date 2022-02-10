import { PaddedLayout } from 'components/layouts/PaddedLayout';
import { PageTitle, TitleContainer } from 'components/primitives/PageTitle';
import React from 'react';
import styled from 'styled-components';
import { AvailableGuardians } from './components/AvailableGuardians';
import { DeployedGuardians } from './components/DeployedGuardians';

export interface GuardiansProps {
  className?: string;
}

function GuardiansBase({ className }: GuardiansProps) {
  return (
    <PaddedLayout className={className}>
      <TitleContainer>
        <PageTitle title="GUARDIANS" />
      </TitleContainer>

      <>
        <h2>Available Guardians</h2>
        <p className="description">
          Supported LP and staked tokens found in your Wallet
        </p>
        <AvailableGuardians />
      </>

      <>
        <h2>Deployed Guardians</h2>
        <DeployedGuardians />
      </>
    </PaddedLayout>
  );
}

export const Guardians = styled(GuardiansBase)`
  // ---------------------------------------------
  // style
  // ---------------------------------------------
  .description {
    margin: 10px 10px 10px 10px;
  }

  header {
    display: flex;
    align-items: center;

    margin: 80px 0 30px 0;

    div:empty {
      flex: 1;
    }

    h2 {
      font-size: 18px;
      font-weight: 700;
    }

    select {
      height: 40px;
    }

    button,
    a {
      width: 180px;
      height: 48px;
      border-radius: 26px;
      margin-left: 10px;
    }
  }
`;
