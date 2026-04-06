# Dystrybucja Muzyki 🎵

Profesjonalne narzędzie do dystrybucji i promocji muzyki na platformach streamingowych (Spotify, Apple Music, Tidal itp.). System umożliwia artystom i wytwórniom zarządzanie swoimi wydaniami, śledzenie statystyk oraz prowadzenie kampanii marketingowych.

## 🚀 Cel Projektu
Głównym celem jest stworzenie intuicyjnego panelu, który zdejmuje z artysty ciężar techniczny związany z publikacją muzyki, pozwalając mu skupić się na tworzeniu.

## 📂 Struktura Katalogów
Projekt oparty jest na **Next.js App Router**. Poniżej znajduje się opis przeznaczenia poszczególnych folderów:

- `/app`: Główny katalog aplikacji (trasy, layouty, strony).
- `/components`: Reużywalne komponenty interfejsu użytkownika (UI).
  - `/ui`: Podstawowe elementy (przyciski, inputy).
  - `/features`: Komponenty specyficzne dla funkcjonalności (np. odtwarzacz, formularz wysyłki).
- `/lib`: Narzędzia pomocnicze, konfiguracje API i biblioteki zewnętrzne.
- `/hooks`: Własne haki Reactowe (Custom Hooks) do zarządzania stanem i logiką.
- `/types`: Definicje typów TypeScript i interfejsów danych.
- `/public`: Zasoby statyczne (obrazy, ikony, czcionki).
- `/services`: Logika komunikacji z backendem i zewnętrznymi API.

## 🛠 Instalacja i Uruchomienie

1. **Klonowanie repozytorium:**
   ```bash
   git clone https://github.com/tomsonxxx/Dystrybucja-.git
   cd Dystrybucja-
   ```

2. **Instalacja zależności:**
   ```bash
   npm install
   ```

3. **Uruchomienie serwera deweloperskiego:**
   ```bash
   npm run dev
   ```
   Aplikacja będzie dostępna pod adresem `http://localhost:3000`.

## 🌿 System Kontroli Wersji (Git)

Projekt wykorzystuje system **Git** do śledzenia zmian. Poniżej podstawowe polecenia:

- **Zatwierdzanie zmian (Commit):**
  ```bash
  git add .
  git commit -m "Opis zmian w języku polskim"
  ```
- **Zarządzanie gałęziami (Branches):**
  - Stworzenie nowej gałęzi: `git checkout -b nazwa-funkcji`
  - Przełączenie na gałąź: `git checkout nazwa-gałęzi`
  - Połączenie zmian: `git merge nazwa-gałęzi`
- **Synchronizacja:**
  - Pobranie zmian: `git pull origin main`
  - Wysłanie zmian: `git push origin main`

## 📖 Legenda Pojęć

- **App Router**: Nowoczesny system routingu w Next.js oparty na strukturze folderów w katalogu `/app`.
- **Commit**: "Migawka" zmian w kodzie, zapisana w historii systemu kontroli wersji.
- **Branch (Gałąź)**: Niezależna linia rozwoju kodu, pozwalająca na pracę nad nową funkcją bez wpływu na główną wersję programu.
- **Repository (Repozytorium)**: Miejsce, w którym przechowywane są wszystkie pliki projektu wraz z ich historią zmian.
- **Dependency (Zależność)**: Zewnętrzna biblioteka lub moduł, który jest niezbędny do poprawnego działania aplikacji.
