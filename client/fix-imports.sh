#!/bin/bash

# Replace all @/ imports with relative paths for Vercel build compatibility

echo "Fixing @ imports in pages..."

# Pages (from pages to components/ui)
find src/pages -name "*.jsx" -o -name "*.tsx" | while read file; do
  sed -i 's|from "@/components/ui/|from "../components/ui/|g' "$file"
  sed -i 's|from "@/components/|from "../components/|g' "$file"
  sed -i 's|from "@/lib/|from "../lib/|g' "$file"
done

echo "Fixing @ imports in components/ui..."

# UI Components (from ui to ../../lib and ./button etc)
find src/components/ui -name "*.jsx" -o -name "*.tsx" | while read file; do
  sed -i 's|from "@/lib/utils"|from "../../lib/utils"|g' "$file"
  sed -i 's|from "@/hooks/|from "../../hooks/|g' "$file"
  sed -i 's|from "@/components/ui/|from "./|g' "$file"
done

echo "✅ All @ imports replaced with relative paths"
