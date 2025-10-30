import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Shield, CheckCircle, XCircle, QrCode } from 'lucide-react';
import api from '@services/api';
import { API_ENDPOINTS } from '../../config/config';

const TwoFAModal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [secret, setSecret] = useState('');
  const [qr, setQr] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchStatus = async () => {
      if (!isOpen) return;
      try {
        setLoading(true);
        setError('');
        const res = await api.get(API_ENDPOINTS.AUTH.TWO_FA.STATUS || '/auth/2fa/status');
        setEnabled(Boolean(res.data?.enabled));
      } catch (e) {
        // silent
      } finally {
        setLoading(false);
      }
    };
    fetchStatus();
  }, [isOpen]);

  const handleEnable = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      const res = await api.post(API_ENDPOINTS.AUTH.TWO_FA.ENABLE || '/auth/2fa/enable');
      setSecret(res.data?.secret || '');
      setQr(res.data?.qr || '');
    } catch (e) {
      setError(e.response?.data?.message || 'No se pudo iniciar 2FA');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      const res = await api.post(API_ENDPOINTS.AUTH.TWO_FA.VERIFY || '/auth/2fa/verify', { code });
      if (res.data?.success) {
        setEnabled(true);
        setSuccess('Autenticación 2FA habilitada.');
      } else {
        setError(res.data?.message || 'Código inválido');
      }
    } catch (e) {
      setError(e.response?.data?.message || 'Código inválido');
    } finally {
      setLoading(false);
    }
  };

  const handleDisable = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      const res = await api.post(API_ENDPOINTS.AUTH.TWO_FA.DISABLE || '/auth/2fa/disable');
      if (res.data?.success) {
        setEnabled(false);
        setSecret('');
        setQr('');
        setSuccess('2FA deshabilitada.');
      } else {
        setError(res.data?.message || 'No se pudo deshabilitar 2FA');
      }
    } catch (e) {
      setError(e.response?.data?.message || 'No se pudo deshabilitar 2FA');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Shield className="h-5 w-5" /> Autenticación 2FA
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>

        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md mb-3">{error}</div>
        )}
        {success && (
          <div className="p-3 text-sm text-green-700 bg-green-50 border border-green-200 rounded-md mb-3">{success}</div>
        )}

        {!enabled && !secret && (
          <div className="space-y-3">
            <p className="text-sm text-gray-700">Protege tu cuenta con códigos temporales (TOTP) desde tu app autenticadora.</p>
            <Button onClick={handleEnable} disabled={loading} className="w-full">{loading ? 'Cargando...' : 'Generar clave y QR'}</Button>
          </div>
        )}

        {!enabled && secret && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
              <QrCode className="h-5 w-5" />
              <span className="text-sm text-gray-700">Escanea el QR en tu app o usa el código secreto.</span>
            </div>
            {qr ? (
              <img src={qr} alt="QR 2FA" className="w-48 h-48 mx-auto" />
            ) : (
              <div className="text-xs break-all p-2 bg-gray-100 rounded">{secret}</div>
            )}
            <form onSubmit={handleVerify} className="space-y-2">
              <Label htmlFor="code">Código de 6 dígitos</Label>
              <Input id="code" value={code} onChange={(e) => setCode(e.target.value)} placeholder="123456" required />
              <Button type="submit" disabled={loading} className="w-full">Verificar y habilitar</Button>
            </form>
          </div>
        )}

        {enabled && (
          <div className="space-y-3 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-sm text-gray-700">La autenticación 2FA está habilitada para tu cuenta.</p>
            <Button onClick={handleDisable} disabled={loading} variant="outline" className="w-full">Deshabilitar 2FA</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TwoFAModal;


