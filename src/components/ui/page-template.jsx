import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './card';
import { Badge } from './badge';
import { Alert, AlertDescription } from './alert';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Globe, 
  Building, 
  Mail, 
  Map,
  Clock,
  CheckCircle,
  AlertTriangle,
  Brain,
  Zap,
  Target,
  FileText,
  Cpu
} from 'lucide-react';

const PageTemplate = ({ 
  title, 
  subtitle, 
  description, 
  icon = "🤖", 
  category = "Sistema", 
  color = "blue", 
  stats = [], 
  alerts = [], 
  breadcrumbs = [], 
  children 
}) => {
  const getColorClasses = (color) => {
    const colors = {
      blue: "from-blue-50 to-blue-100 text-blue-900 border-blue-200",
      purple: "from-purple-50 to-purple-100 text-purple-900 border-purple-200",
      green: "from-green-50 to-green-100 text-green-900 border-green-200",
      orange: "from-orange-50 to-orange-100 text-orange-900 border-orange-200",
      red: "from-red-50 to-red-100 text-red-900 border-red-200"
    };
    return colors[color] || colors.blue;
  };

  const getIconComponent = (iconName) => {
    const icons = {
      BarChart3, TrendingUp, Users, Globe, Building, Mail, Map,
      Clock, CheckCircle, AlertTriangle, Brain, Zap, Target, FileText, Cpu
    };
    const IconComponent = icons[iconName];
    return IconComponent ? <IconComponent className="h-5 w-5" /> : null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="text-6xl mr-4">{icon}</div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {title}
              </h1>
              <p className="text-xl text-gray-600 mb-4">
                {subtitle}
              </p>
              <Badge className={`${getColorClasses(color)} px-4 py-2 text-sm font-semibold`}>
                {category}
              </Badge>
            </div>
          </div>
          
          {description && (
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <div className="mb-6">
            <nav className="flex items-center space-x-2 text-sm">
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  <span className={index === breadcrumbs.length - 1 ? "text-gray-900 font-medium" : "text-gray-500"}>
                    {crumb}
                  </span>
                  {index < breadcrumbs.length - 1 && (
                    <span className="text-gray-400">/</span>
                  )}
                </React.Fragment>
              ))}
            </nav>
          </div>
        )}

        {/* Stats */}
        {stats.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        {stat.label}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-full">
                      {getIconComponent(stat.icon) || <div className="h-5 w-5 text-blue-600">{stat.icon}</div>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Alerts */}
        {alerts.length > 0 && (
          <div className="mb-8 space-y-4">
            {alerts.map((alert, index) => (
              <Alert key={index} className="border-l-4 border-l-blue-500 bg-blue-50">
                <div className="flex items-center">
                  {getIconComponent(alert.icon) && (
                    <div className="mr-3 text-blue-600">
                      {getIconComponent(alert.icon)}
                    </div>
                  )}
                  <AlertDescription className="text-blue-800">
                    {alert.message}
                  </AlertDescription>
                </div>
              </Alert>
            ))}
          </div>
        )}

        {/* Main Content */}
        <Card className="bg-white shadow-xl">
          <CardContent className="p-0">
            {children}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Sistema CSDT - Consejo Social de Veeduría y Desarrollo Territorial</p>
          <p className="mt-1">Generado el {new Date().toLocaleDateString('es-CO')} a las {new Date().toLocaleTimeString('es-CO')}</p>
        </div>
      </div>
    </div>
  );
};

export default PageTemplate;
