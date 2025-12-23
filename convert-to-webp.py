#!/usr/bin/env python3
"""
Convert PNG images to WebP format using Python's built-in libraries
This is a fallback when webp tools aren't available
"""
import subprocess
import sys
import os

def convert_with_sips_alternative(png_file, webp_file, quality=85):
    """Try alternative conversion methods"""
    
    # Method 1: Try with sips using different syntax
    try:
        cmd = ['sips', '-s', 'format', 'webp', png_file, '-o', webp_file]
        result = subprocess.run(cmd, capture_output=True, text=True)
        if result.returncode == 0 and os.path.exists(webp_file):
            return True
    except:
        pass
    
    # Method 2: Try ffmpeg if available
    try:
        cmd = ['ffmpeg', '-i', png_file, '-c:v', 'libwebp', '-quality', str(quality), webp_file, '-y']
        result = subprocess.run(cmd, capture_output=True, text=True, stderr=subprocess.DEVNULL)
        if result.returncode == 0 and os.path.exists(webp_file):
            return True
    except:
        pass
    
    return False

def main():
    images = [
        'ibancar-heatmap.png',
        'ibancar-final.png',
        'ibancar-phones.png',
        'thg-guide.png',
        'byokmac2.png',
        'nick-spongebob2.png',
        'byok-competitive-analysis.png',
        'quantum-leap.png',
        'nick-spongebob.png',
        'thg-lifecycle1.png'
    ]
    
    img_dir = '/Users/gastonpillet/Documents/gdpillet.github.io/img'
    os.chdir(img_dir)
    
    converted = 0
    failed = []
    
    for img in images:
        if not os.path.exists(img):
            print(f"⚠️  {img} not found")
            continue
            
        webp_name = img.replace('.png', '.webp')
        
        if os.path.exists(webp_name):
            print(f"✓ {webp_name} already exists")
            converted += 1
            continue
        
        print(f"Converting {img}...", end=' ')
        
        if convert_with_sips_alternative(img, webp_name):
            size_before = os.path.getsize(img) / (1024 * 1024)
            size_after = os.path.getsize(webp_name) / (1024 * 1024)
            savings = ((size_before - size_after) / size_before) * 100
            print(f"✓ ({size_before:.1f}MB → {size_after:.1f}MB, {savings:.0f}% smaller)")
            converted += 1
        else:
            print("✗ Failed")
            failed.append(img)
    
    print(f"\n{'='*60}")
    print(f"Converted: {converted}/{len(images)}")
    if failed:
        print(f"Failed: {', '.join(failed)}")
        print("\nTo install webp tools:")
        print("  /bin/bash -c \"$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\"")
        print("  brew install webp")
    
    return 0 if not failed else 1

if __name__ == '__main__':
    sys.exit(main())
