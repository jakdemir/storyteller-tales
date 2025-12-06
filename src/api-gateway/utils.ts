// API Gateway Utilities

/**
 * Extract error message safely from unknown error types
 */
export const extractErrorMessage = (error: unknown): string => {
  return error instanceof Error ? error.message : 'Unknown error';
};

/**
 * Check if error message indicates a "not found" condition
 */
export const isNotFoundError = (errorMessage: string): boolean => {
  return errorMessage.includes('not found') || errorMessage.includes('Not found');
};

/**
 * Check if error message indicates a service unavailability
 */
export const isServiceUnavailableError = (errorMessage: string): boolean => {
  return (
    errorMessage.includes('AI service') ||
    errorMessage.includes('unavailable') ||
    errorMessage.includes('complete')
  );
};
