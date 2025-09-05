/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			sm: '360px',
  			md: '768px',
  			lg: '1024px',
  			xl: '1280px',
  			'2xl': '1536px'
  		}
  	},
  	screens: {
  		sm: '360px',
  		md: '768px',
  		lg: '1024px',
  		xl: '1280px',
  		'2xl': '1536px'
  	},
  	extend: {
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			saffron: {
  				'50': '#fff8f0',
  				'100': '#ffedd5',
  				'200': '#fed7aa',
  				'300': '#fdba74',
  				'400': '#fb923c',
  				'500': '#FF8A00',
  				'600': '#ea580c',
  				'700': '#c2410c',
  				'800': '#9a3412',
  				'900': '#7c2d12'
  			},
  			'peacock-green': {
  				'50': '#f0fdfa',
  				'100': '#ccfbf1',
  				'200': '#99f6e4',
  				'300': '#5eead4',
  				'400': '#2dd4bf',
  				'500': '#0A7B6C',
  				'600': '#0d9488',
  				'700': '#0f766e',
  				'800': '#115e59',
  				'900': '#134e4a'
  			},
  			'lotus-pink': {
  				'50': '#fdf2f8',
  				'100': '#fce7f3',
  				'200': '#fbcfe8',
  				'300': '#f9a8d4',
  				'400': '#f472b6',
  				'500': '#E45C9A',
  				'600': '#db2777',
  				'700': '#be185d',
  				'800': '#9d174d',
  				'900': '#831843'
  			},
  			'deep-indigo': {
  				'50': '#eef2ff',
  				'100': '#e0e7ff',
  				'200': '#c7d2fe',
  				'300': '#a5b4fc',
  				'400': '#818cf8',
  				'500': '#0D1021',
  				'600': '#4f46e5',
  				'700': '#4338ca',
  				'800': '#3730a3',
  				'900': '#312e81'
  			},
  			'soft-gold': {
  				'50': '#fffbeb',
  				'100': '#fef3c7',
  				'200': '#fde68a',
  				'300': '#fcd34d',
  				'400': '#fbbf24',
  				'500': '#E3C26B',
  				'600': '#d97706',
  				'700': '#b45309',
  				'800': '#92400e',
  				'900': '#78350f'
  			},
  			indigo: {
  				'50': '#eef2ff',
  				'100': '#e0e7ff',
  				'200': '#c7d2fe',
  				'300': '#a5b4fc',
  				'400': '#818cf8',
  				'500': '#1A237E',
  				'600': '#4f46e5',
  				'700': '#4338ca',
  				'800': '#3730a3',
  				'900': '#312e81'
  			},
  			'deep-teal': {
  				'50': '#f0fdfa',
  				'100': '#ccfbf1',
  				'200': '#99f6e4',
  				'300': '#5eead4',
  				'400': '#2dd4bf',
  				'500': '#0C3B3C',
  				'600': '#0d9488',
  				'700': '#0f766e',
  				'800': '#115e59',
  				'900': '#134e4a'
  			},
  			sand: {
  				'50': '#fefdf8',
  				'100': '#fef7ed',
  				'200': '#fdedd4',
  				'300': '#fbd7a9',
  				'400': '#f8bb72',
  				'500': '#F5EDDA',
  				'600': '#f59e0b',
  				'700': '#d97706',
  				'800': '#b45309',
  				'900': '#92400e'
  			},
  			'off-white': {
  				'50': '#fefefe',
  				'100': '#fdfdfd',
  				'200': '#fafafa',
  				'300': '#f7f7f7',
  				'400': '#f4f4f4',
  				'500': '#FAF8F4',
  				'600': '#e5e5e5',
  				'700': '#d4d4d4',
  				'800': '#a3a3a3',
  				'900': '#737373'
  			},
  			'accent-gold': {
  				'50': '#fffbeb',
  				'100': '#fef3c7',
  				'200': '#fde68a',
  				'300': '#fcd34d',
  				'400': '#fbbf24',
  				'500': '#C49B0B',
  				'600': '#d97706',
  				'700': '#b45309',
  				'800': '#92400e',
  				'900': '#78350f'
  			},
  			wisdom: {
  				'50': '#f8fafc',
  				'100': '#f1f5f9',
  				'200': '#e2e8f0',
  				'300': '#cbd5e1',
  				'400': '#94a3b8',
  				'500': '#64748b',
  				'600': '#475569',
  				'700': '#334155',
  				'800': '#1e293b',
  				'900': '#0f172a'
  			},
  			turquoise: {
  				'50': '#f0fdfa',
  				'100': '#ccfbf1',
  				'200': '#99f6e4',
  				'300': '#5eead4',
  				'400': '#2dd4bf',
  				'500': '#14b8a6',
  				'600': '#0d9488',
  				'700': '#0f766e',
  				'800': '#115e59',
  				'900': '#134e4a'
  			},
  			gold: {
  				'50': '#fffbeb',
  				'100': '#fef3c7',
  				'200': '#fde68a',
  				'300': '#fcd34d',
  				'400': '#fbbf24',
  				'500': '#f59e0b',
  				'600': '#d97706',
  				'700': '#b45309',
  				'800': '#92400e',
  				'900': '#78350f'
  			},
  			purple: {
  				'50': '#faf5ff',
  				'100': '#f3e8ff',
  				'200': '#e9d5ff',
  				'300': '#d8b4fe',
  				'400': '#c084fc',
  				'500': '#a855f7',
  				'600': '#9333ea',
  				'700': '#7c3aed',
  				'800': '#6b21a8',
  				'900': '#581c87'
  			},
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			// Shikshanam Final Color System
  			'parchment-ivory': 'hsl(var(--parchment-ivory))',
  			'golden-olive': 'hsl(var(--golden-olive))',
  			'deep-maroon': 'hsl(var(--deep-maroon))',
  			'copper-orange': 'hsl(var(--copper-orange))',
  			'sand-beige': 'hsl(var(--sand-beige))',
  			'dark-olive': 'hsl(var(--dark-olive))',
  			'temple-gold': 'hsl(var(--temple-gold))',
  			'deep-indigo': 'hsl(var(--deep-indigo))'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)',
  			'2xl': '1rem'
  		},
  		perspective: {
  			'1000': '1000px',
  			'2000': '2000px'
  		},
  		transformStyle: {
  			'preserve-3d': 'preserve-3d'
  		},
  		fontFamily: {
  			sans: [
  				'Inter',
  				'Manrope',
  				'system-ui',
  				'sans-serif'
  			],
  			serif: [
  				'Suranna',
  				'Marcellus',
  				'Georgia',
  				'serif'
  			],
  			display: [
  				'Suranna',
  				'Marcellus',
  				'Georgia',
  				'serif'
  			],
  			body: [
  				'Inter',
  				'Manrope',
  				'system-ui',
  				'sans-serif'
  			],
  			devanagari: [
  				'Noto Sans Devanagari',
  				'system-ui',
  				'sans-serif'
  			]
  		},
  		fontSize: {
  			hero: 'clamp(28px, 4vw, 64px)',
  			display: 'clamp(24px, 3.5vw, 48px)',
  			subheading: 'clamp(18px, 2.5vw, 32px)',
  			body: 'clamp(14px, 1.5vw, 18px)',
  			small: 'clamp(12px, 1.2vw, 14px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			'fade-in': {
  				'0%': {
  					opacity: 0,
  					transform: 'translateY(20px)'
  				},
  				'100%': {
  					opacity: 1,
  					transform: 'translateY(0)'
  				}
  			},
  			'slide-in-left': {
  				'0%': {
  					opacity: 0,
  					transform: 'translateX(-50px)'
  				},
  				'100%': {
  					opacity: 1,
  					transform: 'translateX(0)'
  				}
  			},
  			'slide-in-right': {
  				'0%': {
  					opacity: 0,
  					transform: 'translateX(50px)'
  				},
  				'100%': {
  					opacity: 1,
  					transform: 'translateX(0)'
  				}
  			},
  			'scale-in': {
  				'0%': {
  					opacity: 0,
  					transform: 'scale(0.9)'
  				},
  				'100%': {
  					opacity: 1,
  					transform: 'scale(1)'
  				}
  			},
  			'spin-slow': {
  				'0%': {
  					transform: 'rotate(0deg)'
  				},
  				'100%': {
  					transform: 'rotate(360deg)'
  				}
  			},
  			'spin-slow-reverse': {
  				'0%': {
  					transform: 'rotate(360deg)'
  				},
  				'100%': {
  					transform: 'rotate(0deg)'
  				}
  			},
  			float: {
  				'0%, 100%': {
  					transform: 'translateY(0px)'
  				},
  				'50%': {
  					transform: 'translateY(-20px)'
  				}
  			},
  			'pulse-gentle': {
  				'0%, 100%': {
  					opacity: 0.7,
  					transform: 'scale(1)'
  				},
  				'50%': {
  					opacity: 0.9,
  					transform: 'scale(1.1)'
  				}
  			},
  			'fade-lift': {
  				'0%': {
  					opacity: 0,
  					transform: 'translateY(16px)'
  				},
  				'100%': {
  					opacity: 1,
  					transform: 'translateY(0)'
  				}
  			},
  			'micro-scale': {
  				'0%': {
  					transform: 'scale(1)'
  				},
  				'100%': {
  					transform: 'scale(1.03)'
  				}
  			},
  			'mandala-rotate': {
  				'0%': {
  					transform: 'rotate(0deg)'
  				},
  				'100%': {
  					transform: 'rotate(360deg)'
  				}
  			},
  			'glyph-float': {
  				'0%, 100%': {
  					transform: 'translateY(0px) translateX(0px)',
  					opacity: 0.06
  				},
  				'25%': {
  					transform: 'translateY(-10px) translateX(5px)',
  					opacity: 0.08
  				},
  				'50%': {
  					transform: 'translateY(-5px) translateX(-3px)',
  					opacity: 0.1
  				},
  				'75%': {
  					transform: 'translateY(-15px) translateX(2px)',
  					opacity: 0.07
  				}
  			},
  			'rangoli-sweep': {
  				'0%': {
  					transform: 'translateX(-100%)',
  					opacity: 0
  				},
  				'50%': {
  					opacity: 1
  				},
  				'100%': {
  					transform: 'translateX(100%)',
  					opacity: 0
  				}
  			},
  			'animation-delay-1000': {
  				'animation-delay': '1s'
  			},
  			'animation-delay-2000': {
  				'animation-delay': '2s'
  			},
  			'animation-delay-3000': {
  				'animation-delay': '3s'
  			},
  			'animation-delay-4000': {
  				'animation-delay': '4s'
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'fade-in': 'fade-in 0.6s ease-out',
  			'slide-in-left': 'slide-in-left 0.6s ease-out',
  			'slide-in-right': 'slide-in-right 0.6s ease-out',
  			'scale-in': 'scale-in 0.4s ease-out',
  			'spin-slow': 'spin-slow 20s linear infinite',
  			'spin-slow-reverse': 'spin-slow-reverse 25s linear infinite',
  			float: 'float 6s ease-in-out infinite',
  			'pulse-gentle': 'pulse-gentle 4s ease-in-out infinite',
  			'fade-lift': 'fade-lift 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  			'micro-scale': 'micro-scale 0.12s ease-out',
  			'mandala-rotate': 'mandala-rotate 60s linear infinite',
  			'glyph-float': 'glyph-float 8s ease-in-out infinite',
  			'rangoli-sweep': 'rangoli-sweep 2s ease-in-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
