// The Point — React Component Layer
// Import the CSS in your app entry point:
//   import 'path/to/the-point/index.css'
// Then import components from here.

// Layout
export { Container, Section, Grid, AppLayout } from './components/Layout'

// Navigation
export { Nav, NavInner, NavBrand, NavLinks, NavLink, NavActions } from './components/Nav'

// Hero & section structure
export {
  Hero,
  HeroEyebrow,
  HeroTitle,
  HeroSubtitle,
  HeroActions,
  GradientText,
  SectionHeader,
  SectionLabel,
  SectionTitle,
  SectionSubtitle,
} from './components/Hero'

// Core components
export { Button } from './components/Button'
export { Badge } from './components/Badge'
export { Alert } from './components/Alert'
export { Avatar } from './components/Avatar'
export { Divider, DottedConnector } from './components/Divider'
export { Skeleton, SkeletonCard } from './components/Skeleton'

// Card
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardBody,
  CardFooter,
  CardFeatureIcon,
} from './components/Card'

// Forms
export {
  FormGroup,
  Label,
  Input,
  Textarea,
  Select,
  FormError,
  FormHint,
  Checkbox,
  Radio,
} from './components/Form'

// Stats
export { Stat, StatValue, StatLabel, StatChange } from './components/Stat'

// Pricing
export {
  PricingCard,
  PricingPlan,
  PricingPrice,
  PricingAmount,
  PricingPeriod,
  PricingDescription,
  PricingFeatures,
  PricingFeature,
} from './components/Pricing'

// Content
export { Testimonial } from './components/Testimonial'

// Overlay & modal
export { Overlay, Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter } from './components/Modal'

// Sidebar / app layout
export {
  Sidebar,
  SidebarHeader,
  SidebarNav,
  SidebarLabel,
  SidebarItem,
  MainContent,
} from './components/Sidebar'

// Theme
export { ThemeToggle, useTheme } from './components/ThemeToggle'
