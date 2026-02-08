# Simulador de Ahorro Digital - Frontend PRO

Prueba Técnica desarrollada con una arquitectura por capas (Clean Architecture) para Banco Caja Social.

## 🚀 Tecnologías

- **Framework**: Next.js 15 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS 4
- **Estado/Data**: React Query + Axios + Zustand
- **Formularios**: React Hook Form + Zod
- **UI Components**: Shadcn UI (Radix UI)
- **PWA**: Soporte nativo y manifiesto

## 🏗 Arquitectura (PRO / Enterprise)

El proyecto está estructurado en capas para asegurar que el framework sea un detalle y el dominio sea independiente:

1. **Infrastructure**: Implementación de Axios y repositorios concretos.
2. **Domain**: Definición de entidades, tipos e interfaces (contratos).
3. **Application**: Casos de uso implementados a través de hooks (`useProducts`, `useSimulation`, `useOnboarding`).
4. **Presentation**: Componentes de UI, layouts y el App Router de Next.js.
5. **Shared**: Utilidades transversales y constantes.

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

## 🛠 Instalación y Ejecución

1. Clonar el repositorio.
2. Instalar dependencias: `npm install`
3. Ejecutar en desarrollo: `npm run dev`
4. Base URL de API (Configurada para local): `http://localhost:4005/api/`

## 💡 Decisiones de Diseño

- **SSR/ISR**: Se utilizó renderizado híbrido. El listado de productos se beneficia de React Query para hidratación y búsqueda debounced en cliente.
- **Aesthetics**: Se implementó un tema "Metallic Blue" con acentos rojos del Banco Caja Social, usando gradientes y glassmorphism para un look Premium.
- **Validaciones**: Zod garantiza que los datos en el simulador y onboarding sean íntegros antes de llegar a la API.
