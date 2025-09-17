import { useTheme } from "../../config/hooks/useTheme.jsx";

const TopBar = () => {
  const { colors } = useTheme();
  
  return (
    <div 
      className={`w-full py-1 flex justify-center ${colors.topheader.background} ${colors.topheader.text}`}
    >
      <h1>Summer Sale: 20% OFF! Use code: r@dheva</h1>
    </div>
  );
};

export default TopBar;