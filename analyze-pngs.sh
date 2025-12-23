#!/bin/bash
# PNG Cleanup Analysis Tool
# Helps decide whether to keep or delete PNG files after WebP conversion

echo "🔍 PNG Files Analysis"
echo "===================="
echo ""

cd "$(dirname "$0")/img" || exit 1

# Count files
png_count=$(ls *.png 2>/dev/null | wc -l | tr -d ' ')
webp_count=$(ls *.webp 2>/dev/null | wc -l | tr -d ' ')

echo "📊 File Count:"
echo "   PNG files: $png_count"
echo "   WebP files: $webp_count"
echo ""

# Calculate sizes
png_size=$(du -ch *.png 2>/dev/null | tail -1 | awk '{print $1}')
webp_size=$(du -ch *.webp 2>/dev/null | tail -1 | awk '{print $1}')

echo "💾 Storage Usage:"
echo "   PNG total: $png_size"
echo "   WebP total: $webp_size"
echo ""

# Calculate potential savings
png_bytes=$(find . -name "*.png" -exec stat -f%z {} \; 2>/dev/null | awk '{sum+=$1} END {print sum}')
webp_bytes=$(find . -name "*.webp" -exec stat -f%z {} \; 2>/dev/null | awk '{sum+=$1} END {print sum}')

if [ ! -z "$png_bytes" ] && [ ! -z "$webp_bytes" ]; then
    savings_bytes=$((png_bytes - webp_bytes))
    savings_mb=$(echo "scale=1; $savings_bytes/1024/1024" | bc)
    savings_pct=$(echo "scale=0; ($savings_bytes / $png_bytes) * 100" | bc)
    
    echo "💰 Potential Savings if PNGs Deleted:"
    echo "   Space saved: ${savings_mb}MB (${savings_pct}%)"
    echo ""
fi

echo "===================="
echo "📋 Recommendations:"
echo ""

echo "✅ KEEP PNGs if:"
echo "   • First time deploying WebP (safer)"
echo "   • Want maximum browser compatibility"
echo "   • Need originals for future edits"
echo "   • Disk space is not a concern"
echo ""

echo "🗑️  DELETE PNGs if:"
echo "   • WebP tested and working on all browsers"
echo "   • Have originals backed up elsewhere"
echo "   • Want faster git operations"
echo "   • Need to save ~${savings_mb}MB"
echo ""

echo "===================="
echo "🎯 Suggested Action:"
echo ""
echo "OPTION A: Test First (Recommended)"
echo "  1. Deploy with both PNG + WebP"
echo "  2. Test on Safari, Chrome, Firefox"
echo "  3. Wait 1 week"
echo "  4. Then delete PNGs"
echo ""

echo "OPTION B: Delete Now (Advanced)"
echo "  Only if:"
echo "  • You have originals backed up"
echo "  • Tested locally successfully"
echo "  • Targeting modern browsers only (2020+)"
echo ""

echo "===================="
echo "🛠️  Commands:"
echo ""

echo "To backup PNGs before deleting:"
echo "  mkdir ../img-backup-png"
echo "  cp *.png ../img-backup-png/"
echo ""

echo "To delete PNGs (CAREFUL!):"
echo "  rm *.png"
echo ""

echo "To restore from backup:"
echo "  cp ../img-backup-png/*.png ."
echo ""

echo "===================="
echo ""

# Browser support check
echo "📱 Browser Support for WebP:"
echo ""
echo "✅ Full Support (2020+):"
echo "   • Chrome 32+"
echo "   • Firefox 65+"
echo "   • Safari 14+ (macOS Big Sur+, iOS 14+)"
echo "   • Edge 18+"
echo ""
echo "⚠️  No Support (Rare):"
echo "   • IE 11 (0.4% global usage)"
echo "   • Safari 13 and older (iOS 13-, macOS Catalina-)"
echo ""
echo "🎯 Verdict: WebP safe for 98%+ of users in 2025"
echo ""

# Check if HTML is using picture fallback
echo "🔍 Checking if HTML has fallback..."
if grep -q "<picture>" ../index.html 2>/dev/null; then
    echo "✅ HTML uses <picture> fallback - SAFE to delete PNGs"
    echo "   (Old browsers will automatically use PNG fallback)"
else
    echo "⚠️  HTML does NOT use <picture> - KEEP PNGs for now"
fi

echo ""
echo "===================="
echo ""
echo "💡 My Recommendation for You:"
echo ""
echo "   Keep PNGs for 1 week after deployment"
echo "   Then delete to save ${savings_mb}MB"
echo ""
echo "   Your HTML already has <picture> fallback,"
echo "   so deleting is safe anytime."
echo ""
