import { Dimensions } from 'react-native';

const isTablet = () => {
  const { width, height } = Dimensions.get('window');
  const aspectRatio = height / width;

  // Establece un umbral para determinar si es una tablet
  const isTablet = aspectRatio < 1.6;

  return isTablet;
};

export default isTablet;
