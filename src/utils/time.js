export const timeToMs = (hours, minutes) => ((hours * 60) + minutes) * 60 * 1000;

export const msToTime = (ms) => {
  const milliseconds = parseInt((ms % 1000) / 100);
  const seconds = parseInt((ms / 1000) % 60);
  const minutes = parseInt((ms / (1000 * 60)) % 60);
  const hours = parseInt(ms / (1000 * 60 * 60));
  return {
    hours,
    minutes,
    seconds,
    milliseconds
  };
};

export const msToString = (ms) => {
  const { hours, minutes, seconds } = msToTime(ms);

  if (hours > 0 || minutes > 9) {
    return `${hours}h ${minutes}min ${seconds}s`;
  }
  return `${minutes}m ${seconds}s`;
};
