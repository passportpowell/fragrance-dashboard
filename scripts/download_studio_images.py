import os
import urllib.request

STUDIO_DIR = os.path.join(os.path.dirname(__file__), '..', 'assets', 'bottles', 'studio')
os.makedirs(STUDIO_DIR, exist_ok=True)

IMAGES = {
    "after_effect_fa_paris.jpg": "https://fimgs.net/mdimg/perfume-thumbs/375x500.94703.jpg",
    "initio_side_effect.jpg": "https://fimgs.net/mdimg/perfume-thumbs/375x500.42260.jpg",
    "bdc_edp.jpg": "https://fimgs.net/mdimg/perfume-thumbs/375x500.25967.jpg",
    "voux_elegante.jpg": "https://fimgs.net/mdimg/perfume-thumbs/375x500.81232.jpg",
    "xerjoff_naxos.jpg": "https://fimgs.net/mdimg/perfume-thumbs/375x500.30529.jpg",
    "tf_noir_extreme.jpg": "https://fimgs.net/mdimg/perfume-thumbs/375x500.29675.jpg",
    "spicebomb_extreme.jpg": "https://fimgs.net/mdimg/perfume-thumbs/375x500.30499.jpg",
    "neemah_laya.jpg": "https://fimgs.net/mdimg/perfume-thumbs/375x500.28337.jpg",
    "mancera_cedrat_boise.jpg": "https://fimgs.net/mdimg/perfume-thumbs/375x500.15211.jpg",
    "molecule_01.jpg": "https://fimgs.net/mdimg/perfume-thumbs/375x500.845.jpg",
    "molecule_01_mandarin.jpg": "https://fimgs.net/mdimg/perfume-thumbs/375x500.66318.jpg",
    "adg_profondo.jpg": "https://fimgs.net/mdimg/perfume-thumbs/375x500.59532.jpg",
    "adg_profumo.jpg": "https://fimgs.net/mdimg/perfume-thumbs/375x500.29727.jpg",
    "dg_the_one_edp.jpg": "https://fimgs.net/mdimg/perfume-thumbs/375x500.31909.jpg",
    "tf_oud_wood.jpg": "https://fimgs.net/mdimg/perfume-thumbs/375x500.1826.jpg",
    "bbw_mahogany_woods.jpg": "https://fimgs.net/mdimg/perfume-thumbs/375x500.32772.jpg",
    "lynx_oud_vanilla.jpg": "https://www.superdrug.com/medias/sys_master/prd-images/h09/h40/10373535924254/prd-ls4-619003_195x195/prd-ls4-619003-195x195.jpg",
    "pdm_layton.jpg": "https://fimgs.net/mdimg/perfume-thumbs/375x500.39314.jpg",
    "tf_lost_cherry.jpg": "https://fimgs.net/mdimg/perfume-thumbs/375x500.51411.jpg",
    "tf_tobacco_vanille.jpg": "https://fimgs.net/mdimg/perfume-thumbs/375x500.1825.jpg",
    "kilian_black_phantom.jpg": "https://fimgs.net/mdimg/perfume-thumbs/375x500.43632.jpg",
    "molecule_02.jpg": "https://fimgs.net/mdimg/perfume-thumbs/375x500.846.jpg"
}

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'}

for filename, url in IMAGES.items():
    filepath = os.path.join(STUDIO_DIR, filename)
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = resp.read()
            with open(filepath, 'wb') as f:
                f.write(data)
            print(f"SUCCESS: {filename} ({len(data)} bytes)")
    except Exception as e:
        print(f"FAILED: {filename} from {url} - {e}")
