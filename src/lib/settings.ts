import { db } from './firebase-config';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

export interface SystemSettings {
  departments: string[];
  positions: string[]; // Chức vụ: Nhân viên, Trưởng phòng, Phó phòng...
  locations: string[];
  jobTypes: string[];
  expertiseLevels: string[]; // Cấp bậc: Junior, Senior, Lead...
  skills: string[];
}

const SETTINGS_DOC_ID = 'system';
const SETTINGS_COLLECTION = 'settings';

// Default settings for initial setup
export const DEFAULT_SETTINGS: SystemSettings = {
  departments: [
    'Phát triển sản phẩm',
    'Công nghệ',
    'Kinh doanh',
    'Marketing',
    'Nhân sự',
    'Kế toán',
  ],
  positions: [
    'Nhân viên',
    'Chuyên viên',
    'Trưởng nhóm',
    'Phó phòng',
    'Trưởng phòng',
    'Giám đốc',
  ],
  locations: [
    'Hà Nội',
    'TP.HCM',
    'Đà Nẵng',
    'Remote',
    'Hybrid',
  ],
  jobTypes: [
    'Full-time',
    'Part-time',
    'Contract',
    'Internship',
  ],
  expertiseLevels: [
    'Intern',
    'Fresher',
    'Junior',
    'Mid-level',
    'Senior',
    'Lead',
    'Manager',
  ],
  skills: [
    'React',
    'Vue.js',
    'Angular',
    'Node.js',
    'Python',
    'Java',
    'C#',
    'PHP',
    'React Native',
    'Flutter',
    'iOS',
    'Android',
    'AWS',
    'Azure',
    'Docker',
    'Kubernetes',
    'MongoDB',
    'PostgreSQL',
    'MySQL',
    'Firebase',
    'Git',
    'Agile',
    'Scrum',
    'UI/UX',
    'Figma',
    'Photoshop',
  ],
};

/**
 * Get all system settings
 */
export async function getSettings(): Promise<SystemSettings> {
  try {
    const docRef = doc(db, SETTINGS_COLLECTION, SETTINGS_DOC_ID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as SystemSettings;
    } else {
      // If settings don't exist, create default settings
      await setDoc(docRef, DEFAULT_SETTINGS);
      return DEFAULT_SETTINGS;
    }
  } catch (error) {
    console.error('Error getting settings:', error);
    throw error;
  }
}

/**
 * Update system settings
 */
export async function updateSettings(settings: Partial<SystemSettings>): Promise<void> {
  try {
    const docRef = doc(db, SETTINGS_COLLECTION, SETTINGS_DOC_ID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(docRef, settings);
    } else {
      await setDoc(docRef, { ...DEFAULT_SETTINGS, ...settings });
    }
  } catch (error) {
    console.error('Error updating settings:', error);
    throw error;
  }
}

/**
 * Add item to a settings list
 */
export async function addSettingItem(
  category: keyof SystemSettings,
  item: string
): Promise<void> {
  try {
    const settings = await getSettings();
    if (!settings[category].includes(item.trim())) {
      settings[category] = [...settings[category], item.trim()].sort();
      await updateSettings({ [category]: settings[category] });
    }
  } catch (error) {
    console.error(`Error adding ${category} item:`, error);
    throw error;
  }
}

/**
 * Remove item from a settings list
 */
export async function removeSettingItem(
  category: keyof SystemSettings,
  item: string
): Promise<void> {
  try {
    const settings = await getSettings();
    settings[category] = settings[category].filter((i) => i !== item);
    await updateSettings({ [category]: settings[category] });
  } catch (error) {
    console.error(`Error removing ${category} item:`, error);
    throw error;
  }
}

/**
 * Update item in a settings list
 */
export async function updateSettingItem(
  category: keyof SystemSettings,
  oldItem: string,
  newItem: string
): Promise<void> {
  try {
    const settings = await getSettings();
    const index = settings[category].indexOf(oldItem);
    if (index !== -1) {
      settings[category][index] = newItem.trim();
      settings[category] = settings[category].sort();
      await updateSettings({ [category]: settings[category] });
    }
  } catch (error) {
    console.error(`Error updating ${category} item:`, error);
    throw error;
  }
}

/**
 * Initialize settings with default values (for setup)
 */
export async function initializeSettings(): Promise<void> {
  try {
    const docRef = doc(db, SETTINGS_COLLECTION, SETTINGS_DOC_ID);
    await setDoc(docRef, DEFAULT_SETTINGS);
    console.log('✅ Settings initialized successfully');
  } catch (error) {
    console.error('Error initializing settings:', error);
    throw error;
  }
}
