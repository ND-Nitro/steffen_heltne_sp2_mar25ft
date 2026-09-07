export function getCurrentBid(listing) {
  const bids = listing.bids || [];

  if (bids.length === 0) {
    return 0;
  }

  return Math.max(...bids.map((bid) => bid.amount));
}

export function getTimeLeft(endsAt) {
  const endTime = new Date(endsAt).getTime();
  const now = Date.now();

  const difference = endTime - now;

  if (difference <= 0) {
    return {
      ended: true,
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
      short: "Ended",
    };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));

  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);

  const minutes = Math.floor((difference / (1000 * 60)) % 60);

  const seconds = Math.floor((difference / 1000) % 60);

  return {
    ended: false,
    days: String(days).padStart(2, "0"),
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
    short: `${days}d ${hours}h ${minutes}m left`,
  };
}
