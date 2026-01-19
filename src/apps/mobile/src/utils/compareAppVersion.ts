export function compareAppVersions(version1?: string, version2?: string): boolean {
  if (!version1 || !version2) {
    return false;
  }

  return isVersionLess(version1, version2);
}

// function isVersionGreater(version1: string, version2: string): boolean {
//   return (
//     version1.localeCompare(version2, undefined, {
//       numeric: true,
//       sensitivity: 'base',
//     }) > 0
//   );
// }

function isVersionLess(version1: string, version2: string): boolean {
  return (
    version1.localeCompare(version2, undefined, {
      numeric: true,
      sensitivity: "base",
    }) < 0
  );
}
