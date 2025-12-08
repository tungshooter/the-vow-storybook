# ⭐ THE VOW – INTERACTIVE STORYBOOK  
### *A Legend of Brotherhood. A Circle Without Beginning or End.*

[![View Multi-Page Version](https://img.shields.io/badge/OPEN-MULTI--PAGE%20VERSION-brightgreen?style=for-the-badge&logo=firefox-browser)](https://tungshooter.github.io/the-vow-storybook/)
[![View One-Page Version](https://img.shields.io/badge/OPEN-ONE--PAGE%20VERSION-blue?style=for-the-badge&logo=firefox-browser)](https://tungshooter.github.io/the-vow-storybook/index-onepage.html)

---

## 🛡️ Introduction

**The Vow** là một *interactive story-experience* được lấy cảm hứng từ phong cách kể chuyện của **The Legend of Zelda** – nơi huyền thoại, biểu tượng và cảm xúc hòa vào nhau thành một vòng tròn bất tận.

Dự án tái hiện hành trình của **7 anh em**, gắn kết không phải bằng huyết thống, cũng không phải bằng những lời thề hoa mỹ – mà bằng *sự hiện diện, sự đồng hành và tình cảm được giữ gìn theo năm tháng*.

Mỗi nhân vật là một **nguyên tố**, một **mảnh ghép**, một **Rune**, tạo thành vòng tròn mang tên:

## 🔥 THE VOW

---

## 📖 Two Reading Experiences

Dự án cung cấp **2 phiên bản trải nghiệm** song song, mỗi phiên bản phục vụ mục đích và cách kể chuyện khác nhau:

### 🔗 **Version 1: Multi-Page (Traditional)**
**File:** `index.html` + separate chapter files  
**Spec:** `spec.yml`

**Đặc điểm:**
- Mỗi chương là một trang HTML riêng biệt
- Người đọc tự điều khiển nhịp độ đọc và chuyển trang
- Phù hợp để đọc tùy chỉnh, có thể bookmark từng chương
- Navigation thủ công qua buttons hoặc links
- Mỗi chapter có URL riêng (ví dụ: `chapter1-hero.html`)

**Cấu trúc:**
```
index.html (Prologue)
├── chapter1-hero.html
├── chapter2-circle.html
├── chapter3-sages-intro.html
│   ├── chapter3-sage-huy.html
│   ├── chapter3-sage-tung.html
│   ├── chapter3-sage-trung.html
│   ├── chapter3-sage-thang.html
│   ├── chapter3-sage-hai.html
│   └── chapter3-sage-duong.html
├── chapter4-sword.html
├── chapter5-pool.html
├── chapter6-uniform.html
├── chapter7-shield.html
├── chapter8-team.html
└── ending.html
```

### 🎬 **Version 2: One-Page (Cinematic Experience)**
**File:** `index-onepage.html` + lazy-loaded components  
**Spec:** `spec-onepage.yml`

**Đặc điểm:**
- Single Page Application (SPA) - tất cả trong một file duy nhất
- Auto-play audio xuyên suốt, tự động chuyển chapter
- Lazy loading components để tối ưu performance
- Trải nghiệm "cinematic" như xem phim - không cần tương tác
- Mượt mà, liền mạch, không reload trang
- Chỉ có 1 URL duy nhất

**Cấu trúc:**
```
index-onepage.html (Main SPA container)
  ↓ (lazy load from components/)
components/
├── prologue.html
├── chapter1-hero.html
├── chapter2-circle.html
├── chapter3-intro.html
├── chapter3-sage-huy.html
├── chapter3-sage-tung.html
├── chapter3-sage-trung.html
├── chapter3-sage-thang.html
├── chapter3-sage-hai.html
├── chapter3-sage-duong.html
├── chapter4-sword.html
├── chapter5-pool.html
├── chapter6-uniform.html
├── chapter7-shield.html
├── chapter8-team.html
└── ending.html
```

**So sánh:**

| Feature | Multi-Page | One-Page |
|---------|-----------|----------|
| **Kiểm soát** | User-driven | Auto-play |
| **URL** | Mỗi chapter có URL riêng | Single URL |
| **Loading** | Page reload mỗi lần chuyển | No reload, smooth transitions |
| **Performance** | Load toàn bộ mỗi page | Lazy load từng component |
| **Trải nghiệm** | Đọc sách truyền thống | Xem phim/presentation |
| **Audio** | Play manual mỗi chapter | Auto-play liên tục |
| **Spec file** | `spec.yml` | `spec-onepage.yml` |

---

## 🌟 Features

### 🎮 1. Interactive Storybook
- 17 chapters trình bày như một *in-game lorebook*
- Nội dung chia trang/section tạo trải nghiệm khám phá
- Văn phong cinematic, cảm hứng từ Zelda BOTW/TOTK

### 🔊 2. Voice-Narrated Chapters
- Mỗi chương có **audio narration** (ElevenLabs)
- Hiệu ứng:
  - Rune xoay khi audio play
  - Button glow & pulse như glyph
  - Progress bar chạy theo audio timeline

### ✨ 3. Zelda-Style Visuals
- Cel-shaded artwork
- Profile cards cho từng Sage
- Bộ logo Shield – Circle – Sword chuẩn in (PNG/CMYK/SVG/TIFF)
- Mockup áo & mũ như artifact trong game

### 🌈 4. Smooth Animations
- Fade-in AOS effects
- Ambient glow
- Parallax nhẹ
- Rune spinning animation
- Smooth page/section transitions

### ⚡ 5. Performance Optimization
- Lazy loading components (One-Page version)
- Thumbnail images cho chapter previews
- Optimized asset loading

---

## 🪄 How It Works

### **Rune-Animated Audio Player**
- Play → Rune xoay với animation
- Pause → Rune dừng
- Button glow + pulse effect
- Progress bar chạy theo audio duration

### **Navigation Flow**
```
Prologue → Chapter 1 (Hero) → Chapter 2 (Circle) → 
Chapter 3 Intro → 6 Sages (Huy → Tung → Trung → Thang → Hai → Duong) →
Chapter 4 (Sword) → Chapter 5 (Pool) → Chapter 6 (Uniform) → 
Chapter 7 (Shield) → Chapter 8 (Team) → Ending
```

Mỗi chapter có hình minh họa riêng (profile cards, team art, logos…)

---

## 🚀 Deployment (GitHub Pages)

1. Vào **Settings → Pages**
2. Branch: `main`
3. Folder: `/root`
4. Save

**Live URLs:**
- Multi-Page: `https://<username>.github.io/the-vow-storybook/`
- One-Page: `https://<username>.github.io/the-vow-storybook/index-onepage.html`

---

## 🛠️ Development

### Local Server
```bash
# Chạy local server để test (cần cho lazy loading)
./serve.sh

# Hoặc dùng Python
python3 -m http.server 8000
```

Truy cập:
- Multi-Page: `http://localhost:8000/`
- One-Page: `http://localhost:8000/index-onepage.html`

### Cấu trúc Project
```
the-vow-storybook/
├── README.md
├── spec.yml (Multi-Page spec)
├── spec-onepage.yml (One-Page spec)
├── index.html (Multi-Page entry)
├── index-onepage.html (One-Page entry)
├── chapter*.html (Multi-Page chapters)
├── ending.html (Multi-Page ending)
├── serve.sh
├── components/ (One-Page lazy-loaded components)
│   ├── prologue.html
│   ├── chapter*.html
│   └── ending.html
└── assets/
    ├── css/
    │   ├── style.css
    │   └── style-onepage.css
    ├── js/
    │   ├── main.js
    │   └── main-onepage.js
    ├── audio/
    │   └── *.mp3
    └── images/
        ├── thumbnails/ (optimized previews)
        └── *.png (full images)
```

---

## 🧡 Credits

### **The Seven of The Vow**  
*Bound beyond distance.*

**Story & Art Direction:**  
Tùng (Guiding Light)

**Character Cards & Logos:**  
ChatGPT + Gemini

**Narration Voice:**  
ElevenLabs

**Development:**  
Tùng + ChatGPT

**Dedicated to**  
những chuyến bay chỉ để nhậu,  
những tiếng cười đến 3 giờ sáng,  
và những phút giây mà không ai trong nhóm muốn đánh rơi.

---

## 🏹 Final Message

**The Vow is not a story.  
It's a circle.  
A promise.  
A legend carried by seven.**
