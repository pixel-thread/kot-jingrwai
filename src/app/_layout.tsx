import '../../global.css';

import { SongProvider } from '../components/Provider/Song';
import { KeyboardAvoidingView, Platform, SafeAreaView, StatusBar } from 'react-native';
import { CustomStack } from '../components/Common/CustomStack';

export default function Layout() {
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-950">
      <StatusBar className="bg-gray-950" barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, paddingTop: 10 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
        <SongProvider>
          <CustomStack />
        </SongProvider>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
