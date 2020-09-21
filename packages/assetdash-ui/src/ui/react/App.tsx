import React, {useEffect} from 'react';
import {hot} from 'react-hot-loader/root';
import '../styles/reset.sass';
import {BrowserRouter as Router} from 'react-router-dom';
import {config} from '../../config/config';
import {HomeWithRouter} from './Home/HomeWithRouter';
import {useScript} from './hooks/useScript';
import {ThemeContextProvider} from './Theme/ThemeContextProvider';

interface AssetDashWindow extends Window {
  OneSignal: any;
  dataLayer: any;
}

declare const window: AssetDashWindow;

const App: React.FC = () => {
  const [oneSignalLoaded] = useScript('https://cdn.onesignal.com/sdks/OneSignalSDK.js');

  useEffect(() => {
    if (!oneSignalLoaded) {
      return;
    }
    window.OneSignal = window.OneSignal || [];
    window.OneSignal.push(function () {
      window.OneSignal.init({
        appId: config.oneSignalAppId
      });
    });
  }, [oneSignalLoaded]);

  useScript(`https://www.googletagmanager.com/gtag/js?id=${config.ga_measurement_id}`);
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push('js', new Date());
  window.dataLayer.push('config', config.ga_measurement_id);

  return (
    <ThemeContextProvider>
      <Router>
        <HomeWithRouter/>
      </Router>
    </ThemeContextProvider>
  );
};

export default hot(App);
