import {Dimensions, Platform, PixelRatio} from 'react-native';

export default class DeviceHelper {
  // Check condition for iPhoneX along with iPhone XS and iPhone S Max
  static isIphoneX() {
    let {height, width} = Dimensions.get('window');
    return (
      Platform.OS === 'ios' &&
      !Platform.isPad &&
      (height >= 812 || width >= 812)
    );
  }

  //iPhone X condition helper
  static ifIphoneX(iphoneXStyle, regularStyle) {
    return this.isIphoneX() ? iphoneXStyle : regularStyle;
  }

  //Status bar height
  static getStatusBarHeight() {
    return Platform.select({
      ios: this.ifIphoneX(44, 20),
      android: 0,
    });
  }
}
