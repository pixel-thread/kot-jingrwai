import { SafeAreaView, ViewProps } from 'react-native';
import { cn } from '../libs/cn';

interface ContainerProps extends ViewProps {}
export const Container = ({ children, className }: ContainerProps) => {
  return <SafeAreaView className={cn(className, 'flex flex-1')}>{children}</SafeAreaView>;
};
