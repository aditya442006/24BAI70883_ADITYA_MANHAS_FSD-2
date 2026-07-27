# Post Composer - Multi-Platform Interface

## Experiment 1.1.1: Dynamic Post Creation Interface

A modern React-based post composition interface that supports multiple social media platforms with real-time validation, character counters, and platform-specific constraint enforcement.

### 🎯 Features

- **Multi-Platform Support**: Twitter/X, Instagram, Facebook, LinkedIn, TikTok
- **Real-Time Validation**: Instant feedback for platform constraints
- **Character Counting**: Dynamic character counters for each platform
- **Media Attachment**: Upload images and videos with platform compatibility
- **Platform-Specific Rules**:
  - Twitter/X: 280 character limit
  - Instagram: 2,200 character limit, hashtag guidelines
  - Facebook: 63,206 character limit
  - LinkedIn: 3,000 character limit
  - TikTok: 150 character limit for captions

- **Visual Feedback**: Error indicators, warnings, and success messages
- **Responsive Design**: Fully responsive for desktop, tablet, and mobile
- **User-Friendly UI**: Intuitive interface with smooth animations

### 📋 Project Structure

```
exp1.1.1/
├── public/
│   └── index.html           # Main HTML entry point
├── src/
│   ├── components/
│   │   └── PostComposer.js  # Main post composer component
│   ├── constants/
│   │   └── platforms.js     # Platform definitions and constraints
│   ├── styles/
│   │   └── PostComposer.css # Component-specific styles
│   ├── utils/
│   │   └── validation.js    # Validation logic and rules
│   ├── App.js               # Main App component
│   ├── App.css              # Global styles
│   └── index.js             # React entry point
└── package.json             # Project dependencies
```

### 🚀 Getting Started

#### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

#### Installation

1. Navigate to the project directory:
```bash
cd exp1.1.1
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

### 🎨 Component Overview

#### PostComposer Component
The main component that orchestrates all functionality:
- Platform selection with visual feedback
- Content textarea with character count indicator
- Media upload functionality
- Real-time validation display
- Publishing action buttons

#### Validation System
- Character limit enforcement
- Platform compatibility checking
- Link validation for platforms that don't support them
- Hashtag count monitoring
- Real-time error and warning messages

#### Platform Definitions
Each platform has configurable constraints:
- Maximum characters
- Media support (images, videos, links)
- Hashtag rules
- Visual branding (colors, icons)

### 💻 How to Use

1. **Select Platforms**: Click on the platform buttons to select where you want to post
2. **Write Content**: Type your message in the textarea
3. **Attach Media**: Optionally upload images or videos
4. **Monitor Constraints**: Watch real-time feedback for each platform
5. **Publish**: Click the Publish button to post to selected platforms

### 📊 Validation Features

- **Character Counter**: Shows current/max characters for each platform
- **Error Alerts**: Displays if content exceeds platform limits
- **Warnings**: Alerts when approaching limits (85%+)
- **Link Validation**: Prevents linking on platforms that don't support them
- **Success Feedback**: Green checkmark when content is ready to publish

### 📱 Responsive Breakpoints

- **Desktop**: Full layout with all features visible
- **Tablet (768px)**: Adjusted grid and spacing
- **Mobile (480px)**: Single-column layout, optimized touch targets

### 🛠️ Technology Stack

- **React 18.2.0**: UI framework
- **JavaScript (ES6+)**: Language
- **CSS3**: Styling with animations and gradients
- **React Hooks**: State management (useState, useCallback)

### 📚 Key Learning Outcomes

- ✅ Multi-platform content handling
- ✅ Real-time validation mechanisms
- ✅ Responsive and user-friendly UI design
- ✅ Component-based architecture
- ✅ State management with React hooks
- ✅ Modular validation logic
- ✅ Cross-browser compatibility

### 🔧 Build for Production

To create a production build:

```bash
npm run build
```

This creates an optimized build in the `build/` directory.

### 📝 Notes

- Platform constraints are configurable in `src/constants/platforms.js`
- Validation rules can be extended in `src/utils/validation.js`
- Styling can be customized in CSS files
- Currently simulates publishing (doesn't send actual API requests)

### 🎓 Educational Value

This project demonstrates:
- React component composition
- State management with hooks
- Real-time form validation
- Responsive design principles
- UX best practices
- Modular code organization

---

**Experiment 1.1.1** - Dynamic Post Creation Interface for Multiple Platforms
