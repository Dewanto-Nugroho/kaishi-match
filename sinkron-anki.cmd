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
if errorlevel 1 goto end

echo.
echo -------------------------------------------------------------
set /p UPLOAD="Upload progres terbaru ke GitHub agar di HP ikut terupdate? (Y/N, default Y): "
if /i "%UPLOAD%"=="N" goto end

where git >nul 2>nul
if not errorlevel 1 (
  echo Mengunggah ke GitHub...
  git add progress.js
  git commit -m "Update progres belajar Anki" >nul 2>nul
  git push origin main
  echo Selesai diunggah! Web di HP sekarang sudah sinkron.
)

:end
echo.
pause
