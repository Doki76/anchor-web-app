import { ActionButton } from '@libs/neumorphism-ui/components/ActionButton';
import { HorizontalScrollTable } from '@libs/neumorphism-ui/components/HorizontalScrollTable';
import { IconSpan } from '@libs/neumorphism-ui/components/IconSpan';
import { InfoTooltip } from '@libs/neumorphism-ui/components/InfoTooltip';
import { Section } from '@libs/neumorphism-ui/components/Section';
import React from 'react';
import styled from 'styled-components';

export interface AvailableGuardiansProps {
  className?: string;
}

export function AvailableGuardiansBase({ className }: AvailableGuardiansProps) {
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
            <col style={{ minWidth: 80 }} />
            <col style={{ minWidth: 80 }} />
            <col style={{ minWidth: 80 }} />
            <col style={{ minWidth: 80 }} />
            <col style={{ minWidth: 80 }} />
            <col style={{ minWidth: 140 }} />
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
                <IconSpan>Position Type</IconSpan>
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
              <th>Strategy Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <p>10.000</p>
                <p>aUST</p>
                <p>Anchor</p>
              </td>
              <td>11000 UST</td>
              <td>Stake</td>
              <td>
                <p>Unstake aUST and use UST to repay loan</p>
              </td>
              <td>
                <p>Repay Loan</p>
              </td>
              <td>
                <div className="deploy-button">
                  <ActionButton style={{ minWidth: 120 }}>Deploy</ActionButton>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <p>300 LP</p> <p>bLuna/Luna</p>
                <p> Astroport </p>
              </td>
              <td>5000 UST</td>
              <td>LP Tooken</td>
              <td>
                <p>Withdraw LP position from Astroport.</p>
                <p> Add Bluna as Colateral</p>
              </td>
              <td>
                <p>Increase Colateral</p>
              </td>
              <td>
                <div className="deploy-button">
                  <ActionButton style={{ minWidth: 120 }}>Deploy</ActionButton>
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
//   display: flex;
//   gap: 10px;

//   @media (max-width: 700px) {
//     width: 100%;
//     gap: 0;
//     justify-content: stretch;
//     flex-direction: column;
//   }
// `;

export const AvailableGuardians = styled(AvailableGuardiansBase)`
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
