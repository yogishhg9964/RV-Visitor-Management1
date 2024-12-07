export type RootStackParamList = {
  VisitorRegistration: undefined;
  HostSelection: {
    visitorData: {
      name: string;
      address: string;
      contactNumber: string;
      vehicleNumber?: string;
      purposeOfVisit: string;
      typeOfVisit: string;
    };
  };
  Home: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
} 