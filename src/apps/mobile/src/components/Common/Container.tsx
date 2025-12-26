import { SafeAreaView, ViewProps } from 'react-native';
import { cn } from '../../libs/cn';
import { ReactNode } from 'react';

interface ContainerProps extends ViewProps {
  children: ReactNode;
}
export const Container = ({ children, className }: ContainerProps) => {
  return (
    <SafeAreaView className={cn(className, 'flex flex-1 bg-gray-200 dark:bg-gray-900')}>
      {children}
    </SafeAreaView>
  );
};
