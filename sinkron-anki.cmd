@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo === Sinkronisasi progres Anki ke Cocokkan Kata ===
echo.
where python >nul 2>nul
if errorlevel 1 (
  echo Python tidak ditemukan di PATH.
  echo Instal Python dari https://www.python.org/downloads/ lalu jalankan lagi.
  echo.
  pause
  exit /b 1
)
python "sinkron-anki.py"
echo.
pause
