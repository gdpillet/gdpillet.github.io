#!/bin/bash
# Convert ALL remaining PNG images to WebP
# This converts images 11-41 (all remaining PNGs)

echo "🖼️  Converting ALL Remaining Images to WebP"
echo "=========================================="
echo ""

# Check if cwebp is installed
if ! command -v cwebp &> /dev/null; then
    echo "❌ cwebp not found. Please install:"
    echo "  brew install webp"
    exit 1
fi

echo "✅ cwebp found"
echo ""

# Navigate to img directory
cd "$(dirname "$0")/img" || exit 1

# Get all PNG files
png_files=($(ls *.png 2>/dev/null))
total=${#png_files[@]}

if [ $total -eq 0 ]; then
    echo "ℹ️  No PNG files found"
    exit 0
fi

echo "📊 Found $total PNG images"
echo ""

converted=0
skipped=0
total_before=0
total_after=0

for img in "${png_files[@]}"; do
    webp_name="${img%.png}.webp"
    
    # Skip if WebP already exists
    if [ -f "$webp_name" ]; then
        echo "⏭️  $webp_name exists"
        ((skipped++))
        continue
    fi
    
    # Get size before
    size_bytes=$(stat -f%z "$img" 2>/dev/null || stat -c%s "$img" 2>/dev/null)
    total_before=$((total_before + size_bytes))
    
    # Convert with quality 85
    if cwebp -q 85 "$img" -o "$webp_name" > /dev/null 2>&1; then
        size_after=$(stat -f%z "$webp_name" 2>/dev/null || stat -c%s "$webp_name" 2>/dev/null)
        total_after=$((total_after + size_after))
        
        # Format sizes
        size_before_mb=$(echo "scale=1; $size_bytes/1024/1024" | bc)
        size_after_mb=$(echo "scale=1; $size_after/1024/1024" | bc)
        
        if (( $(echo "$size_before_mb >= 1" | bc -l) )); then
            echo "✅ $img (${size_before_mb}MB → ${size_after_mb}MB)"
        else
            size_before_kb=$(echo "scale=0; $size_bytes/1024" | bc)
            size_after_kb=$(echo "scale=0; $size_after/1024" | bc)
            echo "✅ $img (${size_before_kb}KB → ${size_after_kb}KB)"
        fi
        
        ((converted++))
    else
        echo "❌ Failed: $img"
    fi
done

echo ""
echo "=========================================="
echo "📊 Conversion Complete:"
echo "   Total images: $total"
echo "   Converted: $converted"
echo "   Skipped (already WebP): $skipped"
echo ""

if [ $converted -gt 0 ]; then
    total_before_mb=$(echo "scale=1; $total_before/1024/1024" | bc)
    total_after_mb=$(echo "scale=1; $total_after/1024/1024" | bc)
    savings_mb=$(echo "scale=1; $total_before_mb - $total_after_mb" | bc)
    savings_pct=$(echo "scale=0; ($savings_mb / $total_before_mb) * 100" | bc)
    
    echo "💾 Storage Savings:"
    echo "   Before: ${total_before_mb}MB"
    echo "   After: ${total_after_mb}MB"
    echo "   Saved: ${savings_mb}MB (${savings_pct}%)"
    echo ""
    echo "✅ All images converted successfully!"
    echo ""
    echo "📝 Next steps:"
    echo "   1. Test site locally: open index.html"
    echo "   2. Verify all images load correctly"
    echo "   3. (Optional) Delete original PNGs to save space"
    echo "   4. Commit changes: git add . && git commit -m 'Convert images to WebP'"
else
    echo "ℹ️  All images already converted to WebP"
fi

echo ""
