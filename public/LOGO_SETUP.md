# Logo & Favicon Setup Instructions

## 📁 File Structure

```
public/
├── images/
│   ├── logo.svg          # Logo chính (recommend SVG)
│   ├── logo-dark.svg     # Logo cho dark mode (optional)
│   └── og-image.jpg      # Open Graph image (1200x630px)
├── favicon.ico           # Favicon chính
├── apple-touch-icon.png  # iOS icon (180x180px)
└── favicon-*.png         # Các size khác nhau
```

## 🎨 Logo Requirements

### Logo chính (`logo.svg`):
- **Format**: SVG (vector, scale tốt)
- **Size**: Tối thiểu 200x60px
- **Background**: Transparent
- **Colors**: InnoJSC brand colors

### Alternative: PNG
- Nếu không có SVG, dùng PNG
- Size: 400x120px hoặc lớn hơn
- Transparent background

## 🔖 Favicon Requirements

### Cách tạo Favicon:

1. **Favicon.ico** (32x32px)
   - Format: ICO
   - Tool: https://favicon.io hoặc https://realfavicongenerator.net

2. **Apple Touch Icon** (180x180px)
   - Format: PNG
   - Cho iOS devices

3. **Other sizes**:
   - 16x16px
   - 32x32px
   - 192x192px (Android)
   - 512x512px (Android)

## 📊 Open Graph Image (`og-image.jpg`)

**Để share đẹp trên Facebook, LinkedIn, Twitter:**

- Size: **1200x630px** (tỷ lệ 1.91:1)
- Format: JPG hoặc PNG
- File size: < 1MB
- Content: Logo + text "InnoJSC Careers"

### Template Canva:
1. Vào canva.com
2. Search "Facebook Post" (1200x630)
3. Design với:
   - InnoJSC Logo
   - Text: "Tuyển dụng nhân tài công nghệ"
   - Background: InnoJSC brand colors

## 🚀 Quick Setup

### Nếu bạn CHƯA có logo/favicon:

**Option 1: Tạm thời dùng text-based logo** (đã implement)
- Component Logo sẽ hiển thị "InnoJSC" styled

**Option 2: Tạo nhanh với AI/Tools:**

1. **Logo**:
   - https://looka.com (AI logo maker)
   - https://logo.com
   - Hoặc thuê designer trên Fiverr ($5-20)

2. **Favicon**:
   - https://favicon.io/favicon-generator/
   - Input: "InnoJSC" hoặc chữ "I"
   - Download và extract vào `/public`

## 📝 Sau khi có files:

```bash
# 1. Copy logo vào public/images/
cp your-logo.svg public/images/logo.svg

# 2. Copy favicon files vào public/
cp favicon.ico public/
cp apple-touch-icon.png public/
# ... các files khác

# 3. DONE! App sẽ tự động dùng
```

## 🎯 Current Implementation

Code đã support cả 2 cases:
- ✅ Có logo image → hiển thị image
- ✅ Chưa có logo → hiển thị text styled "InnoJSC"

Bạn chỉ cần add files vào `public/` là xong!
