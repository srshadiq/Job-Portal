const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options = { year: "numeric" as const, month: "short" as const };
  return date.toLocaleString("en-US", options);
};

function timeAgo(postedTime: string) {
  const now = new Date();
  const time = new Date(postedTime);
  const seconds = Math.floor((now.getTime() - time.getTime()) / 1000);

  const intervals = {
    year: 31536000, // 60 * 60 * 24 * 365
    month: 2592000, // 60 * 60 * 24 * 30
    day: 86400, // 60 * 60 * 24
    hour: 3600, // 60 * 60
    minute: 60,
    second: 1,
  };

  for (let [key, value] of Object.entries(intervals)) {
    const amount = Math.floor(seconds / value);
    if (amount >= 1) {
      return `${amount} ${key}${amount > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}

const getBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
};

const formateInterviewTime = (dateStr: any) => {
  const date = new Date(dateStr);

  const formattedDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return formattedDate;
};

function openBase64PDF(base64Data: string, mimeType = "application/pdf") {
  const byteCharacters = atob(base64Data);
  const byteArrays = [];

  for (let i = 0; i < byteCharacters.length; i += 512) {
    const slice = byteCharacters.slice(i, i + 512);
    const byteNumbers = new Array(slice.length);
    for (let j = 0; j < slice.length; j++) {
      byteNumbers[j] = slice.charCodeAt(j);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: mimeType });

  const blobUrl = URL.createObjectURL(blob);
  window.open(blobUrl, "_blank");

  setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
}

export { formatDate, timeAgo, getBase64, formateInterviewTime, openBase64PDF };
