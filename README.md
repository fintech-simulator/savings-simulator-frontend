# Simulador de Ahorro Digital - Banco Belolli

Prueba Técnica desarrollada con una arquitectura por capas (Clean Architecture).

## 🚀 Tecnologías

- **Framework**: Next.js 15 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS 4
- **Estado/Data**: React Query + Axios + Zustand
- **Formularios**: React Hook Form + Zod

## 🏗 Arquitectura (PRO / Enterprise)

El proyecto está estructurado en capas para asegurar que el framework sea un detalle y el dominio sea independiente:

1. **Infrastructure**: Implementación de Axios y repositorios concretos con persistencia en localStorage para datos de sesión.
2. **Domain**: Contratos, entidades y tipos que definen el negocio sin dependencias externas.
3. **Application**: Casos de uso implementados mediante Hooks de React (`useProducts`, `useSimulation`, `useOnboarding`), centralizando la lógica de negocio.
4. **Presentation**: Componentes de UI basados en el sistema de diseño "Metallic Blue" y el App Router de Next.js.

## 📁 Estructura de Carpetas

```text
src/
├── app/                  # Next.js App Router (UI Layer)
├── application/          # Use Cases (Hooks)
├── domain/               # Core Logic & Types
├── infrastructure/       # External API & HTTP Clients
├── presentation/         # UI Components & ViewModels
├── providers/            # React Query Providers
└── shared/               # Utils & Constants
```

## 💡 Decisiones de Diseño

### Implementación de SSR e ISR

Para la sección de **Productos**, hemos implementado una estrategia híbrida:

- **ISR (Incremental Static Regeneration)**: La página de productos se genera estáticamente para garantizar tiempos de carga instantáneos y SEO superior. Se revalida en segundo plano para asegurar que las tasas y nuevos productos se actualicen sin necesidad de redesplegar.
- **Client-Side Data**: Utilizamos React Query para manejar búsquedas en tiempo real con _debouncing_, lo que permite al usuario filtrar el catálogo sin latencia percibida.

### Estética y Experiencia

- **Diseño Premium**: Uso de gradientes metálicos, sombras profundas y _glassmorphism_ para reflejar la solidez de una institución financiera moderna.
- **Validación Robusta**: Implementación de Zod en todos los formularios para prevenir errores de usuario antes de procesar depósitos o solicitudes.

## 🛠 Instalación y Ejecución

1. `npm install`
2. `npm run dev` (Desarrollo)
3. `npm run build` (Producción/Vercel)
