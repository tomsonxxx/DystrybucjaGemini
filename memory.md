# Historia Projektu i Kontekst

## 2026-04-06: Inicjalizacja Projektu i Planowanie
- Skonfigurowano strukturę projektu Next.js (App Router).
- Wdrożono system kontroli wersji (Git) i podstawową dokumentację (README.md).
- Opracowano szczegółowy plan budowy aplikacji (`PLAN.md`) podzielony na 7 faz.
- Cel: Stworzenie profesjonalnej platformy do dystrybucji i promocji muzyki.

## 2026-04-06: Realizacja Fazy 1 - Fundamenty i Autoryzacja
- Skonfigurowano Firebase (Firestore, Authentication) w regionie `europe-west1`.
- Wdrożono system logowania przez Google z automatycznym tworzeniem profili użytkowników.
- Zaimplementowano `AuthProvider` i system zarządzania stanem autentykacji.
- Stworzono stronę profilu artysty (`/profil`) umożliwiającą edycję pseudonimu i biografii.
- Naprawiono błędy importu konfiguracji Firebase i zoptymalizowano wyświetlanie zdjęć profilowych.
- Cel: Zapewnienie bezpiecznej bazy użytkowników i tożsamości artystycznej.

## 2026-04-06: Realizacja Fazy 2 - Silnik Dystrybucji
- Rozpoczęto prace nad Fazą 2: Silnik Dystrybucji (Upload & Metadata).
- Rozszerzono schemat bazy danych o encję `Release` (Wydanie).
- Zainicjowano tworzenie kreatora wydania (`/wydania/nowe`).
- Cel: Umożliwienie artystom przesyłania muzyki i zarządzania metadanymi wydań.

## Kluczowe Decyzje i Technologie
- **Framework**: Next.js (App Router) + TypeScript.
- **Stylizacja**: Tailwind CSS + Framer Motion (animacje).
- **Backend**: Firebase (Firestore, Auth).
- **Język**: Polski (interfejs i dokumentacja).
- **Bezpieczeństwo**: Reguły Firestore oparte na własności dokumentu (UID).
