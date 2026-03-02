export async function fetchCryptoSentiment() {
  const res = await fetch("https://api.alternative.me/fng/");
  const json = await res.json();
  const latest = json.data[0];

  return {
    value: Number(latest.value),
    label: latest.value_classification,
  };
}