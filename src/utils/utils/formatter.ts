const formatDate = (date: Date) => {
  return `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}`;
};

const formatRelativeTime = (date: Date) => {
  try {
    let currentTime = new Date();
    let past = date;

    function daysDiff() {
      let days = Math.ceil(
        (past.getTime() - currentTime.getTime()) / 1000 / 60 / 60 / 24
      );
      return days;
    }

    function hoursDiff() {
      let expireTime = past;
      let hours = Math.ceil(
        (expireTime.getTime() - currentTime.getTime()) / 1000 / 60 / 60
      );
      return hours;
    }

    function minutesDiff() {
      let expireTime = past;
      let hours = Math.ceil(
        (expireTime.getTime() - currentTime.getTime()) / 1000 / 60
      );
      return hours;
    }

    const formatter = new Intl.RelativeTimeFormat("id", {
      numeric: "auto",
    });

    if (date.getDate() === new Date().getDate()) {
      // "3 minutes ago"
      if (date.getHours() === new Date().getHours()) {
        return formatter.format(minutesDiff(), "minutes");
      } else {
        // "3 hours ago"
        return formatter.format(hoursDiff(), "hours");
      }
    } else {
      // "3 days ago"
      return formatter.format(daysDiff(), "days");
    }
  } catch (error) {
    console.log(error);
    return formatDate(date);
  }
};

const formatCurrency = (currency: number) => {
  try {
    const formatter = new Intl.NumberFormat("id", {
      currency: "IDR",
      style: "currency",
      maximumFractionDigits: 0,
    });
    return formatter.format(currency);
  } catch (e) {
    return `Rp ${currency}`;
  }
};

export { formatDate, formatRelativeTime, formatCurrency };
