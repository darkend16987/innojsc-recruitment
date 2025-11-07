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
    'Ban giám đốc',
    'Kiến trúc',
    'BIM',
    'Nội thất',
    'Cảnh quan',
    'Kết cấu',
    'MEP - Điện, điện nhẹ',
    'MEP - Cấp thoát nước',
    'MEP - HVAC',
    'Phòng cháy chữa cháy',
    'Hạ tầng',
    'Hành chính',
    'Nhân sự',
    'Đào tạo',
    'Marketing',
    'IT',
    'Kế toán',
    'Hợp đồng - Thầu',
    'Kế hoạch - Đầu tư',
    'Tài chính, kinh doanh',
  ],
  positions: [
    'Giám đốc',
    'Phó giám đốc',
    'Trưởng phòng',
    'Phó phòng',
    'Trưởng nhóm',
    'Kiến trúc sư chính',
    'Kiến trúc sư',
    'Kỹ sư trưởng',
    'Kỹ sư',
    'Chuyên viên',
    'Nhân viên',
    'Cộng tác viên',
    'Thực tập sinh',
  ],
  locations: [
    'Hà Nội',
    'TP.HCM',
  ],
  jobTypes: [
    'Toàn thời gian',
    'Part-time',
    'Cộng tác viên',
    'Học việc',
    'Chuyên gia',
    'Thực tập',
  ],
  expertiseLevels: [
    'Thực tập',
    'Vừa tốt nghiệp',
    'Junior',
    'Mid-Level',
    'Senior',
    'Expert',
  ],
  skills: [
    // Software - Architecture & Design
    'AutoCAD',
    'Revit',
    'ArchiCAD',
    'SketchUp',
    '3ds Max',
    'V-Ray',
    'Lumion',
    'Enscape',
    'Rhino',
    'Grasshopper',

    // Software - Structure
    'Etabs',
    'SAP2000',
    'Safe',
    'Tekla Structures',
    'STAAD.Pro',

    // Software - MEP
    'AutoCAD MEP',
    'Revit MEP',

    // Software - BIM
    'Navisworks',
    'BIM 360',
    'Solibri',

    // Software - Project Management
    'MS Project',
    'Primavera P6',

    // Software - Office & Design
    'MS Word',
    'MS Excel',
    'MS PowerPoint',
    'Photoshop',
    'Illustrator',
    'InDesign',
    'CorelDRAW',

    // Software - Rendering & Visualization
    'Corona Renderer',
    'KeyShot',
    'Twinmotion',

    // Languages
    'Tiếng Anh',
    'Tiếng Nhật',
    'Tiếng Hàn',

    // Technical Skills
    'Đọc bản vẽ kỹ thuật',
    'Thiết kế kiến trúc',
    'Thiết kế nội thất',
    'Thiết kế cảnh quan',
    'Tính toán kết cấu',
    'Thiết kế MEP',
    'Quản lý dự án',
    'Giám sát thi công',
    'Lập dự toán',
    'Lập hồ sơ thầu',
    'Nghiệm thu công trình',
    'BIM Coordinator',
    'BIM Manager',
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
