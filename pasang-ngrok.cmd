@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
where python >nul 2>nul
if errorlevel 1 (
  where py >nul 2>nul
  if errorlevel 1 (
    echo Python tidak ditemukan di PATH.
    echo Instal Python dari https://www.python.org/downloads/ lalu jalankan lagi.
    echo.
    pause
    exit /b 1
  )
  py "pasang-ngrok.py"
  goto done
)
python "pasang-ngrok.py"
:done
echo.
pause
