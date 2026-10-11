from PIL import Image
import os

base_dir = r"S:\Otis Projects\fragrance-dashboard\assets\bottles\user_photos"
out_dir = r"S:\Otis Projects\fragrance-dashboard\assets\bottles\cropped"
os.makedirs(out_dir, exist_ok=True)

# 1. shelf_1_pp_row.jpg (1024, 458)
im1 = Image.open(os.path.join(base_dir, "shelf_1_pp_row.jpg"))
# Navy Intense
im1.crop((0, 0, 245, 458)).save(os.path.join(out_dir, "pp_navy_intense.jpg"), quality=95)
# Intense Aroma Exploding
im1.crop((225, 0, 485, 458)).save(os.path.join(out_dir, "pp_intense_aroma_exploding.jpg"), quality=95)
# Intenso Water
im1.crop((480, 0, 680, 458)).save(os.path.join(out_dir, "pp_intenso_water.jpg"), quality=95)
# Particle ISO E-Super
im1.crop((660, 0, 875, 458)).save(os.path.join(out_dir, "pp_particle.jpg"), quality=95)

# 2. shelf_2_tf_dg.jpg (1024, 458)
im2 = Image.open(os.path.join(base_dir, "shelf_2_tf_dg.jpg"))
# Tom Ford Noir Extreme
im2.crop((370, 0, 740, 458)).save(os.path.join(out_dir, "tf_noir_extreme.jpg"), quality=95)
# Dolce & Gabbana The One
im2.crop((660, 0, 1024, 458)).save(os.path.join(out_dir, "dg_the_one.jpg"), quality=95)

# 3. shelf_3_laya_voux.jpg (1024, 458)
im3 = Image.open(os.path.join(base_dir, "shelf_3_laya_voux.jpg"))
# Laya
im3.crop((0, 0, 270, 458)).save(os.path.join(out_dir, "laya_edp.jpg"), quality=95)
# Tom Ford Oud Wood Body Spray
im3.crop((220, 0, 460, 458)).save(os.path.join(out_dir, "tf_oud_wood_spray.jpg"), quality=95)
# Voux Elegante
im3.crop((460, 0, 740, 458)).save(os.path.join(out_dir, "voux_elegante.jpg"), quality=95)
# Wood Miracle
im3.crop((690, 100, 930, 458)).save(os.path.join(out_dir, "pp_wood_miracle.jpg"), quality=95)

# 4. shelf_4_lynx_oud.jpg (455, 1024)
im4 = Image.open(os.path.join(base_dir, "shelf_4_lynx_oud.jpg"))
im4.crop((60, 120, 410, 680)).save(os.path.join(out_dir, "lynx_oud_vanilla.jpg"), quality=95)

# 5. shelf_5_aftereffect_bbw.jpg (1024, 458)
im5 = Image.open(os.path.join(base_dir, "shelf_5_aftereffect_bbw.jpg"))
# Mahogany Woods BBW
im5.crop((50, 0, 310, 458)).save(os.path.join(out_dir, "bbw_mahogany_woods.jpg"), quality=95)
# After Effect FA Paris
im5.crop((290, 0, 550, 458)).save(os.path.join(out_dir, "after_effect_fa_paris.jpg"), quality=95)
# Sweet Water PP
im5.crop((540, 100, 690, 458)).save(os.path.join(out_dir, "pp_sweet_water.jpg"), quality=95)

print("Successfully cropped all user bottles into:", out_dir)
