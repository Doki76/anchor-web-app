import { useOperation } from '@anchor-protocol/broadcastable-operation';
import { ActionButton } from '@anchor-protocol/neumorphism-ui/components/ActionButton';
import { Section } from '@anchor-protocol/neumorphism-ui/components/Section';
import { demicrofy, formatUST } from '@anchor-protocol/notation';
import { useWallet } from '@anchor-protocol/wallet-provider';
import { useApolloClient } from '@apollo/client';
import big from 'big.js';
import { OperationRenderer } from 'components/OperationRenderer';
import { WarningMessage } from 'components/WarningMessage';
import { useBank } from 'contexts/bank';
import { useAddressProvider } from 'contexts/contract';
import { useInvalidTxFee } from 'logics/useInvalidTxFee';
import { useClaimableRewards } from 'pages/basset/logics/useClaimableRewards';
import { useClaimable } from 'pages/basset/queries/claimable';
import { claimOptions } from 'pages/basset/transactions/claimOptions';
import React, { useCallback, useEffect } from 'react';

export interface ClaimSectionProps {
  disabled: boolean;
  onProgress: (inProgress: boolean) => void;
}

export function ClaimSection({ disabled, onProgress }: ClaimSectionProps) {
  // ---------------------------------------------
  // dependencies
  // ---------------------------------------------
  const { status, post } = useWallet();

  const addressProvider = useAddressProvider();

  const client = useApolloClient();

  const [claim, claimResult] = useOperation(claimOptions, {
    addressProvider,
    client,
    post,
  });

  // ---------------------------------------------
  // queries
  // ---------------------------------------------
  const bank = useBank();

  const { parsedData: claimable } = useClaimable();

  // ---------------------------------------------
  // logics
  // ---------------------------------------------
  const claimableRewards = useClaimableRewards(claimable);

  const invalidTxFee = useInvalidTxFee(bank);

  // ---------------------------------------------
  // callbacks
  // ---------------------------------------------
  const proceed = useCallback(async () => {
    if (status.status !== 'ready' || bank.status !== 'connected') {
      return;
    }

    await claim({
      address: status.status === 'ready' ? status.walletAddress : '',
      bAsset: 'bluna',
      recipient: undefined,
    });
  }, [bank.status, claim, status]);

  // ---------------------------------------------
  // effects
  // ---------------------------------------------
  useEffect(() => {
    onProgress(claimResult?.status === 'in-progress');
  }, [claimResult?.status, onProgress]);

  // ---------------------------------------------
  // presentation
  // ---------------------------------------------
  if (
    claimResult?.status === 'in-progress' ||
    claimResult?.status === 'done' ||
    claimResult?.status === 'fault'
  ) {
    return (
      <Section>
        {claimResult.status === 'done' ? (
          <div>
            <pre>{JSON.stringify(claimResult.data, null, 2)}</pre>
            <ActionButton style={{ width: 200 }} onClick={claimResult.reset}>
              Exit
            </ActionButton>
          </div>
        ) : (
          <OperationRenderer result={claimResult} />
        )}
      </Section>
    );
  }

  return (
    <Section>
      <article className="claimable-rewards">
        <h4>Claimable Rewards</h4>
        <p>
          {claimableRewards.gt(0)
            ? formatUST(demicrofy(claimableRewards)) + ' UST'
            : '-'}
        </p>
      </article>

      {!!invalidTxFee && big(claimableRewards).gt(0) && (
        <WarningMessage>{invalidTxFee}</WarningMessage>
      )}

      <ActionButton
        className="submit"
        disabled={
          status.status !== 'ready' ||
          bank.status !== 'connected' ||
          !!invalidTxFee ||
          claimableRewards.lte(0) ||
          disabled
        }
        onClick={() => proceed()}
      >
        Claim
      </ActionButton>
    </Section>
  );
}
