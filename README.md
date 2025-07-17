# SCT_WD_02

# ⏱️ Dual Mode Timer Web App (Stopwatch + Countdown)

This is a responsive and feature-rich web application that combines both a **Stopwatch** and **Countdown Timer** in one elegant interface. Designed with a modern UI and built using vanilla HTML, CSS, and JavaScript, it allows users to track time with customizable themes, save session history, and get real-time audio and visual alerts.

---

## 🧑‍💻 Tech Stack

| Technology | Purpose |
|------------|---------|
| **HTML5**  | Structure of the webpage |
| **CSS3**   | Styling, theming, dark mode, animations |
| **JavaScript (Vanilla)** | App logic, timer control, lap/session management |
| **Web APIs** | Speech Synthesis (voice alerts), Audio API (beeps) |
| **LocalStorage** | Store and retrieve timer sessions |
| **DOM Manipulation** | Interactive UI updates and event handling |

---

## ✨ Features

### 🎛️ Dual Timer Modes

- **Stopwatch Mode**:
  - Count-up timer
  - Lap recording with timestamps
  - Voice feedback every full minute
- **Countdown Mode**:
  - Enter custom countdown time
  - Beep sounds for last 10 seconds
  - Flash warning + voice "Time’s up!"

### 🕹 Controls

- ✅ Start / Pause / Reset — work in both modes
- 📌 Lap — available in Stopwatch mode
- 💾 Save Session — saves current run with laps (if any)
- ❌ Delete Session — remove saved sessions individually
- 🧹 Clear All — delete all sessions (with confirmation)

### 🎨 UI & Themes

- 🌘 Dark Mode Toggle
- 🎨 Theme Switcher: 
  - Default, Neon, Retro, Nature
- 🪄 Smooth transitions and elegant layout

### 🔊 Alerts & Accessibility

- 📢 Voice alert using Speech Synthesis API
- 🎵 Beep sound for countdown endings or stopwatch milestones
- 💡 Flash screen alert for visual cues

### 💾 Data Persistence

- Sessions saved with timestamps using browser **LocalStorage**
- Fully editable and clearable session history

---

## 📁 Project Structure

/SCT_WD_02/
│
├── index.html # Main layout
├── styles.css # Styles and themes
├── script.js # Timer functionality
├── beep.mp3 # Alert sound



