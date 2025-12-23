import React from 'react';
import { UpdateContext } from '~/src/context/update';

export const useUpdateContext = () => {
  const context = React.useContext(UpdateContext);
  if (!context) {
    throw new Error('useUpdateContext must be used within a UpdateProvider');
  }
  return context;
};
