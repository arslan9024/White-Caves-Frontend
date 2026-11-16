import React, { useState, useCallback } from 'react';
import { ChevronDown, ChevronRight, Zap, FileText } from 'lucide-react';
import { COMPANY_SERVICES, getServicesByCategory } from '../../data/services/companyServices';
import { SERVICE_CATEGORIES, DemoLogEntry } from './ServiceDemoMode.types';
import { ServiceMainPanel } from './ServiceMainPanel';
import './ServiceDemoMode.css';

const ServiceDemoMode = () => {
  const [selectedCategory, setSelectedCategory] = useState('sales');
  const [selectedService, setSelectedService] = useState<any>(null);
  const [currentStageIndex, setCurrentStageIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [demoLog, setDemoLog] = useState<DemoLogEntry[]>([]);
  const [expandedCategories, setExpandedCategories] = useState(['sales']);

  const currentStage = selectedService?.stages?.[currentStageIndex] || null;

  const addLogEntry = useCallback((message: string, type: any = 'info') => {
    setDemoLog(prev =>
      [
        ...prev,
        {
          id: Date.now(),
          timestamp: new Date().toLocaleTimeString(),
          message,
          type,
        },
      ].slice(-20)
    );
  }, []);

  const handleSelectService = (service: any) => {
    setSelectedService(service);
    setCurrentStageIndex(-1);
    setIsPlaying(false);
    setDemoLog([]);
    addLogEntry(`Selected service: ${service.name}`, 'system');
    addLogEntry(`This workflow has ${service.stages?.length || 0} stages`, 'info');
    addLogEntry(
      `Assigned AI assistants: ${service.assistants?.map((a: string) => a.charAt(0).toUpperCase() + a.slice(1)).join(', ')}`,
      'info'
    );
  };

  const handleNextStage = useCallback(() => {
    if (!selectedService?.stages) return;

    if (currentStageIndex < selectedService.stages.length - 1) {
      const nextIndex = currentStageIndex + 1;
      const nextStage = selectedService.stages[nextIndex];
      setCurrentStageIndex(nextIndex);
      addLogEntry(`Stage ${nextIndex + 1}: ${nextStage.name}`, 'stage');

      if (nextStage.actions) {
        nextStage.actions.forEach((action: string, idx: number) => {
          setTimeout(
            () => {
              addLogEntry(`  • ${action}`, 'action');
            },
            (idx + 1) * 300
          );
        });
      }
    } else {
      setIsPlaying(false);
      addLogEntry('Workflow completed successfully!', 'success');
    }
  }, [selectedService, currentStageIndex, addLogEntry]);

  const handlePlayPause = () => {
    if (!selectedService) return;

    if (currentStageIndex === -1) {
      addLogEntry('Starting workflow demonstration...', 'system');
      handleNextStage();
    }

    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setCurrentStageIndex(-1);
    setIsPlaying(false);
    setDemoLog([]);
    if (selectedService) {
      addLogEntry(`Reset workflow: ${selectedService.name}`, 'system');
    }
  };

  const handleStageClick = (stage: any, index: number) => {
    setCurrentStageIndex(index);
    addLogEntry(`Jumped to stage: ${stage.name}`, 'system');
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId) ? prev.filter(c => c !== categoryId) : [...prev, categoryId]
    );
    setSelectedCategory(categoryId);
  };

  React.useEffect(() => {
    let interval: any;
    if (isPlaying && selectedService && currentStageIndex < selectedService.stages.length - 1) {
      interval = setInterval(() => {
        handleNextStage();
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStageIndex, selectedService, handleNextStage]);

  return (
    <div className="service-demo-mode">
      <div className="demo-header">
        <div className="demo-title">
          <Zap size={24} />
          <h2>Service Workflow Demo</h2>
        </div>
        <p className="demo-description">
          Interactive demonstration of White Caves' 35 service workflows. Select a service to
          explore the end-to-end process.
        </p>
      </div>

      <div className="demo-content">
        <aside className="service-selector">
          <h3>Select Service</h3>
          <div className="category-list">
            {SERVICE_CATEGORIES.map(category => {
              const categoryServices = (COMPANY_SERVICES as any)[category.id] || [];
              const isExpanded = expandedCategories.includes(category.id);

              return (
                <div key={category.id} className="category-section">
                  <button
                    className={`category-header ${selectedCategory === category.id ? 'active' : ''}`}
                    onClick={() => toggleCategory(category.id)}
                    style={{ '--category-color': category.color } as any}
                  >
                    <span className="category-icon">{category.icon}</span>
                    <span className="category-name">{category.label}</span>
                    <span className="category-count">{categoryServices.length}</span>
                    {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>

                  {isExpanded && (
                    <div className="service-list">
                      {categoryServices.map((service: any) => (
                        <button
                          key={service.id}
                          className={`service-item ${selectedService?.id === service.id ? 'selected' : ''}`}
                          onClick={() => handleSelectService(service)}
                        >
                          <span className="service-icon">{service.icon}</span>
                          <div className="service-info">
                            <span className="service-name">{service.name}</span>
                            <span className="service-meta">
                              {service.stages?.length || 0} stages
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </aside>

        <main className="demo-main">
          <ServiceMainPanel
            selectedService={selectedService}
            currentStageIndex={currentStageIndex}
            currentStage={currentStage}
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
            onNextStage={handleNextStage}
            onReset={handleReset}
            onStageClick={handleStageClick}
          />
        </main>

        <aside className="demo-log">
          <h4>
            <FileText size={16} />
            Activity Log
          </h4>
          <div className="log-entries">
            {demoLog.length === 0 ? (
              <div className="log-empty">Select a service and start the demo to see activity</div>
            ) : (
              demoLog.map(entry => (
                <div key={entry.id} className={`log-entry log-${entry.type}`}>
                  <span className="log-time">{entry.timestamp}</span>
                  <span className="log-message">{entry.message}</span>
                </div>
              ))
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ServiceDemoMode;

