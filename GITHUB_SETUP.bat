@echo off
REM HealthFlow - Quick GitHub Setup Script for Windows
REM This script automates Git initialization and GitHub setup

echo.
echo ===================================================
echo   HealthFlow - GitHub Deployment Setup
echo ===================================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Git is not installed. Please install Git from https://git-scm.com/
    pause
    exit /b 1
)

echo [1] Configuring Git...
echo Enter your GitHub username:
set /p GITHUB_USER=
echo Enter your GitHub email:
set /p GITHUB_EMAIL=

git config --global user.name "%GITHUB_USER%"
git config --global user.email "%GITHUB_EMAIL%"
echo [OK] Git configured.

echo.
echo [2] Initializing repository...
git init
echo [OK] Repository initialized.

echo.
echo [3] Adding files...
git add .
echo [OK] Files added.

echo.
echo [4] Creating initial commit...
git commit -m "Initial commit: HealthFlow BP tracking application with IgA Nephropathy support"
echo [OK] Initial commit created.

echo.
echo [5] GitHub Repository Setup
echo Please go to https://github.com/new to create a new repository
echo Name it 'healthflow' and make it PUBLIC
echo Do NOT initialize with README, .gitignore, or license
echo.
echo Enter your GitHub repository URL (format: https://github.com/USERNAME/healthflow):
set /p REPO_URL=

echo.
echo [6] Connecting to remote repository...
git remote add origin %REPO_URL%
git branch -M main
echo [OK] Remote repository connected.

echo.
echo [7] Pushing to GitHub...
echo You will be prompted for authentication.
echo Use your GitHub Personal Access Token as password (not your GitHub password).
echo To create token: GitHub Settings > Developer Settings > Personal Access Tokens
echo.
git push -u origin main

if errorlevel 1 (
    echo.
    echo [ERROR] Push failed. Please check your credentials and try again.
    pause
    exit /b 1
)

echo.
echo ===================================================
echo   [SUCCESS] Repository uploaded to GitHub!
echo ===================================================
echo.
echo Your repository is at: %REPO_URL%
echo.
echo Next steps:
echo 1. Go to https://vercel.com and sign up with GitHub
echo 2. Import your healthflow repository
echo 3. Deploy to Vercel
echo.
echo For full deployment guide, see DEPLOYMENT.md
echo.
pause
