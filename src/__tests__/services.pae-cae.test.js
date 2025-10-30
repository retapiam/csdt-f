import PaeService from '../services/PaeService';
import CaeService from '../services/CaeService';
import AlertasService from '../services/AlertasService';

describe('Servicios PAE/CAE/Alertas - API surface', () => {
  test('PaeService expone métodos esperados', () => {
    expect(typeof PaeService.listInstituciones).toBe('function');
    expect(typeof PaeService.createInstitucion).toBe('function');
    expect(typeof PaeService.listMenus).toBe('function');
    expect(typeof PaeService.createMenu).toBe('function');
    expect(typeof PaeService.listEntregas).toBe('function');
    expect(typeof PaeService.createEntrega).toBe('function');
    expect(typeof PaeService.listIncidencias).toBe('function');
    expect(typeof PaeService.createIncidencia).toBe('function');
  });

  test('CaeService expone métodos esperados', () => {
    expect(typeof CaeService.listComites).toBe('function');
    expect(typeof CaeService.createComite).toBe('function');
    expect(typeof CaeService.listActas).toBe('function');
    expect(typeof CaeService.createActa).toBe('function');
    expect(typeof CaeService.listSeguimientos).toBe('function');
    expect(typeof CaeService.createSeguimiento).toBe('function');
  });

  test('AlertasService expone métodos esperados', () => {
    expect(typeof AlertasService.list).toBe('function');
    expect(typeof AlertasService.get).toBe('function');
    expect(typeof AlertasService.update).toBe('function');
    expect(typeof AlertasService.generarTempranas).toBe('function');
    expect(typeof AlertasService.toggleEmails).toBe('function');
  });
});


