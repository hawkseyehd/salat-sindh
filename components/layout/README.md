# Layout Components

This directory contains reusable layout components that provide consistent structure across all pages in the Salat Sindh project.

## Components

### `Header`
A responsive navigation header with:
- Logo/brand name
- Navigation menu with active state highlighting
- Optional authentication links (login/register)
- Mobile hamburger menu

**Props:**
- `currentPath?: string` - Current page path for active navigation highlighting
- `showAuthLinks?: boolean` - Whether to show authentication links (default: true)

**Usage:**
```tsx
import { Header } from "@/components/layout";

<Header currentPath="/podcast" showAuthLinks={false} />
```

### `Footer`
A consistent footer with:
- Copyright information
- Terms of Service and Privacy links

**Usage:**
```tsx
import { Footer } from "@/components/layout";

<Footer />
```

### `PageLayout`
A complete page wrapper that includes:
- Header
- Main content area
- Footer
- Consistent styling and RTL support

**Props:**
- `children: ReactNode` - Page content
- `currentPath?: string` - Current page path for navigation highlighting
- `showAuthLinks?: boolean` - Whether to show authentication links in header
- `className?: string` - Additional CSS classes

**Usage:**
```tsx
import { PageLayout } from "@/components/layout";

<PageLayout currentPath="/podcast" showAuthLinks={false}>
  <div>Your page content here</div>
</PageLayout>
```

### `HeroSection`
A hero section component with:
- Large title
- Optional description
- Background pattern
- Gradient background

**Props:**
- `title: string` - Hero title
- `description?: string` - Optional description text
- `children?: ReactNode` - Additional content below title/description
- `className?: string` - Additional CSS classes
- `backgroundPattern?: boolean` - Whether to show background pattern (default: true)

**Usage:**
```tsx
import { HeroSection } from "@/components/layout";

<HeroSection 
  title="ہمارے پوڈ کاسٹ"
  description="ہمارے آڈیو اور ویڈیو پوڈ کاسٹ سنیں اور دیکھیں۔"
>
  <div>Additional hero content</div>
</HeroSection>
```

### `ContentSection`
A content section component with:
- Section title
- Optional description
- Content area
- Consistent spacing

**Props:**
- `title: string` - Section title
- `description?: string` - Optional description text
- `children: ReactNode` - Section content
- `className?: string` - Additional CSS classes
- `centered?: boolean` - Whether to center the title and description (default: true)

**Usage:**
```tsx
import { ContentSection } from "@/components/layout";

<ContentSection
  title="تازہ ترین بلاگ پوسٹس"
  description="ہمارے تازہ ترین مضامین اور خبریں پڑھیں اور علم حاصل کریں۔"
>
  <div>Your content here</div>
</ContentSection>
```

### `Section`
A basic section wrapper with:
- Optional container
- Customizable styling

**Props:**
- `children: ReactNode` - Section content
- `className?: string` - Additional CSS classes
- `container?: boolean` - Whether to wrap content in a container (default: true)

**Usage:**
```tsx
import { Section } from "@/components/layout";

<Section className="py-16">
  <div>Your content here</div>
</Section>
```

## Complete Page Example

Here's how to create a complete page using these components:

```tsx
import { PageLayout, HeroSection, ContentSection } from "@/components/layout";

export default function MyPage() {
  return (
    <PageLayout currentPath="/mypage">
      <HeroSection 
        title="صفحہ کا عنوان"
        description="صفحہ کی تفصیل"
      >
        <div>Hero content</div>
      </HeroSection>
      
      <ContentSection
        title="مواد کا عنوان"
        description="مواد کی تفصیل"
      >
        <div>Main content</div>
      </ContentSection>
    </PageLayout>
  );
}
```

## Benefits

- **Consistency**: All pages have the same look and feel
- **Maintainability**: Changes to layout only need to be made in one place
- **Reusability**: Components can be used across different pages
- **RTL Support**: Built-in right-to-left text support
- **Responsive**: Mobile-friendly design
- **TypeScript**: Full type safety with TypeScript interfaces

## Customization

All components accept `className` props for additional styling. The base styling follows the project's design system with:
- Dark theme (gray-950 background)
- Blue accent colors
- Red highlight colors
- Consistent spacing and typography
