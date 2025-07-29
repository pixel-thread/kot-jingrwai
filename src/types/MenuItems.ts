import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export type MenuItemsT = {
  id: number;
  title: string;
  herf: string;
  icon: React.ComponentProps<typeof FontAwesome>['name'];
};
