export function formatDate(date) {
  const string = (new Date(date)).toLocaleString("en-us", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });

  const [m, d, a] = string.split(" ");
  return d.split(",")[0] + " " + m + ", " + a;
}

export function convertTime(time) {
    const h = Math.floor(time / 3600);
    const m = Math.floor((time % 3600) / 60);
    const s = time % 60;

    const str = [h, m, s]
    .map(unit => String(unit).padStart(2, '0')).join(':');

    return str;
}
