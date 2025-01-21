declare interface IAdvancedSearchWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  LanguageFieldLabel: string;
  DebugFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppLocalEnvironmentOffice: string;
  AppLocalEnvironmentOutlook: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
  AppOfficeEnvironment: string;
  AppOutlookEnvironment: string;
  UnknownEnvironment: string;
  JobTitle: string;
  Department: string;
  ClassificationCode: string;
  Level: string;
  LanguageRequirement: string;
  LanguageComprehension: string;
  Location: string;
  Duration: string
  Clear: string;
  Search: string;
  AdvancedSearch: string;
  btnExpanderOpen: string;
  btnExpanderClosed: string;
  btnClearAria: string;
  btnSearchAria: string;
  operatorLessThan: string;
  operatorGreaterThan: string;
  operatorExactly: string;
  durationAmount: string;
  durationUnit: string;
  English: string;
  French: string;
  Reading: string;
  Written: string;
  Oral: string;
}

declare module 'AdvancedSearchWebPartStrings' {
  const strings: IAdvancedSearchWebPartStrings;
  export = strings;
}
