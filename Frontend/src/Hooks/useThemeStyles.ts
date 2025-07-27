import { useTheme } from "../Context/ThemeContext";

export const useThemeStyles = () => {
  const { isDarkMode } = useTheme();

  const getThemeClasses = (lightClasses: string, darkClasses: string) => {
    return isDarkMode ? darkClasses : lightClasses;
  };

  const getPageBackground = () => {
    return isDarkMode ? "bg-darkColor-950" : "bg-gray-50";
  };

  const getCardBackground = () => {
    return isDarkMode ? "bg-mine-shaft-900" : "bg-white";
  };

  const getTextColor = () => {
    return isDarkMode ? "text-mine-shaft-100" : "text-gray-900";
  };

  const getSecondaryTextColor = () => {
    return isDarkMode ? "text-mine-shaft-300" : "text-gray-600";
  };

  const getBorderColor = () => {
    return isDarkMode ? "border-mine-shaft-700" : "border-gray-200";
  };

  const getHoverColor = () => {
    return isDarkMode ? "hover:bg-mine-shaft-800" : "hover:bg-gray-100";
  };

  return {
    isDarkMode,
    getThemeClasses,
    getPageBackground,
    getCardBackground,
    getTextColor,
    getSecondaryTextColor,
    getBorderColor,
    getHoverColor,
  };
};
