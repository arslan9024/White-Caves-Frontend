/**
 * Analytics Component
 *
 * Dashboard displaying WhatsApp messaging analytics
 * Shows message counts, response rates, and conversation metrics
 */

import React, { useState, useEffect } from 'react';
import { useWhatsAppAnalytics } from '../../../hooks/whatsapp';

import { , , , , , , , , , , , , , , , , , , , , , , , , ,  } from './Analytics.styles';

interface AnalyticsProps {
  accountId: string;
}

export const Analytics: React.FC<AnalyticsProps> = ({ accountId }) => {
  const {
    analytics,
    isLoading,
    error,
    dateRange,
    setDateRange,
    loadAnalytics,
    exportAnalytics,
    clearError,
  } = useWhatsAppAnalytics();

  const [startDate, setStartDate] = useState<string>(
    dateRange.startDate.toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState<string>(dateRange.endDate.toISOString().split('T')[0]);

  useEffect(() => {
    if (accountId) {
      loadAnalytics(accountId);
    }
  }, [accountId, loadAnalytics]);

  const handleDateRangeChange = () => {
    setDateRange(new Date(startDate), new Date(endDate));
  };

  const handleExport = (format: 'csv' | 'json') => {
    exportAnalytics(accountId, format);
  };

  if (isLoading && !analytics) {
    return (
      <Container>
        <Title>Analytics</Title>
        <LoadingContainer>
          <LoadingSpinner />
        </LoadingContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Title>WhatsApp Analytics</Title>

      {error && (
        <ErrorMessage>
          {error}
          <button
            onClick={clearError}
            style={{
              marginLeft: '12px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'inherit',
            }}
          >
            ✕
          </button>
        </ErrorMessage>
      )}

      <FilterBar>
        <DatePickerGroup>
          <Label>From:</Label>
          <DateInput type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
        </DatePickerGroup>

        <DatePickerGroup>
          <Label>To:</Label>
          <DateInput type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
        </DatePickerGroup>

        <Button variant="primary" onClick={handleDateRangeChange}>
          Apply Filter
        </Button>

        <Button variant="secondary" onClick={() => handleExport('csv')}>
          Export CSV
        </Button>

        <Button variant="secondary" onClick={() => handleExport('json')}>
          Export JSON
        </Button>
      </FilterBar>

      {analytics &&
        (() => {
          const a = analytics as {
            totalMessages?: number;
            activeConversations?: number;
            avgResponseTime?: string | number;
            deliveryRate?: number;
            messagesByDate?: Array<{ date: string; count: number }>;
            topConversations?: Array<{
              recipientName?: string;
              recipientPhone?: string;
              messageCount?: number;
            }>;
          };
          return (
            <>
              <Grid>
                <Card>
                  <CardTitle>Total Messages</CardTitle>
                  <CardValue>{a.totalMessages || 0}</CardValue>
                  <CardSubtext>
                    <Trend $positive={true}>12.5%</Trend> increase
                  </CardSubtext>
                </Card>

                <Card>
                  <CardTitle>Active Conversations</CardTitle>
                  <CardValue>{a.activeConversations || 0}</CardValue>
                  <CardSubtext>
                    <Trend $positive={true}>8.3%</Trend> increase
                  </CardSubtext>
                </Card>

                <Card>
                  <CardTitle>Avg Response Time</CardTitle>
                  <CardValue>{a.avgResponseTime || '--'}</CardValue>
                  <CardSubtext>Minutes per message</CardSubtext>
                </Card>

                <Card>
                  <CardTitle>Message Delivery Rate</CardTitle>
                  <CardValue>{a.deliveryRate || 0}%</CardValue>
                  <CardSubtext>Successfully delivered</CardSubtext>
                </Card>
              </Grid>

              <ChartContainer>
                <ChartTitle>Messages Over Time</ChartTitle>
                <SimpleChart>
                  {[45, 72, 38, 95, 62, 88, 75].map((value, index) => (
                    <BarGroup key={index}>
                      <Bar height={value} color="#25d366" />
                      <BarLabel>
                        {index === 0
                          ? 'Mon'
                          : index === 1
                            ? 'Tue'
                            : index === 2
                              ? 'Wed'
                              : index === 3
                                ? 'Thu'
                                : index === 4
                                  ? 'Fri'
                                  : index === 5
                                    ? 'Sat'
                                    : 'Sun'}
                      </BarLabel>
                    </BarGroup>
                  ))}
                </SimpleChart>
              </ChartContainer>

              {Array.isArray(a.topConversations) &&
                (
                  a.topConversations as Array<{
                    recipientName?: string;
                    recipientPhone?: string;
                    messageCount?: number;
                  }>
                ).length > 0 && (
                  <TopConversations>
                    <ChartTitle>Top Conversations</ChartTitle>
                    {(
                      a.topConversations as Array<{
                        recipientName?: string;
                        recipientPhone?: string;
                        messageCount?: number;
                      }>
                    ).map((conv, index) => (
                      <ConversationRow key={index}>
                        <ConversationName>
                          {conv.recipientName || conv.recipientPhone}
                        </ConversationName>
                        <ConversationCount>{conv.messageCount} messages</ConversationCount>
                      </ConversationRow>
                    ))}
                  </TopConversations>
                )}
            </>
          );
        })()}
    </Container>
  );
};

