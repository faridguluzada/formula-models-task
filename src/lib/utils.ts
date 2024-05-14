export const formatCurrentDate = () =>
  new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
  });
