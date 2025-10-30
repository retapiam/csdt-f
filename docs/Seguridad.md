# Seguridad y Despliegue

## Seguridad
- Auth API: Laravel Sanctum (Bearer tokens)
- Autorización: roles y permisos (`PermisosController`, `permisos_roles`)
- Rate limiting IA y cache: `config/ai.php`
- Validaciones backend: Form Request/Middleware
- Auditoría: logs de acceso a IA y generación de PDFs

## Despliegue
- Variables .env: claves IA, mail, queue driver, storage
- Queues: `php artisan queue:work` (redis/database)
- Scheduler: `app/Console/Kernel.php` programa `GenerarAlertasTempranasJob`
- Storage: `php artisan storage:link` para PDFs y archivos
- Monitoreo: endpoint `/api/admin/sistema/estado` desde `ConfiguracionSistema.jsx`
