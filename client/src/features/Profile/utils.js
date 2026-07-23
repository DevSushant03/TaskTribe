export function getInitials(name = "", surname = "") {
  const first = name?.trim()?.[0] ?? "";
  const second = surname?.trim()?.[0] ?? "";
  return (first + second).toUpperCase() || "U";
}