# Dummy User Credentials for Testing

## Overview
This document contains the dummy user credentials for testing the SIH tourism platform. Each user has different roles and permissions.

## User Credentials

### 🎒 Tourist User
- **Username/Email:** `dave.tourist@test.com`
- **Password:** `dave`
- **Role:** Tourist
- **Phone:** +1234567890
- **Full Name:** Dave Tourist
- **Address:** 123 Adventure Street, Tourism City, TC 12345
- **Emergency Contact:** Sarah Tourist (+1234567891) - Spouse

**Features Access:**
- Browse tourism destinations
- Book services and products
- Create travel journals
- Access recommendations
- Use marketplace for local products

### 👑 Admin User
- **Username/Email:** `dave.admin@test.com` 
- **Password:** `dave`
- **Role:** Administrator
- **Phone:** +1234567892
- **Full Name:** Dave Administrator
- **Employee ID:** ADM-2025-001
- **Address:** 456 Management Boulevard, Admin City, AC 67890
- **Emergency Contact:** Mike Administrator (+1234567893) - Brother

**Features Access:**
- Access to admin dashboard
- Manage user accounts
- Approve/reject artisan registrations
- View system analytics
- Moderate content
- All tourist features

### 🎨 Artisan User
- **Username/Email:** `dave.artisan@test.com`
- **Password:** `dave` 
- **Role:** Artisan (Pre-approved)
- **Phone:** +1234567894
- **Full Name:** Dave Artisan
- **Business Name:** Dave's Traditional Crafts
- **Address:** 789 Craft Lane, Artisan Village, AV 54321
- **Aadhar Number:** 1234-5678-9012
- **Emergency Contact:** Lisa Artisan (+1234567895) - Sister

**Features Access:**
- List products and services in marketplace
- Manage inventory and orders
- Create business profile
- Access artisan-specific tools
- All tourist features

## Quick Login Instructions

1. Navigate to `/login` page
2. Select the appropriate role tab (Tourist/Admin/Artisan)
3. Choose "Login" instead of "Register"
4. Enter the email and password (`dave` for all users)
5. Click "Login"

## Technical Notes

- Users are automatically initialized when the app loads
- Data is stored in localStorage for persistence during development
- The artisan user is pre-approved to avoid the approval workflow during testing
- All users share the same password (`dave`) for simplicity during development

## Security Notice

⚠️ **IMPORTANT**: These are dummy credentials for development and testing only. Never use these credentials or this authentication system in production!

## Additional Features

- **Profile Management:** All users can update their profiles
- **Role-Based Access:** Features are restricted based on user roles  
- **Emergency Contacts:** All users have emergency contact information
- **Authentication State:** Login state persists across browser sessions
