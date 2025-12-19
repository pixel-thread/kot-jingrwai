import React, { useEffect, useState } from 'react';
import { OtaUpdateServices } from '~/src/services/update/checkForOtaUpdate';
import { Banner } from './Banner';

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
  const [isShown, setIsShown] = useState(false);
  const Services = testMode ? makeFakeServices(scenario) : OtaUpdateServices;

  const [isOtaUpdate, setIsOtaUpdate] = useState(false);

  const [status, setStatus] = useState<Status>('None');

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
      setIsShown(true);
    } else {
      setIsShown(false);
    }
  }, [isOtaUpdate, status]);

  // Optional auto-hide after terminal states
  useEffect(() => {
    if (status === 'Success' || status === 'Failed' || status === 'Reloading') {
      const t = setTimeout(() => {
        setIsOtaUpdate(false);
      }, 800);
      return () => clearTimeout(t);
    }
  }, [status]);

  return <Banner message={`Update: ${status}`} isShown={isShown} />;
};
