// Storage interface for contact form submissions (in-memory)
export interface IStorage {
  // Contact form submissions stored in memory for this session
}

export class MemStorage implements IStorage {
  constructor() {
    // In-memory storage - no persistence needed for contact forms
    // Emails are sent directly to Gmail
  }
}

export const storage = new MemStorage();
