'use client';

import { useState } from 'react';
import { Rocket, AlertTriangle, CheckCircle, RotateCcw, Download, Upload } from 'lucide-react';
import { MarketingConfig } from '@/lib/marketing/tracking-config';

interface DeploymentPanelProps {
  config: MarketingConfig;
  onDeploy: (config: MarketingConfig) => Promise<boolean>;
  onExport: () => void;
  onImport: (config: MarketingConfig) => void;
}

export default function DeploymentPanel({ config, onDeploy, onExport, onImport }: DeploymentPanelProps) {
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployStatus, setDeployStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [deployMessage, setDeployMessage] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeploy = async () => {
    if (!showConfirm) {
      setShowConfirm(true);
      return;
    }

    setIsDeploying(true);
    setDeployStatus('idle');
    setDeployMessage('');

    try {
      const success = await onDeploy(config);
      
      if (success) {
        setDeployStatus('success');
        setDeployMessage('Configuration deployed successfully! Changes will take effect after the next build.');
      } else {
        setDeployStatus('error');
        setDeployMessage('Deployment failed. Please check your configuration and try again.');
      }
    } catch (error) {
      setDeployStatus('error');
      setDeployMessage(error instanceof Error ? error.message : 'Unknown deployment error');
    } finally {
      setIsDeploying(false);
      setShowConfirm(false);
      setTimeout(() => {
        setDeployStatus('idle');
        setDeployMessage('');
      }, 10000);
    }
  };

  const handleExport = () => {
    onExport();
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const importedConfig = JSON.parse(content) as MarketingConfig;
        onImport(importedConfig);
        alert('Configuration imported successfully!');
      } catch (error) {
        alert('Failed to import configuration. Please check the file format.');
      }
    };
    reader.readAsText(file);
  };

  const isConfigValid = () => {
    return (config.ga4?.measurementId || config.metaPixel?.pixelId);
  };

  return (
    <div className="space-y-6">
      {/* Configuration Preview */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Configuration Preview
        </h3>

        <div className="space-y-4">
          {/* GA4 Configuration */}
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              Google Analytics 4
            </h4>
            {config.ga4 ? (
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Measurement ID:</span>
                  <span className="font-mono text-gray-900 dark:text-white">
                    {config.ga4.measurementId || 'Not configured'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Debug Mode:</span>
                  <span className={config.ga4.debugMode ? 'text-yellow-600' : 'text-gray-900 dark:text-white'}>
                    {config.ga4.debugMode ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Custom Events:</span>
                  <span className="text-gray-900 dark:text-white">
                    {config.ga4.customEvents.length}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">Not configured</p>
            )}
          </div>

          {/* Meta Pixel Configuration */}
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              Meta Pixel
            </h4>
            {config.metaPixel ? (
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Pixel ID:</span>
                  <span className="font-mono text-gray-900 dark:text-white">
                    {config.metaPixel.pixelId || 'Not configured'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Test Mode:</span>
                  <span className={config.metaPixel.testEventCode ? 'text-yellow-600' : 'text-gray-900 dark:text-white'}>
                    {config.metaPixel.testEventCode ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Active Events:</span>
                  <span className="text-gray-900 dark:text-white">
                    {config.metaPixel.standardEvents.filter(e => e.enabled).length}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">Not configured</p>
            )}
          </div>
        </div>

        <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
          Last updated: {new Date(config.lastUpdated).toLocaleString()}
        </div>
      </div>

      {/* Deployment Actions */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Deploy Configuration
        </h3>

        {!showConfirm ? (
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-800 dark:text-yellow-300">
                <strong>Important:</strong> Deploying will save the configuration. The tracking scripts will be loaded site-wide after deployment and require a rebuild to take effect.
              </div>
            </div>

            <button
              onClick={handleDeploy}
              disabled={!isConfigValid() || isDeploying}
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <Rocket className="w-5 h-5" />
              {isDeploying ? 'Deploying...' : 'Deploy Site-Wide'}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-red-800 dark:text-red-300">
                <strong>Confirm Deployment:</strong> Are you sure you want to deploy this configuration site-wide? This action will affect all visitors.
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleDeploy}
                disabled={isDeploying}
                className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeploying ? 'Deploying...' : 'Yes, Deploy Now'}
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                disabled={isDeploying}
                className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {deployStatus !== 'idle' && (
          <div className={`mt-4 p-4 rounded-lg flex items-start gap-3 ${
            deployStatus === 'success'
              ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
              : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
          }`}>
            {deployStatus === 'success' ? (
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            )}
            <div className={`text-sm ${
              deployStatus === 'success'
                ? 'text-green-800 dark:text-green-300'
                : 'text-red-800 dark:text-red-300'
            }`}>
              {deployMessage}
            </div>
          </div>
        )}
      </div>

      {/* Import/Export */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Import / Export Configuration
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button
            onClick={handleExport}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export Configuration
          </button>

          <label className="flex items-center justify-center gap-2 bg-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-purple-700 transition-colors cursor-pointer">
            <Upload className="w-4 h-4" />
            Import Configuration
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </label>
        </div>

        <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
          Export your configuration to back it up or share it. Import a previously saved configuration to restore settings.
        </p>
      </div>
    </div>
  );
}

