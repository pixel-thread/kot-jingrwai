type Props = {
  backendDate: string;
  sqliteDate: number;
};

export function isBackendNewer({ backendDate, sqliteDate }: Props): boolean {
  if (!backendDate || !sqliteDate) return false;
  const timeBackend = new Date(backendDate);
  const backendTimestamp = Math.floor(timeBackend.getTime() / 1000); // Convert to seconds
  return backendTimestamp > sqliteDate;
}
