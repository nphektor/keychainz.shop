@echo off
echo ========================================
echo   Product Studio - Desktop Manager
echo ========================================
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo Installing dependencies...
    echo This may take a few minutes on first run.
    echo.
    call npm install
    echo.
)

echo Starting Product Studio...
echo.
call npm start
..\pushsite.sh