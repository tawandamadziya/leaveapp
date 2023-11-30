// // msalProvider.tsx
// import React, { ReactNode, createContext, useContext } from 'react';
// import MsalProvider from 'react-native-msal';
// import { msalConfig } from './msalConfig';

// const MsalContext = createContext<any | undefined>(undefined);

// const MsalAuthProvider: React.FC = ({ children }: { children: ReactNode}) => {
//   return (
//     <MsalProvider
//       config={msalConfig}
//       context={MsalContext}
//     >
//       {children}
//     </MsalProvider>
//   );
// };

// const useMsal = () => {
//   const context = useContext(MsalContext);
//   if (!context) {
//     throw new Error('useMsal must be used within a MsalProvider');
//   }
//   return context;
// };

// export { MsalAuthProvider, useMsal };