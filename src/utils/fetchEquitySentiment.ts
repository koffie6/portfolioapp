export async function fetchEquitySentiment(): Promise<{ value: number; label: string }> {
  // Static fallback from feargreedmeter.com
  return { value: 38, label: "Fear" };
}