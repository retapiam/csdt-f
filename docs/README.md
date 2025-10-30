# CSDT - PAE/CAE: Guía de Arranque Rápido

## Backend (Laravel)
1) Requisitos: PHP >= 8.2, Composer, SQLite/MySQL, Redis (opcional)
2) Instalar dependencias:
   - composer install
3) Copiar .env y generar key:
   - cp .env.example .env
   - php artisan key:generate
4) Configurar BD y ejecutar migraciones:
   - php artisan migrate
5) Opcional: colas y scheduler
   - php artisan queue:work
6) Ejecutar servidor:
   - php artisan serve

Variables IA/mail/colas (opcional):
- OPENAI_API_KEY=...
- ANTHROPIC_API_KEY=...
- MAIL_MAILER=smtp, MAIL_HOST=..., MAIL_USERNAME=..., MAIL_PASSWORD=...
- QUEUE_CONNECTION=database|redis

## Frontend (Vite + React)
1) Requisitos: Node 18+
2) Instalar dependencias:
   - npm install
3) Variables (opcional): copiar .env.example a .env y ajustar `VITE_API_URL`
4) Desarrollo:
   - npm run dev
5) Preview producción:
   - npm run build && npm run preview

## Pruebas
- Backend: php artisan test
- Frontend: npm test

## Postman
Importar `docs/Postman_PAE_CAE.json` y configurar `{{base_url}}` y `{{token}}`.
