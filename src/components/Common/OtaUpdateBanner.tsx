import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Reanimated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Text } from '../ui/typography';
import { OtaUpdateServices } from '~/src/services/update/checkForOtaUpdate';
import { cn } from '~/src/libs/cn';

type Status =
  | 'Checking'
  | 'Available'
  | 'Downloading'
  | 'Installing'
  | 'Success'
  | 'Reloading'
  | 'Failed'
  | 'None';

type TestScenario = 'success' | 'fail' | 'none';

type Props = {
  testMode?: boolean;
  scenario?: TestScenario;
};

const makeFakeServices = (scenario: TestScenario) => ({
  async checkForOtaUpdate() {
    await new Promise((r) => setTimeout(r, 500));
    return scenario === 'success' || scenario === 'fail';
  },
  async applyOtaUpdate() {
    await new Promise((r) => setTimeout(r, 1500));
    if (scenario === 'fail') {
      throw new Error('Simulated OTA failure');
    }
    // In real mode this service should call Updates.reloadAsync() when ready. [web:12][web:18]
  },
});

export const OtaUpdateBanner: React.FC<Props> = ({ testMode = false, scenario = 'success' }) => {
  const [isInitialMount, setIsInitialMount] = useState(true);
  const Services = testMode ? makeFakeServices(scenario) : OtaUpdateServices;

  const [isOtaUpdate, setIsOtaUpdate] = useState(false);

  const [status, setStatus] = useState<Status>('None');

  const height = useSharedValue(0);

  const opacity = useSharedValue(0);

  const containerStyle = useAnimatedStyle(() => ({
    height: height.value,
    opacity: opacity.value,
  }));

  function showBanner() {
    height.value = withTiming(32, {
      duration: 250,
      easing: Easing.out(Easing.cubic),
    });
    opacity.value = withTiming(1, {
      duration: 250,
      easing: Easing.out(Easing.cubic),
    });
  }

  function hideBanner() {
    opacity.value = withTiming(0, {
      duration: 150,
      easing: Easing.out(Easing.cubic),
    });
    height.value = withTiming(0, {
      duration: 200,
      easing: Easing.out(Easing.cubic),
    });
  }

  async function installUpdate() {
    setStatus('Installing');
    try {
      await Services.applyOtaUpdate();
      setStatus('Reloading');
      setIsOtaUpdate(false);
    } catch (e) {
      console.log(e);
      setStatus('Failed');
    } finally {
      setIsInitialMount(false);
    }
  }

  async function downloadUpdate() {
    try {
      setStatus('Downloading');
      await installUpdate();
    } catch (error) {
      console.log(error);
      setStatus('Failed');
    }
  }

  async function checkUpdate() {
    try {
      setStatus('Checking');
      const isOtaUpdateAvailable = await Services.checkForOtaUpdate();
      if (isOtaUpdateAvailable) {
        setIsOtaUpdate(true);
        setStatus('Available');
        await downloadUpdate();
      } else {
        setIsOtaUpdate(false);
        setStatus('None');
      }
    } catch (error) {
      console.log(error);
      setStatus('Failed');
      setIsOtaUpdate(false);
    }
  }

  useEffect(() => {
    if (isInitialMount) {
      checkUpdate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Drive animation from state
  useEffect(() => {
    const shouldShow =
      isOtaUpdate ||
      status === 'Checking' ||
      status === 'Downloading' ||
      status === 'Installing' ||
      status === 'Reloading';

    if (shouldShow) {
      showBanner();
    } else {
      hideBanner();
    }
  }, [isOtaUpdate, status]);

  // Optional auto-hide after terminal states
  useEffect(() => {
    if (status === 'Success' || status === 'Failed' || status === 'Reloading') {
      const t = setTimeout(() => {
        setIsOtaUpdate(false);
        hideBanner();
      }, 800);
      return () => clearTimeout(t);
    }
  }, [status]);

  const isVisible =
    isOtaUpdate ||
    status === 'Checking' ||
    status === 'Downloading' ||
    status === 'Installing' ||
    status === 'Reloading' ||
    status === 'Success' ||
    status === 'Failed';

  if (!isVisible) {
    return null;
  }

  return (
    <Reanimated.View className="w-full">
      <Reanimated.View
        style={containerStyle}
        className={cn('items-center justify-center', 'bg-indigo-500 dark:bg-indigo-900')}>
        <View className="flex-1 items-center justify-center px-3">
          <Text weight="medium" className="text-center text-white">
            Update: {status}
          </Text>
        </View>
      </Reanimated.View>
    </Reanimated.View>
  );
};
