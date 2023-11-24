// App.tsx
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { MsalAuthProvider, useMsal } from './msalProvider'; // Import MsalAuthProvider and useMsal from the local provider
import LeaveRequestApp from './LeaveRequestApp';

const App: React.FC = () => {
  const { inProgress } = useMsal(); // Use useMsal from the local provider

  useEffect(() => {
    // You can perform any additional setup here
  }, []);

  return (
    <MsalAuthProvider>
      <View>
        {inProgress ? (
          <Text>Authentication in progress...</Text>
        ) : (
          <LeaveRequestApp />
        )}
      </View>
    </MsalAuthProvider>
  );
};

export default App;