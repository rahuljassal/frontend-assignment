// Helper functions for percentage visualization
export const calculateProgressWidth = (percentage) => {
  if (percentage <= 0) return 0;
  const logValue = Math.log10(percentage);
  const logMax = Math.log10(28000); // Slightly above max
  return Math.min((logValue / logMax) * 100, 100);
};

export const getPercentageCategory = (percentage) => {
  if (percentage >= 1000) return "super";
  if (percentage >= 100) return "high";
  if (percentage >= 50) return "medium";
  return "low";
};

export const formatPercentage = (percentage) => {
  if (percentage >= 1000) {
    return `${(percentage / 1000).toFixed(1)}k%`;
  }
  return `${percentage}%`;
};
