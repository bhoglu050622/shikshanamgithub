# Darshana Circular Visualization

A clean, interactive React component that visualizes the six classical schools of Indian philosophy (Darshanas) in a radial layout around a central OM symbol.

## 🎯 Overview

This visualization represents the six Darshanas of Indian philosophy:
- **Nyāya** (न्याय) - The Science of Logic & Reasoning
- **Vaiśeṣika** (वैशेषिक) - The Atomic Theory of Reality  
- **Sāṅkhya** (साङ्ख्य) - The Map of Consciousness
- **Yoga** (योग) - The Path of Self-Realization
- **Mīmāṁsā** (मीमांसा) - The Science of Dharma
- **Vedānta** (वेदान्त) - The Ultimate Reality

## ✨ Features

### 🎨 Visual Design
- **Perfect Radial Layout**: All 6 nodes positioned in exact 60° increments
- **Central OM Symbol**: Vibrant gradient with pulsing ripple effects
- **Connection Lines**: Animated paths connecting each node to the OM center
- **Floating Particles**: Ambient background particles for visual depth
- **Responsive Design**: Adapts to different screen sizes

### 🎭 Interactions
- **Hover Tooltips**: Rich tooltips showing Sanskrit names and descriptions
- **Click to Unlock**: Toggle unlocked state with visual indicators
- **Flame Animations**: Particles travel along connection lines to OM center
- **OM Unlock**: Special animation when all 6 nodes are unlocked
- **Reset Functionality**: Click unlocked OM to reset all nodes

### ♿ Accessibility
- **Keyboard Navigation**: Full Tab/Enter/Space support
- **ARIA Labels**: Proper screen reader support
- **Focus Indicators**: Clear visual focus states
- **Semantic HTML**: Button elements with proper roles

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- React 18+
- Framer Motion

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd shikshanam

# Install dependencies
npm install

# Start development server
npm run dev
```

### Usage

```tsx
import DarshanaVisualization from '@/components/sections/DarshanaVisualization'

export default function MyPage() {
  return (
    <div>
      <h1>Darshana Visualization</h1>
      <DarshanaVisualization />
    </div>
  )
}
```

## 🧪 Testing

Visit `/test-darshana` to see the interactive demo with testing instructions.

### Test Checklist

#### ✅ Milestone 1: Static Layout
- [ ] All 6 nodes visible and symmetrically placed
- [ ] Each line ends at OM center
- [ ] Perfect radial symmetry (60° increments)
- [ ] Nyāya and Yoga nodes present

#### ✅ Milestone 2: Enhanced Styling  
- [ ] Final badge styling with gradients and shadows
- [ ] OM vibrant and centered with outer ripple rings
- [ ] Flowing shine effects on nodes
- [ ] Energy pulse animations
- [ ] Floating particles for ambiance

#### ✅ Milestone 3: Hover & Keyboard Focus
- [ ] Hover tooltip appears showing node name and description
- [ ] Keyboard focus style with ring indicator
- [ ] Tooltip appears on keyboard focus
- [ ] Accessible button elements with proper ARIA labels
- [ ] Tab navigation works correctly

#### ✅ Milestone 4: Click Interactions + Flame Animation
- [ ] Click on node toggles unlocked state with visual indicator
- [ ] Flame animation travels along connecting line to OM center
- [ ] Unlocked state visible (small indicator on node)
- [ ] Connection lines change appearance when node is unlocked
- [ ] Click interactions work with both mouse and keyboard

#### ✅ Milestone 5: OM Unlock Animation
- [ ] OM unlock animation triggers when all 6 nodes are unlocked
- [ ] Enhanced scale, glow, and ripple effects on unlock
- [ ] Celebration particles radiate from OM center
- [ ] OM becomes clickable to reset all nodes
- [ ] Smooth transitions between locked and unlocked states

#### ✅ Milestone 6: Accessibility & Responsiveness
- [ ] Works on small/large screens
- [ ] Supports keyboard and screen readers
- [ ] Responsive layout maintains proper alignment
- [ ] All interactions accessible via keyboard

## 🏗️ Architecture

### Component Structure
```
DarshanaVisualization/
├── OMCenter              # Central OM symbol with unlock animations
├── DarshanaNode          # Individual philosophy nodes
├── ConnectionLine        # SVG lines connecting nodes to center
├── FlameAnimation        # Particle animations for interactions
└── FloatingParticles     # Background ambiance particles
```

### Key Files
- `components/sections/DarshanaVisualization.tsx` - Main component
- `app/test-darshana/page.tsx` - Testing and demo page
- `README-DARSHANA.md` - This documentation

### State Management
- `unlockedNodes`: Set of unlocked node IDs
- `flameAnimations`: Set of active flame animations
- `isOMUnlocked`: Boolean for OM unlock state
- `hoveredNode` / `focusedNode`: Interaction states

## 🎨 Customization

### Layout Constants
```tsx
const LAYOUT_CONSTANTS = {
  CONTAINER_SIZE: 600,    // Base container size
  CENTER_OFFSET: 300,     // Center point
  RADIUS: 180,           // Node circle radius
  NODE_SIZE: 80,         // Individual node size
  OM_SIZE: 96            // OM symbol size
}
```

### Color Themes
Each Darshana has its own color scheme:
- Nyāya: Blue gradient
- Vaiśeṣika: Green gradient  
- Sāṅkhya: Purple gradient
- Yoga: Red gradient
- Mīmāṁsā: Orange gradient
- Vedānta: Yellow gradient

## 🔧 Technical Details

### Dependencies
- **React 18+**: Component framework
- **Framer Motion**: Animation library
- **Lucide React**: Icon components
- **Tailwind CSS**: Styling framework

### Performance
- Optimized animations using CSS transforms
- Minimal re-renders with proper state management
- Responsive calculations with debounced resize handlers
- Efficient SVG rendering for connection lines

### Browser Support
- Modern browsers with ES6+ support
- CSS Grid and Flexbox support required
- SVG support required for connection lines

## 📱 Responsive Behavior

The visualization automatically adapts to different screen sizes:
- **Desktop**: Full 600px container with all effects
- **Tablet**: Scaled down proportionally
- **Mobile**: Minimum 80% viewport width, optimized touch targets

## 🎯 Future Enhancements

Potential improvements for future versions:
- Sound effects for interactions
- Additional animation variations
- Customizable color themes
- Data export functionality
- Integration with learning management systems

## 📄 License

This component is part of the Shikshanam project. See the main project license for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For questions or issues:
- Check the test page at `/test-darshana`
- Review the component code in `DarshanaVisualization.tsx`
- Ensure all dependencies are properly installed

---

**Built with ❤️ for the Shikshanam project**
