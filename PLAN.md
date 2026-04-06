# 🗺️ Plan Budowy Pełnej Wersji: Dystrybucja Muzyki

Poniżej znajduje się szczegółowa checklista i harmonogram prac podzielony na kluczowe fazy rozwoju systemu.

---

## 🏗️ Faza 1: Fundamenty i Autoryzacja
*Cel: Zapewnienie bezpiecznego dostępu do platformy.*

- [ ] **Konfiguracja Bazy Danych (Firebase/Firestore)**
  - [ ] Implementacja schematu danych (Użytkownicy, Artyści, Wydania).
  - [ ] Konfiguracja Security Rules (Zasady Bezpieczeństwa).
- [ ] **System Autentykacji**
  - [ ] Logowanie przez Google/Email.
  - [ ] Rejestracja z wyborem typu konta (Artysta / Wytwórnia).
  - [ ] Odzyskiwanie hasła i weryfikacja dwuetapowa (2FA).
- [ ] **Profile Artystów**
  - [ ] Zarządzanie pseudonimami artystycznymi.
  - [ ] Weryfikacja tożsamości (KYC - Know Your Customer).

---

## 💿 Faza 2: Silnik Dystrybucji (Upload & Metadata)
*Cel: Umożliwienie przesyłania muzyki i zarządzania danymi.*

- [ ] **Kreator Wydania (Release Wizard)**
  - [ ] Przesyłanie plików audio (WAV/FLAC) z walidacją jakości.
  - [ ] Przesyłanie okładek (Artwork) z automatycznym skalowaniem.
  - [ ] Formularz metadanych (Tytuł, Gatunek, ISRC, UPC, Teksty).
- [ ] **Zarządzanie Prawami i Udziałami**
  - [ ] Definiowanie autorów i kompozytorów.
  - [ ] System podziału zysków (Splits) między współpracowników.
- [ ] **Wybór Sklepów i Daty Wydania**
  - [ ] Wybór platform (Spotify, Apple, Tidal, YouTube Music).
  - [ ] Ustawianie daty premiery i okresu przedsprzedaży (Pre-order).

---

## 📊 Faza 3: Panel Dashboard i Analityka
*Cel: Dostarczenie artyście wglądu w wyniki jego twórczości.*

- [ ] **Główny Panel (Dashboard)**
  - [ ] Podsumowanie ostatnich wydań.
  - [ ] Szybkie statystyki (Odtworzenia, Obserwujący).
- [ ] **Zaawansowana Analityka**
  - [ ] Wykresy trendów (D3.js / Recharts).
  - [ ] Dane demograficzne słuchaczy (Lokalizacja, Wiek).
  - [ ] Porównanie wyników między platformami.

---

## 📣 Faza 4: Narzędzia Promocji i Marketingu
*Cel: Zwiększenie zasięgów wydawanej muzyki.*

- [ ] **Smartlinks & Pre-save**
  - [ ] Automatyczne generowanie stron lądowania dla singli/albumów.
  - [ ] Funkcja "Pre-save" na Spotify i Apple Music.
- [ ] **Generator Materiałów Promocyjnych**
  - [ ] Tworzenie grafik do Social Media na podstawie okładki.
- [ ] **Wysyłka do Playlist (Pitching)**
  - [ ] Formularz zgłoszeniowy do edytorów playlist.

---

## 💰 Faza 5: Finanse i Rozliczenia
*Cel: Transparentne zarządzanie przychodami.*

- [ ] **Portfel Cyfrowy (Wallet)**
  - [ ] Podgląd salda i historii transakcji.
  - [ ] Raporty miesięczne od sklepów.
- [ ] **System Wypłat**
  - [ ] Integracja z PayPal / Stripe / Przelewy bankowe.
  - [ ] Automatyczne generowanie faktur i rachunków.
- [ ] **Podatki**
  - [ ] Zarządzanie formularzami podatkowymi (W-8BEN itp.).

---

## 🛡️ Faza 6: Administracja i Kontrola Jakości
*Cel: Zarządzanie systemem i moderacja treści.*

- [ ] **Panel Admina**
  - [ ] Przeglądanie i zatwierdzanie zgłoszonych wydań (Quality Control).
  - [ ] Zarządzanie użytkownikami i blokowanie nadużyć.
- [ ] **System Powiadomień**
  - [ ] E-mail / Push o zmianie statusu wydania (Zatwierdzone / Odrzucone).

---

## 🚀 Faza 7: Optymalizacja i Skalowanie
*Cel: Zapewnienie stabilności i szybkości działania.*

- [ ] **Optymalizacja Wydajności**
  - [ ] Caching danych (SWR / React Query).
  - [ ] Optymalizacja obrazów i skryptów.
- [ ] **Testy i Jakość**
  - [ ] Testy jednostkowe i integracyjne.
  - [ ] Testy obciążeniowe serwera.
- [ ] **Wersja Mobilna (PWA)**
  - [ ] Możliwość instalacji aplikacji na telefonie.

---

## 📖 Legenda Pojęć

- **ISRC**: Unikalny kod identyfikujący konkretne nagranie dźwiękowe.
- **UPC**: Kod kreskowy identyfikujący cały produkt (album, singiel).
- **KYC (Know Your Customer)**: Procedura weryfikacji tożsamości klienta, niezbędna przy wypłatach finansowych.
- **Splits**: Procentowy podział przychodów z utworu między jego twórców.
- **Pitching**: Proces zgłaszania utworu do kuratorów playlist w celu uzyskania promocji.
- **PWA (Progressive Web App)**: Aplikacja internetowa, która działa i wygląda jak natywna aplikacja mobilna.
