export interface ValidationError {
  field: string;
  message: string;
}

export const validateEmail = (email: string): ValidationError | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return { field: 'email', message: 'Email is required' };
  }
  if (!emailRegex.test(email)) {
    return { field: 'email', message: 'Please enter a valid email' };
  }
  return null;
};

export const validatePassword = (password: string): ValidationError | null => {
  if (!password) {
    return { field: 'password', message: 'Password is required' };
  }
  if (password.length < 8) {
    return { field: 'password', message: 'Password must be at least 8 characters' };
  }
  if (!/[A-Z]/.test(password)) {
    return { field: 'password', message: 'Password must contain an uppercase letter' };
  }
  if (!/[0-9]/.test(password)) {
    return { field: 'password', message: 'Password must contain a number' };
  }
  return null;
};

export const validatePasswordMatch = (password: string, confirm: string): ValidationError | null => {
  if (password !== confirm) {
    return { field: 'confirmPassword', message: 'Passwords do not match' };
  }
  return null;
};

export const validateFirstName = (firstName: string): ValidationError | null => {
  if (!firstName) {
    return { field: 'firstName', message: 'First name is required' };
  }
  if (firstName.length < 2) {
    return { field: 'firstName', message: 'First name must be at least 2 characters' };
  }
  return null;
};

export const validatePhone = (phone: string): ValidationError | null => {
  if (!phone) {
    return { field: 'phone', message: 'Phone number is required' };
  }
  // Basic Ugandan phone validation
  const phoneRegex = /^(\+256|0)[0-9]{9}$/;
  if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
    return { field: 'phone', message: 'Please enter a valid Ugandan phone number' };
  }
  return null;
};
