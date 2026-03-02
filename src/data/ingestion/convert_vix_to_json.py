import csv
import json
from pathlib import Path

# Paths
raw_csv = Path(__file__).parent / "../raw/vix-daily.csv"
output_json = Path(__file__).parent / "../processed/vix-daily.json"

def convert_vix_csv_to_json():
    records = []
    with open(raw_csv, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            try:
                records.append({
                    "date": row["Date"],
                    "open": float(row["Open"]),
                    "high": float(row["High"]),
                    "low": float(row["Low"]),
                    "close": float(row["Close"])
                })
            except ValueError:
                # Skip rows with invalid numeric values
                continue

    with open(output_json, "w", encoding="utf-8") as out:
        json.dump(records, out, indent=2)

    print(f"✅ VIX data converted: {len(records)} records saved to {output_json}")

if __name__ == "__main__":
    convert_vix_csv_to_json()