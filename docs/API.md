# API PAE/CAE y Alertas

## PAE
- GET `/api/pae/instituciones`
- POST `/api/pae/instituciones`
- GET `/api/pae/menus`
- POST `/api/pae/menus`
- GET `/api/pae/entregas`
- POST `/api/pae/entregas`
- GET `/api/pae/incidencias`
- POST `/api/pae/incidencias`

## CAE
- GET `/api/cae/comites`
- POST `/api/cae/comites`
- GET `/api/cae/actas`
- POST `/api/cae/actas`
- GET `/api/cae/seguimientos`
- POST `/api/cae/seguimientos`

## Alertas
- GET `/api/alertas`
- GET `/api/alertas/{id}`
- PUT `/api/alertas/{id}`
- POST `/api/admin/sistema/generar-alertas`
- POST `/api/admin/sistema/alerts-email` { enabled: boolean }

## PDF servidor
- GET `/api/pdf/proyecto/{id}`
- GET `/api/pdf/acta-cae/{id}`
- GET `/api/pdf/denuncia/{id}`
- GET `/api/pdf/hallazgos/{id}`

Autenticación vía Bearer (Sanctum). Roles: cli, ope, adm, adm_gen.
