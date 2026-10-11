from PIL import Image
import os

STUDIO_DIR = os.path.join(os.path.dirname(__file__), '..', 'assets', 'bottles', 'studio')
TARGET_WIDTH = 375
TARGET_HEIGHT = 500

def fit_on_white_canvas(img, target_w=375, target_h=500, padding_ratio=0.08):
    """
    Fits an image onto a pure white canvas (375x500), keeping aspect ratio
    and adding slight padding so the bottle doesn't touch the borders.
    """
    if img.mode != 'RGB':
        img = img.convert('RGB')
    
    # Calculate available space
    avail_w = int(target_w * (1 - 2 * padding_ratio))
    avail_h = int(target_h * (1 - 2 * padding_ratio))
    
    w_percent = avail_w / float(img.size[0])
    h_percent = avail_h / float(img.size[1])
    scale = min(w_percent, h_percent)
    
    new_w = int(img.size[0] * scale)
    new_h = int(img.size[1] * scale)
    
    resized = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
    
    # Create white canvas
    canvas = Image.new('RGB', (target_w, target_h), (255, 255, 255))
    offset_x = (target_w - new_w) // 2
    offset_y = (target_h - new_h) // 2
    
    canvas.paste(resized, (offset_x, offset_y))
    return canvas

def process_images():
    tasks = [
        # (source_file, target_name)
        ('voux_perfumebox.jpg', 'voux_elegante.jpg'),
        ('mandarin_cultbeauty.jpg', 'molecule_01_mandarin.jpg'),
        ('molecule_02_real.jpg', 'molecule_02.jpg'),
        ('tf_spray_nordstrom.jpg', 'tf_oud_wood.jpg'),
        ('lynx_soap.jpg', 'lynx_oud_vanilla.jpg')
    ]
    
    for src, dest_name in tasks:
        src_path = os.path.join(os.path.dirname(__file__), '..', src)
        dest_path = os.path.join(STUDIO_DIR, dest_name)
        
        if not os.path.exists(src_path):
            print(f"Error: {src_path} not found")
            continue
            
        im = Image.open(src_path)
        processed = fit_on_white_canvas(im, TARGET_WIDTH, TARGET_HEIGHT)
        processed.save(dest_path, 'JPEG', quality=95)
        print(f"Successfully processed {dest_name}: {processed.size}")

if __name__ == '__main__':
    process_images()
