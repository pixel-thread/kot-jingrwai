import '../../global.css';

import { SongProvider } from '../components/Provider/Song';
import { KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { CustomStack } from '../components/Common/CustomStack';

export default function Layout() {
  return (
    <SafeAreaView className="flex-1 bg-white">
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
