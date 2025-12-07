# Fountain Health Technologies Design System

## 核心设计哲学 (Core Design Philosophy)

**简洁、专业、高级感**
- Minimal but not minimal - 简洁但不简陋
- Professional but approachable - 专业但亲切
- Premium feel without being pretentious - 高级感但不做作

---

## 关键设计原则 (Critical Design Principles)

### 1. 清晰的视觉层次 (Clear Visual Hierarchy)

**❌ 避免 (AVOID):**
- 所有文字都一样大小
- 没有weight对比
- 模糊的重要性层级

**✅ 正确做法 (DO):**
```tsx
// 使用三级层次系统
<span className="text-sm uppercase tracking-widest text-neutral-400">
  Eyebrow Label (小标签)
</span>
<h1 className="text-4xl sm:text-5xl font-bold text-black">
  Primary Heading (主标题)
</h1>
<p className="text-xl sm:text-2xl text-neutral-600 font-medium">
  Subtitle (副标题)
</p>
```

**层次规则:**
1. **Eyebrow** - text-sm, uppercase, tracking-widest, neutral-400
2. **Hero Title** - text-4xl~5xl, font-bold/semibold, black
3. **Subtitle** - text-xl~2xl, font-medium, neutral-600
4. **Body** - text-base~lg, font-normal, neutral-700
5. **Caption** - text-sm~xs, font-medium, neutral-500

### 2. 数字和数据显示 (Numbers & Data Display)

**核心原则: 数字要醒目、dramatic**

**❌ 避免:**
- 数字和单位一样大
- 没有对比
- 字体太小看不清

**✅ 正确做法:**
```tsx
// 超大数字 + 轻量单位
<div className="flex items-baseline justify-center gap-3">
  <span className="text-8xl sm:text-9xl font-bold text-black tabular-nums tracking-tighter">
    ~35
  </span>
  <span className="text-4xl sm:text-5xl text-neutral-300 font-light">
    min
  </span>
</div>
```

**数字显示规则:**
- 主要数字: text-7xl~9xl, font-bold, black
- 单位标签: 小2-3级, font-light/normal, neutral-300~400
- 必须使用 `tabular-nums` 保持对齐
- 使用 `tracking-tighter` 让数字更紧凑
- 使用 `items-baseline` 对齐基线

### 3. Spacing 系统 (Spacing System)

**❌ 常见错误:**
- 用flex-1 justify-center导致spacing不可控
- 用负margin hack (-mt-8)
- 随意的padding值

**✅ 正确做法:**
```tsx
// 使用统一的spacing scale
space-y-8  // 主要内容区块之间
space-y-6  // 相关内容组
space-y-4  // 紧密相关元素
space-y-2  // 标签和输入框

mb-10, mb-8, mb-6  // 主要section间距
pt-6, pb-4         // 卡片内部padding
```

**Spacing原则:**
1. **8pt grid system** - 使用8的倍数 (8, 16, 24, 32, 40...)
2. **Consistent rhythm** - 整个页面保持一致的节奏
3. **Optical balance** - 根据视觉重量调整，不是机械对齐
4. **Breathing room** - 宁可多留白，不要挤

### 4. 卡片设计 (Card Design)

**标准卡片样式:**
```tsx
<div className="bg-white rounded-3xl p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-neutral-100">
  {/* content */}
</div>
```

**卡片规则:**
- **圆角**: rounded-2xl (16px) 或 rounded-3xl (24px)
- **Shadow**: 使用subtle custom shadow，不要用shadow-xl太重
- **Border**: border border-neutral-100 或 neutral-200
- **Padding**: p-8 sm:p-10 或 p-10 sm:p-12
- **Background**: bg-white 为主，bg-neutral-50 为辅助

**❌ 避免:**
- shadow-2xl 太重
- border-2 或 border-4 太粗
- rounded-lg 太小气
- 没有border直接用shadow

### 5. 按钮设计 (Button Design)

**主要CTA按钮:**
```tsx
<Button className="
  h-16 sm:h-20
  px-16 sm:px-20
  text-xl sm:text-2xl
  font-semibold
  rounded-2xl
  bg-black hover:bg-neutral-800
  shadow-lg hover:shadow-2xl
  transition-all
  hover:scale-[1.02]
">
  Action Text
</Button>
```

**按钮规则:**
- **高度**: h-14~h-20 (根据重要性)
- **圆角**: rounded-xl 或 rounded-2xl
- **文字**: text-lg~2xl, font-semibold
- **Padding**: px-12~px-24 要generous
- **Hover**: scale-[1.02] 微妙放大
- **Shadow**: shadow-lg → shadow-2xl

### 6. Typography 系统

**字体家族:**
```tsx
// 三种字体，各司其职
font-display  // Outfit - 标题、按钮
font-sans     // Inter - 正文、标签
font-mono     // Space Grotesk - 数字、电话
```

**使用规则:**
- **标题** → Outfit (font-display)
- **正文** → Inter (font-sans)
- **数字/时间** → Space Grotesk (font-mono)
- **电话号码** → Space Grotesk (font-mono)

**字体大小 (iPad Kiosk):**
```
Eyebrow:    text-sm (14px)
Body:       text-base~lg (16-18px)
Subtitle:   text-xl~2xl (20-24px)
Heading:    text-4xl~5xl (36-48px)
Hero:       text-6xl~7xl (60-72px)
Numbers:    text-8xl~9xl (96-128px)
```

### 7. 颜色系统 (Color System)

**主色板:**
```tsx
// 黑白为主，中性色为辅
black: '#000000'        // 主要文字、按钮
white: '#FFFFFF'        // 背景、卡片
neutral-50: '#FAFAFA'   // 辅助背景
neutral-100: '#F5F5F5'  // 卡片背景
neutral-200: '#E5E5E5'  // 边框、分隔线
neutral-300: '#D4D4D4'  // 次要元素
neutral-400: '#A3A3A3'  // 标签、placeholder
neutral-500: '#737373'  // 副标题
neutral-600: '#525252'  // 正文
neutral-700: '#404040'  // 强调正文
```

**颜色使用原则:**
- **主要文字**: text-black 或 text-neutral-700
- **副标题**: text-neutral-600
- **标签/辅助**: text-neutral-500
- **Eyebrow**: text-neutral-400
- **单位/轻量**: text-neutral-300
- **边框**: border-neutral-100~200
- **背景**: bg-neutral-50~100

---

## 常见设计错误和解决方案

### ❌ 错误 1: 使用flex-1和justify-center来居中内容

**问题:** spacing不可控，内容会根据大小变化位置

**解决:**
```tsx
// ❌ 错误
<div className="flex-1 flex items-center justify-center">
  <div>content</div>
</div>

// ✅ 正确
<div className="flex-1 flex flex-col justify-center px-8 pb-12">
  <div className="w-full max-w-2xl mx-auto space-y-8">
    content
  </div>
</div>
```

### ❌ 错误 2: 标题文字太大导致换行难看

**问题:** 长文字在固定宽度下换行很丑

**解决:**
```tsx
// ❌ 错误 - 自动换行
<h1 className="text-6xl">
  Bundle Medical & Sportsworld Walk-In Clinic
</h1>

// ✅ 正确 - 手动控制换行
<h1 className="text-5xl leading-tight">
  Bundle Medical &<br />Sportsworld Walk-In Clinic
</h1>
```

### ❌ 错误 3: Shadow太重，border太粗

**问题:** 看起来很廉价，不高级

**解决:**
```tsx
// ❌ 错误
<div className="shadow-2xl border-2 border-gray-300">

// ✅ 正确
<div className="shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-neutral-100">
```

### ❌ 错误 4: 所有文字都用默认字体

**问题:** 没有层次感和设计感

**解决:**
```tsx
// ❌ 错误 - 没有字体策略
<h1>Welcome</h1>
<p>35</p>

// ✅ 正确 - 字体有策略
<h1 className="font-display">Welcome</h1>
<p className="font-mono tabular-nums">35</p>
```

### ❌ 错误 5: Input太小，Label太小

**问题:** iPad上不方便点击和阅读

**解决:**
```tsx
// ❌ 错误
<Label className="text-sm">Name</Label>
<Input className="h-10 text-base" />

// ✅ 正确
<Label className="text-lg font-semibold">Name *</Label>
<Input className="h-14 text-lg px-5 rounded-xl" />
```

---

## Component Library标准

### Card Component
```tsx
// 标准信息卡片
<div className="bg-white rounded-3xl p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-neutral-100">
  <div className="text-center mb-6">
    <p className="text-base font-bold tracking-[0.2em] uppercase text-neutral-400 mb-4">
      Label
    </p>
    <div className="flex items-baseline justify-center gap-3">
      <span className="text-8xl font-bold text-black tabular-nums">
        Value
      </span>
    </div>
  </div>
  <div className="border-t border-neutral-200 pt-6">
    Secondary Info
  </div>
</div>
```

### Button Component
```tsx
// 主要CTA
<Button className="h-16 sm:h-20 px-16 sm:px-20 text-xl sm:text-2xl font-semibold rounded-2xl bg-black hover:bg-neutral-800 shadow-lg hover:shadow-2xl transition-all hover:scale-[1.02]">
  Primary Action
</Button>

// 次要按钮
<Button variant="ghost" className="text-lg h-10 px-3 hover:bg-neutral-100 font-medium">
  Secondary Action
</Button>
```

### Form Field
```tsx
<div className="space-y-3">
  <Label className="text-lg font-semibold text-neutral-700">
    Field Name *
  </Label>
  <Input className="h-14 text-lg px-5 rounded-xl border-neutral-300 focus:border-black focus:ring-0" />
</div>
```

### Info Box
```tsx
<div className="bg-neutral-50 rounded-2xl p-6 sm:p-8 border border-neutral-200">
  <p className="text-lg sm:text-xl text-center">
    ✓ Confirmation message
  </p>
  <p className="text-base sm:text-lg text-neutral-500 text-center mt-2">
    Additional info
  </p>
</div>
```

---

## 响应式设计规则

### Breakpoint Strategy
```tsx
// 使用 sm: prefix for iPad landscape and up
text-4xl sm:text-5xl    // 36px → 48px
h-16 sm:h-20            // 64px → 80px
p-8 sm:p-10             // 32px → 40px
px-16 sm:px-20          // 64px → 80px
```

### Mobile vs Tablet
- **Mobile (Portrait)**: 基础大小
- **Tablet (Landscape)**: 使用sm:放大

---

## 动画和交互

### 页面切换动画
```tsx
<motion.main
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.3, ease: 'easeInOut' }}
>
```

### 内容入场动画
```tsx
<motion.div
  initial={{ y: 20, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ delay: 0.2, duration: 0.4 }}
>
```

### 按钮Hover
```tsx
className="transition-all hover:scale-[1.02] hover:shadow-2xl"
```

**动画原则:**
- **Duration**: 0.2~0.4s (快速但不突兀)
- **Easing**: easeInOut (自然)
- **Delay**: 适当使用stagger (0.1s, 0.2s)
- **Scale**: 1.01~1.02 (微妙)

---

## Logo使用规范

### Placement
- **Top center** - 主要位置
- **Padding**: pt-6 pb-3 (minimal)
- **不要**: 放在corner，太小，被其他元素挤压

### Variants
```tsx
<Logo variant="combined" />  // Icon + Wordmark (主要)
<Logo variant="icon" />      // Icon only (small spaces)
<Logo variant="wordmark" />  // Text only (rarely used)
```

---

## Footer规范

```tsx
<div className="pb-5 text-center">
  <p className="text-neutral-500 text-sm font-medium">
    Powered by Fountain Health Technologies Inc.
  </p>
</div>
```

**规则:**
- 永远在底部 (用flex-1 spacer推下去)
- text-neutral-500 (明显但不抢戏)
- text-sm font-medium
- pb-5 留足空间

---

## 设计检查清单 (Design Checklist)

在完成任何界面前，检查以下项目：

### ✅ 视觉层次
- [ ] 有清晰的主标题
- [ ] 副标题区分明显
- [ ] 标签/辅助文字层级清楚
- [ ] 重要信息突出

### ✅ Spacing
- [ ] 使用8pt grid
- [ ] 没有使用负margin
- [ ] 元素之间有足够呼吸空间
- [ ] 整体节奏一致

### ✅ Typography
- [ ] 标题用font-display
- [ ] 数字用font-mono
- [ ] 正文用font-sans
- [ ] 所有文字大小合理

### ✅ 颜色
- [ ] 主要文字用black或neutral-700
- [ ] 标签用neutral-400~500
- [ ] 背景用white或neutral-50
- [ ] 对比度足够

### ✅ 组件
- [ ] 卡片用subtle shadow
- [ ] Border不超过1px
- [ ] 圆角用xl或2xl/3xl
- [ ] 按钮足够大

### ✅ 响应式
- [ ] 使用sm:放大
- [ ] 在iPad上测试
- [ ] 没有横向滚动
- [ ] Footer始终可见

### ✅ 交互
- [ ] 按钮有hover效果
- [ ] 页面有切换动画
- [ ] Loading状态清晰
- [ ] 没有突兀的动画

---

## 总结：三个最重要的原则

1. **清晰的层次** - 让用户一眼看到最重要的信息
2. **一致的节奏** - spacing、sizing保持统一的韵律
3. **微妙的细节** - shadow、border、hover都要subtle而精致

记住: **Less is more, but make what's there count.**

---

*Last Updated: December 2025*
*Version: 1.0 - Kiosk Tablet Demo*
