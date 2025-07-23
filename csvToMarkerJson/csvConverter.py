import csv
import json
import os
import re
import unicodedata
from googletrans import Translator

csv_file = "csv_sitiosjap.csv"
output_folder = "jsons"
os.makedirs(output_folder, exist_ok=True)

translator = Translator()

def slugify(text):
    text = unicodedata.normalize('NFKD', text).encode('ascii', 'ignore').decode('ascii')
    text = text.lower().replace(" ", "-")
    text = re.sub(r"[^a-z0-9\-]", "-", text)
    text = re.sub(r"-{2,}", "-", text)
    return text.strip("-")

def translate_if_needed(original):
    # Si ya es ASCII (romaji, español, inglés), usarlo directamente
    if original.isascii():
        return slugify(original)

    # Si contiene caracteres no ASCII, intenta traducir
    try:
        translated = translator.translate(original, src='ja', dest='en').text
        return slugify(translated)
    except Exception as e:
        print(f"⚠️ Error traduciendo '{original}': {e}")
        return "unknown"

processed_count = 0
failed_rows = []

with open(csv_file, newline='', encoding='utf-8') as f:
    reader = csv.DictReader(f, delimiter=';')
    for row in reader:
        try:
            city_slug = translate_if_needed(row["City"])
            title_slug = translate_if_needed(row["Title"])
            full_id = f"{city_slug}_{title_slug}"

            combined_description = row["Description"].strip()
            if row["Comments"].strip():
                combined_description += ". " + row["Comments"].strip()

            data = {
                "id": full_id,
                "title": row["Title"],
                "description": combined_description,
                "image": f"/images/{title_slug}.jpg",
                "lat": float(row["lat"]),
                "lng": float(row["lng"]),
                "type": row["Type"].lower()
            }

            filename = f"{full_id}.json"
            filepath = os.path.join(output_folder, filename)

            if os.path.exists(filepath):
                print(f"⚠️ Aviso: El archivo '{filename}' ya existe y será sobrescrito.")

            with open(filepath, 'w', encoding='utf-8') as json_file:
                json.dump(data, json_file, ensure_ascii=False, indent=2)

            processed_count += 1
            print(f"✅ Procesado: {filename}")

        except Exception as e:
            failed_rows.append(row)
            print(f"❌ Error al procesar fila: {row}")
            print(f"   ➤ Error: {e}")

# Contar archivos .json generados en la carpeta de salida
generated_files = [f for f in os.listdir(output_folder) if f.endswith('.json')]
total_files = len(generated_files)

print(f"\n🔄 Total procesados en esta ejecución: {processed_count}")
print(f"📁 Total de archivos JSON en '{output_folder}': {total_files}")

if failed_rows:
    print(f"\n⚠️ Hubo {len(failed_rows)} errores:")
    for r in failed_rows:
        print(f"   - Ciudad: {r['City']}, Título: {r['Title']}")

    # Guardar errores en CSV para revisión
    error_csv = "errores.csv"
    with open(error_csv, 'w', newline='', encoding='utf-8') as ef:
        fieldnames = failed_rows[0].keys()
        writer = csv.DictWriter(ef, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(failed_rows)
    print(f"\n📂 Errores guardados en '{error_csv}'")
else:
    print("✅ Todas las filas se procesaron sin errores.")
