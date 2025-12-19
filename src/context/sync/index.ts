import React from 'react';
import { SyncContextI } from '@src/types/sync';

export const SyncContext = React.createContext<SyncContextI | null>(null);
