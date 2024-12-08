import requests
import os
import json
from urllib.parse import urlparse, parse_qs

# Remplacez par votre clé API YouTube
API_KEY = "YOUR_API_KEY"

# Liste des YouTubeurs
youtubers = [
    {"name": "LeoDuff", "url": "https://www.youtube.com/@LeoDuff"},
    {"name": "JohanSolutionsDigitales", "url": "https://www.youtube.com/@johansolutionsdigitales"},
    {"name": "Underscore", "url": "https://www.youtube.com/@Underscore_"},
    {"name": "TechWithTim", "url": "https://www.youtube.com/@TechWithTim"},
    {"name": "YassIA", "url": "https://www.youtube.com/@Yass-IA"},
    {"name": "NoCodeSkills", "url": "https://www.youtube.com/@nocodeskills"},
    {"name": "ExplorIA", "url": "https://www.youtube.com/@Explor_IA"},
    {"name": "IciAmyPlant", "url": "https://www.youtube.com/@iciamyplant"},
    {"name": "ShubhamSharma", "url": "https://www.youtube.com/@Shubham_Sharma"},
    {"name": "CodeRocks", "url": "https://www.youtube.com/@CodeRocks"},
    {"name": "PierrickChevallier", "url": "https://www.youtube.com/@pierrickchevallier"},
    {"name": "LudovicSalenne", "url": "https://www.youtube.com/@LudovicSalenne"},
    {"name": "CodeConcept", "url": "https://www.youtube.com/@codeconcept"},
    {"name": "ElliottPierret", "url": "https://www.youtube.com/@elliottpierret"},
    {"name": "CodeAndBird", "url": "https://www.youtube.com/@codeandbird"},
    {"name": "UndergroundIA", "url": "https://www.youtube.com/@UndergroundIA"},
    {"name": "AiWarehouse", "url": "https://www.youtube.com/@aiwarehouse"},
    {"name": "AiLixyr", "url": "https://www.youtube.com/@AiLixyr"},
    {"name": "AiForDevs", "url": "https://www.youtube.com/@ai-for-devs"},
    {"name": "DigitalSuccessAI", "url": "https://www.youtube.com/@DigitalSuccessAI"}
]

# Créer le dossier pour les images si il n'existe pas
output_dir = "../src/assets/youtubers"
os.makedirs(output_dir, exist_ok=True)

def get_channel_id(custom_url):
    # Extraire le nom d'utilisateur de l'URL
    username = custom_url.split('@')[1] if '@' in custom_url else custom_url
    
    # Rechercher la chaîne par nom d'utilisateur
    search_url = f"https://www.googleapis.com/youtube/v3/search?part=snippet&q={username}&type=channel&key={API_KEY}"
    response = requests.get(search_url)
    
    if response.status_code == 200:
        data = response.json()
        if data['items']:
            return data['items'][0]['id']['channelId']
    return None

def download_avatar(channel_id, name):
    # Obtenir les détails de la chaîne
    url = f"https://www.googleapis.com/youtube/v3/channels?part=snippet&id={channel_id}&key={API_KEY}"
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        if data['items']:
            avatar_url = data['items'][0]['snippet']['thumbnails']['high']['url']
            
            # Télécharger l'image
            img_response = requests.get(avatar_url)
            if img_response.status_code == 200:
                file_path = os.path.join(output_dir, f"{name}.jpg")
                with open(file_path, 'wb') as f:
                    f.write(img_response.content)
                print(f"Image téléchargée pour {name}")
                return True
    
    print(f"Erreur lors du téléchargement de l'image pour {name}")
    return False

def main():
    for youtuber in youtubers:
        print(f"Traitement de {youtuber['name']}...")
        channel_id = get_channel_id(youtuber['url'])
        if channel_id:
            download_avatar(channel_id, youtuber['name'])
        else:
            print(f"Impossible de trouver l'ID de la chaîne pour {youtuber['name']}")

if __name__ == "__main__":
    if API_KEY == "YOUR_API_KEY":
        print("Veuillez remplacer 'YOUR_API_KEY' par votre clé API YouTube Data v3")
    else:
        main()
