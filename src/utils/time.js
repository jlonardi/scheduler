export const timeToMs = (hours, minutes) => ((hours * 60) + minutes) * 60 * 1000;

export const msToTime = (ms) => {
  let milliseconds = parseInt((ms % 1000) / 100);
  let seconds = parseInt((ms / 1000) % 60);
  let minutes = parseInt((ms / (1000 * 60)) % 60);
  let hours  = parseInt((ms / (1000 * 60 * 60)) % 24);
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
    return `${hours}h ${minutes % 60}min`;
  }
  return `${minutes}m ${seconds % 60}s`;
};
