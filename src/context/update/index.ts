import React from 'react';
import { UpdateI } from '~/src/types/Update';

export const UpdateContext = React.createContext<UpdateI | null>(null);
