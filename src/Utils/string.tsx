export const slice = (string: string, limit: number = 200) => {
  return string.length > limit
    ? string.slice(0, limit) + '...'
    : string;
}

export const isValidEmail = (email: string) => {
  const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  return regex.test(email);
}

export const numberFormat = (value: any) =>
  new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD'
  }).format(value);

export const capitalize = (s: string) => (s && s[0].toUpperCase() + s.slice(1)) || ""
