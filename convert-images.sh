#!/bin/bash
# WebP Conversion Script for Portfolio Images
# Converts top 10 largest PNG images to WebP format

echo "🖼️  WebP Image Conversion Script"
echo "================================"
echo ""

# Check if cwebp is installed
if ! command -v cwebp &> /dev/null; then
    echo "❌ cwebp not found. Installing..."
    echo ""
    echo "Please run ONE of these commands:"
    echo ""
    echo "Option 1 - Install Homebrew (if not installed):"
    echo '  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"'
    echo ""
    echo "Option 2 - Then install webp tools:"
    echo "  brew install webp"
    echo ""
    echo "Option 3 - Or use MacPorts:"
    echo "  sudo port install webp"
    echo ""
    exit 1
fi

echo "✅ cwebp found at: $(which cwebp)"
echo ""

# Navigate to img directory
cd "$(dirname "$0")/img" || exit 1

# Array of top 10 largest images to convert
images=(
    "ibancar-heatmap.png"
    "ibancar-final.png"
    "ibancar-phones.png"
    "thg-guide.png"
    "byokmac2.png"
    "nick-spongebob2.png"
    "byok-competitive-analysis.png"
    "quantum-leap.png"
    "nick-spongebob.png"
    "thg-lifecycle1.png"
)

total=${#images[@]}
converted=0
skipped=0
failed=0

echo "Converting $total images..."
echo ""

for img in "${images[@]}"; do
    if [ ! -f "$img" ]; then
        echo "⚠️  $img not found, skipping"
        ((failed++))
        continue
    fi
    
    webp_name="${img%.png}.webp"
    
    if [ -f "$webp_name" ]; then
        echo "⏭️  $webp_name already exists, skipping"
        ((skipped++))
        continue
    fi
    
    # Get original size
    size_before=$(du -h "$img" | awk '{print $1}')
    
    # Convert with quality 85 (good balance between size and quality)
    if cwebp -q 85 "$img" -o "$webp_name" > /dev/null 2>&1; then
        size_after=$(du -h "$webp_name" | awk '{print $1}')
        echo "✅ $img ($size_before) → $webp_name ($size_after)"
        ((converted++))
    else
        echo "❌ Failed to convert $img"
        ((failed++))
    fi
done

echo ""
echo "================================"
echo "📊 Conversion Summary:"
echo "   Converted: $converted"
echo "   Skipped: $skipped"
echo "   Failed: $failed"
echo ""

if [ $converted -gt 0 ]; then
    echo "✅ Success! Your images are now WebP-ready."
    echo ""
    echo "📝 Next steps:"
    echo "   1. Test the site locally"
    echo "   2. Verify images load correctly"
    echo "   3. Consider deleting old PNG files (or keep as backup)"
    echo "   4. Commit and push to GitHub"
    echo ""
    
    # Calculate total savings
    echo "💾 Storage savings estimate:"
    du -sh *.webp 2>/dev/null | awk '{sum+=$1} END {print "   WebP total: " sum}'
    total_png_size=0
    for img in "${images[@]}"; do
        if [ -f "$img" ]; then
            du -b "$img" | awk '{sum+=$1} END {printf "   PNG total: %.1fMB\n", sum/(1024*1024)}'
        fi
    done
fi

echo ""
echo "🚀 Performance tip: Images now have lazy loading enabled!"
echo "   This means they'll only load when scrolled into view."
