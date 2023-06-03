const getStatus = (statusData) => {
  switch (statusData) {
    case "in_stock":
      return "In Stock";

    case "out_off_stock":
      return "Out Off Stock";

    case "limited_available":
      return "Limited Available";
    default:
      return "";
  }
};

export default getStatus;
