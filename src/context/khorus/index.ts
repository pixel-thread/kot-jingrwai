import React from 'react';
import { KhorusContextT } from '~/src/types/khorus';

export const KhorusContext = React.createContext<KhorusContextT | null>(null);
