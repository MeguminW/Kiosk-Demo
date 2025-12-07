# Fountain Design System - Quick Reference

## 🎨 核心原则

1. **清晰的层次** - Eyebrow → Title → Subtitle
2. **一致的节奏** - 使用8pt grid (space-y-8, mb-6)
3. **微妙的细节** - Subtle shadows, 1px borders

---

## 📏 Spacing Scale

```
space-y-8   // 主要section
space-y-6   // 相关内容
space-y-4   // 紧密组
space-y-2   // 标签-输入

mb-10, mb-8, mb-6   // 主要间距
p-8 sm:p-10         // 卡片padding
```

---

## 🔤 Typography

### 字体家族
```tsx
font-display  // Outfit - 标题、按钮
font-sans     // Inter - 正文
font-mono     // Space Grotesk - 数字
```

### 文字层次
```
Eyebrow:    text-sm uppercase tracking-widest text-neutral-400
Subtitle:   text-xl~2xl font-medium text-neutral-600
Heading:    text-4xl~5xl font-bold text-black
Numbers:    text-8xl~9xl font-bold tabular-nums
```

---

## 🎴 Cards

```tsx
<div className="
  bg-white rounded-3xl
  p-8 sm:p-10
  shadow-[0_8px_30px_rgb(0,0,0,0.08)]
  border border-neutral-100
">
```

---

## 🔘 Buttons

```tsx
// Primary CTA
<Button className="
  h-16 sm:h-20 px-16 sm:px-20
  text-xl sm:text-2xl font-semibold
  rounded-2xl bg-black
  shadow-lg hover:shadow-2xl
  hover:scale-[1.02]
">

// Secondary
<Button variant="ghost" className="
  text-lg h-10 px-3
  hover:bg-neutral-100
">
```

---

## 📊 Numbers Display

```tsx
<div className="flex items-baseline gap-3">
  <span className="text-8xl font-bold text-black tabular-nums tracking-tighter">
    35
  </span>
  <span className="text-4xl text-neutral-300 font-light">
    min
  </span>
</div>
```

---

## 📝 Form Fields

```tsx
<div className="space-y-3">
  <Label className="text-lg font-semibold text-neutral-700">
    Name *
  </Label>
  <Input className="
    h-14 text-lg px-5
    rounded-xl border-neutral-300
    focus:border-black focus:ring-0
  "/>
</div>
```

---

## 🎨 Colors

```
Text:
  black           // 主要
  neutral-700     // 正文
  neutral-600     // 副标题
  neutral-500     // 标签
  neutral-400     // Eyebrow
  neutral-300     // 单位

Background:
  white           // 主背景
  neutral-50      // 辅助背景
  neutral-100     // 卡片

Border:
  neutral-100     // 主要
  neutral-200     // 分隔线
```

---

## ✨ Animations

```tsx
// Page transition
<motion.main
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.3 }}
>

// Content entrance
<motion.div
  initial={{ y: 20, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ delay: 0.2, duration: 0.4 }}
>
```

---

## ❌ 避免 (Common Mistakes)

1. ~~flex-1 justify-center~~ → 用固定spacing
2. ~~shadow-2xl border-2~~ → subtle shadow + 1px border
3. ~~所有文字同样大~~ → 建立清晰层次
4. ~~负margin hack~~ → 用proper spacing
5. ~~太小的input~~ → h-14 minimum

---

## ✅ 设计检查清单

- [ ] 清晰的视觉层次 (Eyebrow → Title → Subtitle)
- [ ] 数字够大够醒目 (text-8xl~9xl)
- [ ] Spacing一致 (8pt grid)
- [ ] Shadow subtle (custom shadow)
- [ ] Border不粗 (1px max)
- [ ] 字体策略正确 (display/sans/mono)
- [ ] 响应式 (sm: prefix)
- [ ] Footer可见 (flex-1 spacer)

---

## 🚀 Copy-Paste Templates

### Hero Section
```tsx
<div className="text-center space-y-4">
  <span className="text-sm uppercase tracking-widest text-neutral-400">
    Eyebrow
  </span>
  <h1 className="text-4xl sm:text-5xl font-bold text-black">
    Main Title
  </h1>
  <p className="text-xl sm:text-2xl text-neutral-600 font-medium">
    Subtitle
  </p>
</div>
```

### Info Card
```tsx
<div className="bg-white rounded-3xl p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-neutral-100">
  <div className="text-center mb-6">
    <p className="text-base font-bold tracking-[0.2em] uppercase text-neutral-400 mb-4">
      Label
    </p>
    <div className="text-7xl font-bold text-black">Value</div>
  </div>
  <div className="border-t border-neutral-200 pt-6">
    Secondary Info
  </div>
</div>
```

### Info Box
```tsx
<div className="bg-neutral-50 rounded-2xl p-6 sm:p-8 border border-neutral-200">
  <p className="text-lg sm:text-xl text-center">Message</p>
  <p className="text-base text-neutral-500 text-center mt-2">Details</p>
</div>
```

---

*记住: Less is more, but make what's there count.*
