

const getReadableDate = (sampleDate) => {
    const date = new Date(sampleDate);

    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric", // Full year (4 digits)
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    // Format the date
    const formattedDate = date.toLocaleDateString("en-GB", options);

    return formattedDate;
  };

  export default getReadableDate;