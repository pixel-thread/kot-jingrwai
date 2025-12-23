import React from 'react';
import { UpdateContextI } from '~/src/types/Update';

export const UpdateContext = React.createContext<UpdateContextI | null>(null);
