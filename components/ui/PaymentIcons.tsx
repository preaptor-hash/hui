import React from 'react';

export const Visa = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="60" height="20" viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M23.016 0.366L18.892 19.348H13.682L9.558 0.366H23.016ZM55.518 0.366L50.482 19.348H45.542L40.506 0.366H55.518ZM38.438 0.366L34.148 19.348H28.938L33.228 0.366H38.438ZM9.112 0.366H0L0.082 0.952C4.186 1.944 7.644 4.544 9.472 7.652L10.026 10.428L11.838 1.922C11.968 1.01 11.458 0.366 10.518 0.366H9.112Z" fill="#1A1F71"/>
    <path d="M37.95 19.348H32.74L35.84 0.366H41.05L37.95 19.348Z" fill="#1A1F71"/>
  </svg>
);

export const Mastercard = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="50" height="40" viewBox="0 0 50 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="18" cy="18" r="14" fill="#EB001B"/>
    <circle cx="32" cy="18" r="14" fill="#F79E1B" fillOpacity="0.8"/>
    <text x="25" y="38" fill="black" textAnchor="middle" style={{ font: '600 8px sans-serif' }}>mastercard</text>
  </svg>
);

export const GPay = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="60" height="25" viewBox="0 0 60 25" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M10.14 11.23C10.14 10.66 10.09 10.08 9.99 9.53H5.17V11.42H7.96C7.84 12.18 7.4 12.83 6.77 13.25V14.48H8.7C9.82 13.44 10.14 12.44 10.14 11.23Z" fill="#4285F4"/>
    <path d="M5.17 16.3C6.56 16.3 7.72 15.84 8.7 14.48L6.77 13.25C6.23 13.62 5.53 13.84 4.83 13.84C3.49 13.84 2.35 12.93 1.94 11.71H0V13.21C0.85 14.9 2.58 16.3 5.17 16.3Z" fill="#34A853"/>
    <path d="M1.94 11.71C1.72 11.08 1.72 10.4 1.94 9.77V8.27H0C-0.21 9.01 -0.21 9.8 0 10.54V13.21H1.94V11.71Z" fill="#FBBC04"/>
    <path d="M5.17 8.27C5.9 8.27 6.6 8.54 7.12 9.06L8.49 7.69C7.62 6.88 6.42 6.44 5.17 6.44C2.58 6.44 0.85 7.84 0 9.53H1.94C2.35 8.31 3.49 7.4 5.17 7.4" fill="#EA4335"/>
    <text x="14" y="15" fill="black" style={{ font: 'bold 16px sans-serif' }}>Pay</text>
  </svg>
);

export const ApplePay = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="60" height="25" viewBox="0 0 60 25" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M8.52 14.73C7.38 14.73 6.3 13.9 5.86 12.78L5.78 12.56L5.7 12.78C5.26 13.9 4.18 14.73 3.04 14.73C1.36 14.73 0 13.37 0 11.69C0 10.01 1.36 8.65 3.04 8.65C4.18 8.65 5.26 9.48 5.7 10.6L5.78 10.82L5.86 10.6C6.3 9.48 7.38 8.65 8.52 8.65C10.2 8.65 11.56 10.01 11.56 11.69C11.56 13.37 10.2 14.73 8.52 14.73Z" fill="black"/>
    <path d="M5.78 8.5C5.78 6.95 6.44 5.5 7.54 4.5" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
    <text x="16" y="16" fill="black" style={{ font: 'bold 18px sans-serif' }}>Pay</text>
  </svg>
);
