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

/**
 * Takes a Firebase Authentication error and extracts the error code from it.
 * The error code is then formatted into a user-friendly message.
 * @param {Error} error The error message from Firebase Authentication
 * @returns {string} A user-friendly error message
 *
 * @example
 * const error = "[FirebaseError: Firebase: Error (auth/email-already-in-use).]";
 * const userFriendlyMessage = formatFirebaseAuthError(error);
 * console.log(userFriendlyMessage); // "Email already in use."
 */
function formatFirebaseAuthError(error: Error): string {
  // Extract the error code
  const match = error.message.match(/\(auth\/(.*?)\)/);
  const errorCode = match ? match[1] : "unknown-error";

  // Format the error code into a user-friendly message
  const sentence = errorCode.replace(/-/g, " ").toLowerCase(); // Convert to lowercase and replace hyphens
  return sentence.charAt(0).toUpperCase() + sentence.slice(1) + "."; // Capitalize the first letter
}

export {
  formatDate,
  formatRelativeTime,
  formatCurrency,
  formatFirebaseAuthError,
};
