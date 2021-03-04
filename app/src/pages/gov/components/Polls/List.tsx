import { BorderButton } from '@anchor-protocol/neumorphism-ui/components/BorderButton';
import { HorizontalScrollTable } from '@anchor-protocol/neumorphism-ui/components/HorizontalScrollTable';
import { Section } from '@anchor-protocol/neumorphism-ui/components/Section';
import { TimeEnd } from '@anchor-protocol/use-time-end';
import { pollStatusLabels } from 'pages/gov/components/formatPollStatus';
import { extractPollDetail } from 'pages/gov/logics/extractPollDetail';
import { useLastSyncedHeight } from 'queries/lastSyncedHeight';
import { useMemo } from 'react';
import styled from 'styled-components';
import { PollTinyGraph } from './PollTinyGraph';
import { PollList } from './types';

export interface ListProps extends PollList {
  className?: string;
}

function ListBase({
  className,
  polls,
  govANCBalance,
  govState,
  govConfig,
  onClick,
  onLoadMore,
}: ListProps) {
  const { data: lastSyncedHeight } = useLastSyncedHeight();

  const pollDetails = useMemo(() => {
    return govANCBalance && govState && govConfig && lastSyncedHeight
      ? polls.map((poll) =>
          extractPollDetail(
            poll,
            govANCBalance,
            govState,
            govConfig,
            lastSyncedHeight,
          ),
        )
      : [];
  }, [govANCBalance, govConfig, govState, lastSyncedHeight, polls]);

  return (
    <Section className={className}>
      <HorizontalScrollTable minWidth={1200} startPadding={20} endPadding={20}>
        <colgroup>
          <col style={{ width: 70 }} />
          <col style={{ width: 150 }} />
          <col style={{ width: 150 }} />
          <col style={{ width: 400 }} />
          <col style={{ width: 260 }} />
          <col style={{ width: 150 }} />
        </colgroup>
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Status</th>
            <th>Title</th>
            <th>Voted</th>
            <th>Ends In</th>
          </tr>
        </thead>
        <tbody>
          {pollDetails.map(({ poll, vote, type, baseline, endsIn }) => (
            <tr key={'list' + poll.id} onClick={() => onClick(poll)}>
              <td>{poll.id}</td>
              <td>{type}</td>
              <td>{pollStatusLabels[poll.status]}</td>
              <td>{poll.title}</td>
              <td>
                <PollTinyGraph
                  total={vote.total}
                  yes={vote.yes}
                  no={vote.no}
                  baseline={baseline.value}
                  baselineLabel={baseline.label}
                />
              </td>
              <td>
                <TimeEnd endTime={endsIn} />
              </td>
            </tr>
          ))}
        </tbody>
      </HorizontalScrollTable>

      {pollDetails.length > 0 &&
        pollDetails[pollDetails.length - 1].poll.id > 1 && (
          <BorderButton className="more" onClick={onLoadMore}>
            More
          </BorderButton>
        )}
    </Section>
  );
}

export const List = styled(ListBase)`
  table {
    min-width: 1000px;

    thead,
    tbody {
      td:nth-child(3) {
        &:first-letter {
          text-transform: uppercase;
        }
      }

      td:nth-child(4) {
        white-space: break-spaces;
      }

      td:nth-child(5) {
        > div {
          min-width: 240px;
          max-width: 240px;

          transform: translateY(12px);
        }
      }

      th:nth-child(6),
      td:nth-child(6) {
        text-align: right;
      }
    }

    tbody {
      tr {
        cursor: pointer;

        &:hover {
          background-color: ${({ theme }) => theme.hoverBackgroundColor};
        }
      }
    }
  }

  .more {
    width: 100%;
    margin-top: 20px;
  }
`;
