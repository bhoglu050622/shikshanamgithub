#!/bin/bash

# Batch update remaining course files with ProtectedExternalLink
# This script systematically updates all remaining files

BASEDIR="/Users/amanbhogal/Desktop/Changes as per document/shikshanam_final"
cd "$BASEDIR"

# Counter for updates
UPDATED=0
FAILED=0

# Function to update a single file
update_file() {
    local file=$1
    echo "Processing: $file"
    
    # Check if file has checkout links and not already protected
    if grep -q "courses.shikshanam.in/single-checkout" "$file" && ! grep -q "ProtectedExternalLink" "$file"; then
        # Add import if missing
        if ! grep -q "import.*ProtectedExternalLink" "$file"; then
            # Find the last import line and add our import after it
            sed -i '' '/^import.*from/a\
import { ProtectedExternalLink } from '\''@/components/auth/ProtectedExternalLink'\'';
' "$file" 2>/dev/null || {
                echo "  ⚠️  Failed to add import to $file"
                ((FAILED++))
                return 1
            }
        fi
        
        echo "  ✅ Updated: $file"
        ((UPDATED++))
    else
        echo "  ⏭️  Skipped: $file (already protected or no links)"
    fi
}

# High Priority - HeroSection components
echo "==== Updating HeroSection Components ===="
for file in app/courses/*/components/HeroSection.tsx; do
    [ -f "$file" ] && update_file "$file"
done

# High Priority - FinalCTA components
echo ""
echo "==== Updating FinalCTA Components ===="
for file in app/courses/*/components/FinalCTA.tsx; do
    [ -f "$file" ] && update_file "$file"
done

# Medium Priority - PricingSection components
echo ""
echo "==== Updating PricingSection Components ===="
for file in app/courses/*/components/PricingSection.tsx app/courses/*/components/*Pricing*.tsx; do
    [ -f "$file" ] && update_file "$file"
done

# Lower Priority - Main course pages
echo ""
echo "==== Updating Main Course Pages ===="
for file in app/courses/*/page.tsx; do
    [ -f "$file" ] && update_file "$file"
done

# Summary
echo ""
echo "================================"
echo "✨ Batch Update Complete!"
echo "  Updated: $UPDATED files"
echo "  Failed: $FAILED files"
echo "================================"
echo ""
echo "Next: Run manual replacements for specific patterns"

