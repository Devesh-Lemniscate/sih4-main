// Simple in-memory/localStorage mock API to simulate OTP, registration, and approvals
// This is for frontend development only.

type UserRole = "tourist" | "artisan" | "admin";

export type TouristSignup = {
  fullName: string;
  email: string;
  phone?: string;
  address: string;
  gender: string;
  dateOfBirth: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelation: string;
  password: string;
};

export type ArtisanSignup = {
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  address: string;
  gender: string;
  dateOfBirth: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelation: string;
  aadharNumber: string;
  password: string;
};

export type AdminSignup = {
  fullName: string;
  email: string;
  phone?: string;
  address: string;
  gender: string;
  dateOfBirth: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelation: string;
  employeeId: string;
  password: string;
};

type StoredUser = {
  id: string;
  role: UserRole;
  email: string;
  phone?: string;
  approved?: boolean; // for artisans
  data: Record<string, unknown>;
  password: string; // plaintext for mock
};

type OtpEntry = {
  code: string; // 6 digits
  target: string; // email or phone
  channel: "email" | "phone";
  expiresAt: number; // epoch ms
};

const STORAGE_KEYS = {
  users: "mock_users",
  otps: "mock_otps",
};

function readUsers(): StoredUser[] {
  const raw = localStorage.getItem(STORAGE_KEYS.users);
  return raw ? (JSON.parse(raw) as StoredUser[]) : [];
}

function writeUsers(users: StoredUser[]) {
  localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
}

function readOtps(): OtpEntry[] {
  const raw = localStorage.getItem(STORAGE_KEYS.otps);
  return raw ? (JSON.parse(raw) as OtpEntry[]) : [];
}

function writeOtps(otps: OtpEntry[]) {
  localStorage.setItem(STORAGE_KEYS.otps, JSON.stringify(otps));
}

function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function delay<T>(value: T, ms = 600): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export async function sendEmailOtp(email: string) {
  const code = generateOtp();
  const otps = readOtps().filter((o) => o.target !== email || o.channel !== "email");
  otps.push({ code, target: email, channel: "email", expiresAt: Date.now() + 5 * 60 * 1000 });
  writeOtps(otps);
  return delay({ success: true, message: `OTP sent to ${email}`, code });
}

export async function sendPhoneOtp(phone: string) {
  const code = generateOtp();
  const otps = readOtps().filter((o) => o.target !== phone || o.channel !== "phone");
  otps.push({ code, target: phone, channel: "phone", expiresAt: Date.now() + 5 * 60 * 1000 });
  writeOtps(otps);
  return delay({ success: true, message: `OTP sent to ${phone}`, code });
}

export async function verifyEmailOtp(email: string, code: string) {
  const otps = readOtps();
  const entry = otps.find((o) => o.target === email && o.channel === "email");
  const ok = !!entry && entry.code === code && entry.expiresAt > Date.now();
  return delay({ success: ok, message: ok ? "Email verified" : "Invalid or expired OTP" });
}

export async function verifyPhoneOtp(phone: string, code: string) {
  const otps = readOtps();
  const entry = otps.find((o) => o.target === phone && o.channel === "phone");
  const ok = !!entry && entry.code === code && entry.expiresAt > Date.now();
  return delay({ success: ok, message: ok ? "Phone verified" : "Invalid or expired OTP" });
}

export async function registerTourist(payload: TouristSignup) {
  const users = readUsers();
  if (users.find((u) => u.email === payload.email)) {
    return delay({ success: false, message: "Email already registered" });
  }
  users.push({
    id: crypto.randomUUID(),
    role: "tourist",
    email: payload.email,
    phone: payload.phone,
    password: payload.password,
    data: { 
      fullName: payload.fullName,
      address: payload.address,
      gender: payload.gender,
      dateOfBirth: payload.dateOfBirth,
      emergencyContactName: payload.emergencyContactName,
      emergencyContactPhone: payload.emergencyContactPhone,
      emergencyContactRelation: payload.emergencyContactRelation
    },
  });
  writeUsers(users);
  return delay({ success: true, message: "Registration successful" });
}

export async function registerArtisan(payload: ArtisanSignup) {
  const users = readUsers();
  if (users.find((u) => u.email === payload.email)) {
    return delay({ success: false, message: "Email already registered" });
  }
  users.push({
    id: crypto.randomUUID(),
    role: "artisan",
    email: payload.email,
    phone: payload.phone,
    password: payload.password,
    approved: false,
    data: {
      fullName: payload.fullName,
      businessName: payload.businessName,
      address: payload.address,
      gender: payload.gender,
      dateOfBirth: payload.dateOfBirth,
      emergencyContactName: payload.emergencyContactName,
      emergencyContactPhone: payload.emergencyContactPhone,
      emergencyContactRelation: payload.emergencyContactRelation,
      aadharNumber: payload.aadharNumber,
    },
  });
  writeUsers(users);
  return delay({ success: true, message: "Registered. Awaiting admin approval." });
}

export async function registerAdmin(payload: AdminSignup) {
  const users = readUsers();
  if (users.find((u) => u.email === payload.email)) {
    return delay({ success: false, message: "Email already registered" });
  }
  users.push({
    id: crypto.randomUUID(),
    role: "admin",
    email: payload.email,
    phone: payload.phone,
    password: payload.password,
    data: { 
      fullName: payload.fullName, 
      address: payload.address,
      gender: payload.gender,
      dateOfBirth: payload.dateOfBirth,
      emergencyContactName: payload.emergencyContactName,
      emergencyContactPhone: payload.emergencyContactPhone,
      emergencyContactRelation: payload.emergencyContactRelation,
      employeeId: payload.employeeId 
    },
  });
  writeUsers(users);
  return delay({ success: true, message: "Admin registration successful" });
}

export async function loginUser(identifier: string, password: string) {
  const users = readUsers();
  const user = users.find((u) => u.email === identifier || u.phone === identifier);
  if (!user || user.password !== password) {
    return delay({ success: false, message: "Invalid credentials" });
  }
  if (user.role === "artisan" && user.approved === false) {
    return delay({ success: false, message: "Artisan not approved yet" });
  }
  const fullName = (user.data?.fullName as string) || "User";
  const address = (user.data?.address as string) || "";
  const gender = (user.data?.gender as string) || "";
  const dateOfBirth = (user.data?.dateOfBirth as string) || "";
  const emergencyContactName = (user.data?.emergencyContactName as string) || "";
  const emergencyContactPhone = (user.data?.emergencyContactPhone as string) || "";
  const emergencyContactRelation = (user.data?.emergencyContactRelation as string) || "";
  return delay({ 
    success: true, 
    role: user.role as UserRole, 
    email: user.email, 
    phone: user.phone, 
    fullName, 
    address, 
    gender,
    dateOfBirth,
    emergencyContactName,
    emergencyContactPhone,
    emergencyContactRelation
  });
}

export async function getPendingArtisans() {
  const users = readUsers();
  const list = users.filter((u) => u.role === "artisan" && u.approved === false);
  return delay({ success: true, artisans: list });
}

export async function approveArtisan(email: string) {
  const users = readUsers();
  const idx = users.findIndex((u) => u.role === "artisan" && u.email === email);
  if (idx === -1) return delay({ success: false, message: "Artisan not found" });
  users[idx].approved = true;
  writeUsers(users);
  return delay({ success: true });
}

// Initialize dummy users for testing
export function initializeDummyUsers() {
  const users = readUsers();
  
  // Check if dummy users already exist
  const existingUserEmails = users.map(u => u.email);
  const dummyEmails = ['dave.tourist@test.com', 'dave.admin@test.com', 'dave.artisan@test.com'];
  
  if (dummyEmails.every(email => existingUserEmails.includes(email))) {
    return; // Dummy users already exist
  }

  // Create dummy users
  const dummyUsers: StoredUser[] = [
    // Tourist User
    {
      id: "tourist-dave-001",
      role: "tourist",
      email: "dave.tourist@test.com",
      phone: "+1234567890",
      approved: true,
      password: "dave", // As requested
      data: {
        fullName: "Dave Tourist",
        address: "123 Adventure Street, Tourism City, TC 12345",
        gender: "Male",
        dateOfBirth: "1990-01-15",
        emergencyContactName: "Sarah Tourist",
        emergencyContactPhone: "+1234567891",
        emergencyContactRelation: "Spouse"
      }
    },
    // Admin User
    {
      id: "admin-dave-001",
      role: "admin",
      email: "dave.admin@test.com",
      phone: "+1234567892",
      approved: true,
      password: "dave", // As requested
      data: {
        fullName: "Dave Administrator",
        address: "456 Management Boulevard, Admin City, AC 67890",
        gender: "Male",
        dateOfBirth: "1985-03-22",
        emergencyContactName: "Mike Administrator",
        emergencyContactPhone: "+1234567893",
        emergencyContactRelation: "Brother",
        employeeId: "ADM-2025-001"
      }
    },
    // Artisan User
    {
      id: "artisan-dave-001",
      role: "artisan",
      email: "dave.artisan@test.com",
      phone: "+1234567894",
      approved: true, // Pre-approved for testing
      password: "dave", // As requested
      data: {
        fullName: "Dave Artisan",
        businessName: "Dave's Traditional Crafts",
        address: "789 Craft Lane, Artisan Village, AV 54321",
        gender: "Male",
        dateOfBirth: "1988-07-10",
        emergencyContactName: "Lisa Artisan",
        emergencyContactPhone: "+1234567895",
        emergencyContactRelation: "Sister",
        aadharNumber: "1234-5678-9012"
      }
    }
  ];

  // Add dummy users to existing users (avoid duplicates)
  dummyUsers.forEach(dummyUser => {
    if (!users.find(u => u.email === dummyUser.email)) {
      users.push(dummyUser);
    }
  });

  writeUsers(users);
  console.log('Dummy users initialized successfully!');
}

export function resetAndInitializeDummyUsers() {
  // Clear all existing users
  localStorage.removeItem(STORAGE_KEYS.users);
  localStorage.removeItem(STORAGE_KEYS.otps);
  
  // Initialize fresh dummy users
  initializeDummyUsers();
  
  console.log('All users reset and dummy users re-initialized!');
  return {
    success: true,
    message: 'Dummy users have been reset and re-initialized',
    users: [
      { role: 'tourist', email: 'dave.tourist@test.com', password: 'dave' },
      { role: 'admin', email: 'dave.admin@test.com', password: 'dave' },
      { role: 'artisan', email: 'dave.artisan@test.com', password: 'dave' }
    ]
  };
}

// Export for console access during development
if (typeof window !== 'undefined') {
  interface WindowWithHelpers extends Window {
    resetDummyUsers?: () => { success: boolean; message: string; users: Array<{ role: string; email: string; password: string }> };
    initDummyUsers?: () => void;
  }
  (window as WindowWithHelpers).resetDummyUsers = resetAndInitializeDummyUsers;
  (window as WindowWithHelpers).initDummyUsers = initializeDummyUsers;
}

// Auto-initialize dummy users when this module is loaded
if (typeof window !== 'undefined') {
  // Only run in browser environment
  setTimeout(() => {
    initializeDummyUsers();
  }, 100);
}
