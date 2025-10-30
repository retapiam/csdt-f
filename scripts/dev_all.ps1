param(
  [int]$BackendPort = 8000,
  [int]$FrontendPort = 5173
)

$ErrorActionPreference = "Stop"

# Backend (Laravel)
Push-Location "$PSScriptRoot\..\..\csdt-b-main"
try {
  if (!(Test-Path "vendor")) { composer install }
  if (!(Test-Path ".env") -and (Test-Path ".env.example")) { Copy-Item ".env.example" ".env" -ErrorAction SilentlyContinue }
  $appKeyLine = (Get-Content ".env" | Select-String -Pattern "^APP_KEY=").ToString()
  if (-not $appKeyLine -or $appKeyLine -eq "APP_KEY=") { php artisan key:generate }
  if (!(Test-Path "database\database.sqlite")) { New-Item -ItemType File -Path "database\database.sqlite" | Out-Null }
  try { php artisan migrate --force } catch {}
  Start-Job -Name "backend-serve" -ScriptBlock { php artisan serve --host 127.0.0.1 --port $using:BackendPort }
  Start-Job -Name "backend-queue" -ScriptBlock { php artisan queue:work --tries=1 }
} finally {
  Pop-Location
}

# Frontend (Vite + React)
Push-Location "$PSScriptRoot\.."
try {
  if (!(Test-Path "node_modules")) { npm install }
  if (!(Test-Path ".env")) {
@"
VITE_APP_NAME=CSDT
VITE_APP_ENV=development
VITE_API_URL=http://localhost:$BackendPort/api
VITE_ENABLE_LOGS=true
"@ | Out-File -Encoding utf8 ".env"
  }
  Start-Job -Name "frontend-dev" -ScriptBlock { npm run dev -- --port $using:FrontendPort }
} finally {
  Pop-Location
}

Write-Host "Entorno de desarrollo iniciado." -ForegroundColor Green
Write-Host "Backend:  http://localhost:$BackendPort" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:$FrontendPort" -ForegroundColor Cyan
Get-Job


