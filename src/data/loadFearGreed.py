import fear_and_greed
import json
from datetime import datetime

index, label, timestamp = fear_and_greed.get()

result = {
    "index": index,
    "label": label,
    "timestamp": timestamp.isoformat()
}

with open("fear-greed.json", "w") as f:
    json.dump(result, f)

print(f"✅ CNN Fear & Greed saved: {result}")