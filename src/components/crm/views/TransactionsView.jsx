/**
 * TransactionsView — Backward Compatibility Forwarding Bridge
 * Standard: Mary Allen Wilkes Protocol
 *
 * Forwards to the modular TransactionManager layer (< 350 lines).
 */

import React from 'react';
import TransactionManager from '../TransactionManager';

export default function TransactionsView() {
  return <TransactionManager />;
}
