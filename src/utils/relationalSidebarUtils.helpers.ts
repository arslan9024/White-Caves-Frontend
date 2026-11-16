// @ts-nocheck
import { ASSISTANTS, DEPARTMENTS } from './relationalSidebarUtils.constants';

/**
 * Filter assistants based on selected department
 * @param {string} departmentId - Selected department ID
 * @param {Object} userPermissions - User's access permissions
 * @returns {Array} Filtered assistants
 */
export const filterAssistantsByDepartment = (departmentId, userPermissions = {}) => {
  try {
    return Object.entries(ASSISTANTS)
      .filter(([id, assistant]) => {
        const isInDepartment = assistant.departments.includes(departmentId);
        const hasPermission = userPermissions[id] !== false;
        return isInDepartment && hasPermission;
      })
      .map(([id, assistant]) => ({ id, ...assistant }));
  } catch (error) {
    return [];
  }
};

/**
 * Filter assistants based on selected service
 * @param {string} serviceId - Selected service ID
 * @param {Object} userPermissions - User's access permissions
 * @returns {Array} Filtered assistants
 */
export const filterAssistantsByService = (serviceId, userPermissions = {}) => {
  try {
    return Object.entries(ASSISTANTS)
      .filter(([id, assistant]) => {
        const isInService = assistant.services.includes(serviceId);
        const hasPermission = userPermissions[id] !== false;
        return isInService && hasPermission;
      })
      .map(([id, assistant]) => ({ id, ...assistant }));
  } catch (error) {
    return [];
  }
};

/**
 * Filter services based on selected assistant
 * @param {string} assistantId - Selected assistant ID
 * @returns {Array} Services the assistant can access
 */
export const filterServicesByAssistant = (assistantId) => {
  try {
    const assistant = ASSISTANTS[assistantId];
    if (!assistant) return [];
    return assistant.services || [];
  } catch (error) {
    return [];
  }
};

/**
 * Filter departments based on selected assistant
 * @param {string} assistantId - Selected assistant ID
 * @returns {Array} Departments the assistant works in
 */
export const filterDepartmentsByAssistant = (assistantId) => {
  try {
    const assistant = ASSISTANTS[assistantId];
    if (!assistant) return [];
    return assistant.departments || [];
  } catch (error) {
    return [];
  }
};

/**
 * Get default assistant selection based on department or user history
 * @param {string} departmentId - Selected department
 * @param {Array} selectionHistory - User's selection history
 * @param {Object} userPermissions - User permissions
 * @returns {string} Assistant ID to select
 */
export const getDefaultAssistant = (
  departmentId,
  selectionHistory = [],
  userPermissions = {}
) => {
  try {
    const lastAssistantInDept = selectionHistory
      .reverse()
      .find((item) => {
        if (item.type !== 'assistant') return false;
        const assistant = ASSISTANTS[item.id];
        return assistant?.departments.includes(departmentId);
      });

    if (lastAssistantInDept) return lastAssistantInDept.id;

    const filtered = filterAssistantsByDepartment(departmentId, userPermissions);
    return filtered.length > 0 ? filtered[0].id : null;
  } catch (error) {
    return null;
  }
};

/**
 * Get default department based on user history
 * @param {Array} selectionHistory - User's selection history
 * @returns {string} Department ID to select
 */
export const getDefaultDepartment = (selectionHistory = []) => {
  try {
    const lastDept = selectionHistory
      .reverse()
      .find((item) => item.type === 'department');

    if (lastDept) return lastDept.id;

    return DEPARTMENTS[0];
  } catch (error) {
    return DEPARTMENTS[0];
  }
};

/**
 * Get context options for selected assistant
 * @param {string} assistantId - Assistant ID
 * @returns {Array} Available contexts for this assistant
 */
export const getContextsForAssistant = (assistantId) => {
  try {
    const assistant = ASSISTANTS[assistantId];
    if (!assistant) return [];
    return assistant.contexts || [];
  } catch (error) {
    return [];
  }
};

/**
 * Check if assistant+context combination exists
 * @param {string} assistantId - Assistant ID
 * @param {string} context - Context name
 * @returns {boolean}
 */
export const isValidAssistantContext = (assistantId, context) => {
  try {
    const assistant = ASSISTANTS[assistantId];
    if (!assistant) return false;
    return assistant.contexts.includes(context);
  } catch (error) {
    return false;
  }
};

/**
 * Build complete relationship map
 * Maps all department -> assistants and assistants -> services relationships
 * @param {Object} userPermissions - User permissions
 * @returns {Object} Complete relationship map
 */
export const buildRelationshipMap = (userPermissions = {}) => {
  try {
    const map = {
      departmentAssistants: {},
      assistantDepartments: {},
      assistantServices: {},
      serviceAssistants: {},
    };

    DEPARTMENTS.forEach((dept) => {
      map.departmentAssistants[dept] = filterAssistantsByDepartment(
        dept,
        userPermissions
      ).map((a) => a.id);
    });

    Object.entries(ASSISTANTS).forEach(([id, assistant]) => {
      if (userPermissions[id] !== false) {
        map.assistantDepartments[id] = assistant.departments;
        map.assistantServices[id] = assistant.services;

        assistant.services.forEach((service) => {
          if (!map.serviceAssistants[service]) {
            map.serviceAssistants[service] = [];
          }
          map.serviceAssistants[service].push(id);
        });
      }
    });

    return map;
  } catch (error) {
    return {};
  }
};

/**
 * Get sidebar render configuration based on current selections
 * @param {string} selectedAssistant - Currently selected assistant
 * @param {string} selectedDepartment - Currently selected department
 * @param {string} activeContext - Currently active context
 * @returns {Object} Configuration for what sidebars to show
 */
export const getSidebarRenderConfig = (
  selectedAssistant,
  selectedDepartment,
  activeContext
) => {
  try {
    return {
      showLeftSidebar: true,
      showRightSidebar: true,
      showFeatureSidebar:
        selectedAssistant && activeContext
          ? isValidAssistantContext(selectedAssistant, activeContext)
          : false,
      featureSidebarType: activeContext,
      breadcrumb: {
        department: selectedDepartment,
        service: filterServicesByAssistant(selectedAssistant)[0] || null,
        assistant: selectedAssistant,
        context: activeContext,
      },
    };
  } catch (error) {
    return {
      showLeftSidebar: true,
      showRightSidebar: true,
      showFeatureSidebar: false,
    };
  }
};

