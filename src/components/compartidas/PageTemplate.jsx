import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@components/ui/card';
import { Badge } from '@components/ui/badge';
import { Alert, AlertDescription } from '@components/ui/alert';
import { 
  Shield, 
  Star, 
  Users, 
  Globe, 
  Heart,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react';

const PageTemplate = ({ 
  title, 
  subtitle, 
  description, 
  icon, 
  category, 
  color = 'blue',
  children,
  stats = [],
  alerts = [],
  breadcrumbs = []
}) => {
  const colorClasses = {
    blue: {
      primary: 'bg-blue-600',
      secondary: 'bg-blue-100',
      text: 'text-blue-600',
      border: 'border-blue-200',
      gradient: 'from-blue-500 to-blue-700'
    },
    green: {
      primary: 'bg-green-600',
      secondary: 'bg-green-100',
      text: 'text-green-600',
      border: 'border-green-200',
      gradient: 'from-green-500 to-green-700'
    },
    purple: {
      primary: 'bg-purple-600',
      secondary: 'bg-purple-100',
      text: 'text-purple-600',
      border: 'border-purple-200',
      gradient: 'from-purple-500 to-purple-700'
    },
    orange: {
      primary: 'bg-orange-600',
      secondary: 'bg-orange-100',
      text: 'text-orange-600',
      border: 'border-orange-200',
      gradient: 'from-orange-500 to-orange-700'
    },
    red: {
      primary: 'bg-red-600',
      secondary: 'bg-red-100',
      text: 'text-red-600',
      border: 'border-red-200',
      gradient: 'from-red-500 to-red-700'
    },
    indigo: {
      primary: 'bg-indigo-600',
      secondary: 'bg-indigo-100',
      text: 'text-indigo-600',
      border: 'border-indigo-200',
      gradient: 'from-indigo-500 to-indigo-700'
    }
  };

  const colors = colorClasses[color] || colorClasses.blue;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Section */}
      <div className={`bg-gradient-to-r ${colors.gradient} text-white py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          {breadcrumbs.length > 0 && (
            <nav className="mb-6">
              <ol className="flex items-center space-x-2 text-sm">
                {breadcrumbs.map((crumb, index) => (
                  <li key={index} className="flex items-center">
                    {index > 0 && <ArrowRight className="h-4 w-4 mx-2" />}
                    <span className={index === breadcrumbs.length - 1 ? 'font-medium' : 'opacity-80'}>
                      {crumb}
                    </span>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <div className="flex items-center space-x-4 mb-6">
            <div className={`p-4 rounded-2xl ${colors.secondary} bg-white/20 backdrop-blur-sm`}>
              <div className="text-3xl">{icon}</div>
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">{title}</h1>
              <p className="text-xl opacity-90">{subtitle}</p>
            </div>
          </div>

          <p className="text-lg max-w-3xl opacity-90 leading-relaxed">
            {description}
          </p>

          {/* Category Badge */}
          {category && (
            <div className="mt-6">
              <Badge className={`${colors.secondary} ${colors.text} px-4 py-2 text-sm font-medium`}>
                {category}
              </Badge>
            </div>
          )}
        </div>
      </div>

      {/* Stats Section */}
      {stats.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-white shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl ${colors.secondary}`}>
                      <stat.icon className={`h-6 w-6 ${colors.text}`} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Alerts Section */}
      {alerts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <Alert key={index} className={`${colors.border} ${colors.secondary}`}>
                <alert.icon className="h-4 w-4" />
                <AlertDescription className="font-medium">
                  {alert.message}
                </AlertDescription>
              </Alert>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
  );
};

export default PageTemplate;
