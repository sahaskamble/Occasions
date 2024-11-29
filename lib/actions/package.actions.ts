'use server'

import Packages from "../models/Packages"

export async function getPackageById(packageId: string) {
  try {
    const response = await fetch(`/api/admin/package/${packageId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch package');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
