# 🎬 Dokumentasi Animasi - Project Desa

## 📚 Komponen Animasi Yang Tersedia

### 1. **FadeInView** - Fade in dengan direction

```tsx
import { FadeInView } from '@/components/animations';

<FadeInView
    direction="up" // up, down, left, right, none
    delay={0.2} // delay in seconds
    duration={0.3} // animation duration
    className="..."
>
    <YourContent />
</FadeInView>;
```

### 2. **StaggerAnimation** - Animasi berurutan

```tsx
import { StaggerAnimation, StaggerItem } from '@/components/animations';

<StaggerAnimation staggerDelay={0.1}>
    <StaggerItem>
        <Card1 />
    </StaggerItem>
    <StaggerItem>
        <Card2 />
    </StaggerItem>
    <StaggerItem>
        <Card3 />
    </StaggerItem>
</StaggerAnimation>;
```

### 3. **Typewriter** - Efek mengetik

```tsx
import { Typewriter } from '@/components/animations';

<Typewriter
    text="Selamat Datang di Dashboard Desa"
    speed={80} // speed in ms
    delay={1000} // delay before start
    cursor={true} // show cursor
    onComplete={() => console.log('Done!')}
/>;
```

### 4. **AnimatedCard** - Card dengan hover effect

```tsx
import { AnimatedCard } from '@/components/animations';

<AnimatedCard hover={true} className="rounded border p-4">
    <h3>Card Title</h3>
    <p>Card content with smooth animations</p>
</AnimatedCard>;
```

### 5. **AnimatedButton** - Button dengan efek hover

```tsx
import { AnimatedButton } from '@/components/animations';

<AnimatedButton
    variant="scale" // scale, bounce, float, glow
    onClick={handleClick}
    className="rounded bg-blue-500 px-4 py-2 text-white"
>
    Click Me!
</AnimatedButton>;
```

### 6. **LoadingSpinner** - Loading indicator

```tsx
import { LoadingSpinner } from '@/components/animations';

<LoadingSpinner
    size="md" // sm, md, lg
    color="border-blue-600"
/>;
```

### 7. **SlideIn** - Slide from direction

```tsx
import { SlideIn } from '@/components/animations';

<SlideIn direction="left" delay={0.3}>
    <YourContent />
</SlideIn>;
```

### 8. **Pulse** - Pulsing animation

```tsx
import { Pulse } from '@/components/animations';

<Pulse scale={[1, 1.05]} duration={2}>
    <Icon />
</Pulse>;
```

### 9. **AnimatedBackground** - Background dengan animasi

```tsx
import { AnimatedBackground } from '@/components/animations';

<AnimatedBackground variant="gradient">
    {' '}
    {/* gradient, particles, waves, geometric */}
    <YourContent />
</AnimatedBackground>;
```

## 🎨 CSS Animation Classes (Tambahan)

Untuk animasi simple tanpa JavaScript:

```css
/* Fade In */
.animate-fade-in {
    animation: fadeIn 0.3s ease-out;
}

/* Slide Up */
.animate-slide-up {
    animation: slideUp 0.3s ease-out;
}

/* Scale In */
.animate-scale-in {
    animation: scaleIn 0.2s ease-out;
}

/* Bounce In */
.animate-bounce-in {
    animation: bounceIn 0.4s ease-out;
}

/* Float */
.animate-float {
    animation: float 3s ease-in-out infinite;
}

/* Glow */
.animate-glow {
    animation: glow 2s ease-in-out infinite alternate;
}

/* Hover Effects */
.hover-lift:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.hover-glow:hover {
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
}
```

## ⚡ Performance Tips

1. **Durasi Cepat**: Gunakan durasi 0.2-0.3 detik untuk animasi hover dan click
2. **Delay Minimal**: Maksimal 0.5 detik delay untuk tidak mengganggu UX
3. **Once Property**: Gunakan `viewport={{ once: true }}` untuk animasi scroll
4. **Reduce Motion**: Animasi akan disable otomatis jika user prefer reduced motion

## 🎯 Contoh Implementation

### Dashboard dengan Animasi Penuh

```tsx
export default function Dashboard() {
    return (
        <FadeInView>
            <Typewriter text="Dashboard Desa" speed={80} />

            <StaggerAnimation className="mt-6 grid grid-cols-3 gap-4">
                <StaggerItem>
                    <AnimatedCard className="stat-card">
                        <h3>Total Penduduk</h3>
                        <p>1,234</p>
                    </AnimatedCard>
                </StaggerItem>
                <StaggerItem>
                    <AnimatedCard className="stat-card">
                        <h3>Izin Aktif</h3>
                        <p>56</p>
                    </AnimatedCard>
                </StaggerItem>
                <StaggerItem>
                    <AnimatedCard className="stat-card">
                        <h3>Kegiatan</h3>
                        <p>12</p>
                    </AnimatedCard>
                </StaggerItem>
            </StaggerAnimation>

            <SlideIn direction="up" delay={0.8}>
                <div className="main-content">{/* Content */}</div>
            </SlideIn>
        </FadeInView>
    );
}
```

### Button dengan Loading State

```tsx
const [loading, setLoading] = useState(false);

<AnimatedButton variant="scale" onClick={handleSubmit} disabled={loading} className="btn-primary">
    {loading ? (
        <>
            <LoadingSpinner size="sm" className="mr-2" />
            Processing...
        </>
    ) : (
        'Submit'
    )}
</AnimatedButton>;
```

## 🚀 Ready to Use!

Semua animasi sudah siap pakai dengan performa optimal dan durasi cepat (0.2-0.5 detik) agar user tidak menunggu lama. Tinggal import dan gunakan sesuai kebutuhan!

---

_Animasi dibuat dengan Framer Motion untuk performa terbaik_ ⚡
