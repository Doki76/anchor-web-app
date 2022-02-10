import { ActionButton } from '@libs/neumorphism-ui/components/ActionButton';
import { HorizontalScrollTable } from '@libs/neumorphism-ui/components/HorizontalScrollTable';
import { IconSpan } from '@libs/neumorphism-ui/components/IconSpan';
import { InfoTooltip } from '@libs/neumorphism-ui/components/InfoTooltip';
import { Section } from '@libs/neumorphism-ui/components/Section';
import React from 'react';
import styled from 'styled-components';

export interface DeployedGuardiansProps {
  className?: string;
}

export function DeployedGuardiansBase({ className }: DeployedGuardiansProps) {
  // ---------------------------------------------
  // presentation
  // ---------------------------------------------
  return (
    <section className={className}>
      <Section>
        <HorizontalScrollTable
          minWidth={1400}
          startPadding={20}
          endPadding={20}
        >
          <colgroup>
            <col style={{ minWidth: 100 }} />
            <col style={{ minWidth: 100 }} />
            <col style={{ minWidth: 100 }} />
            <col style={{ minWidth: 200 }} />
            <col style={{ minWidth: 100 }} />
            <col style={{ minWidth: 250 }} />
          </colgroup>
          <thead>
            <tr>
              <th>
                <IconSpan>
                  Position{' '}
                  <InfoTooltip>Availible Positions in your Wallet</InfoTooltip>
                </IconSpan>
              </th>
              <th>
                <IconSpan>Guard Value (Ust)</IconSpan>
              </th>
              <th>
                <IconSpan>
                  Unwind Strategy
                  <InfoTooltip>
                    Describes how the position is used in case the LTV drops to
                    low
                  </InfoTooltip>
                </IconSpan>
              </th>
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <p>500</p>
                <p>mBTC/UST</p>
                <p>Mirror</p>
              </td>
              <td>20000 UST</td>
              <td>
                <p>Withdraw LP repay loan with UST part.</p>
                <p> Send other Side back to your wallet</p>
              </td>
              <td>1</td>
              <td>
                <div className="deploy-button">
                  <ActionButton style={{ minWidth: 140 }}>
                    Change Priority
                  </ActionButton>
                  <ActionButton style={{ minWidth: 120 }}>
                    Withdraw
                  </ActionButton>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <p>10.000</p>
                <p>aUST</p>
                <p>Anchor</p>
              </td>
              <td>11000 UST</td>
              <td>
                <p>Unstake aUST and use UST to repay loan</p>
              </td>
              <td>2</td>
              <td>
                <div className="deploy-button">
                  <ActionButton style={{ minWidth: 140 }}>
                    Change Priority
                  </ActionButton>
                  <ActionButton style={{ minWidth: 120 }}>
                    Withdraw
                  </ActionButton>
                </div>
              </td>
            </tr>
          </tbody>
        </HorizontalScrollTable>
      </Section>
    </section>
  );
}

// const Buttons = styled.div`
//     display: flex;
//     gap: 10px;

//     @media (max-width: 700px) {
//       width: 100%;
//       gap: 0;
//       justify-content: stretch;
//       flex-direction: column;
//     }
//   `;

export const DeployedGuardians = styled(DeployedGuardiansBase)`
  // ---------------------------------------------
  // style
  // ---------------------------------------------

  tbody {
    td {
      font-size: 12px;
      letter-spacing: -0.3px;
    }
  }

  .deploy-button {
    display: flex;
    gap: 10px;

    button {
      height: 48px;
      border-radius: 26px;
    }
  }
`;
