declare interface IAdvancedSearchWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  LanguageFieldLabel: string;
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
  Location: string;
  Duration: string
  Clear: string;
  Search: string;
}

declare module 'AdvancedSearchWebPartStrings' {
  const strings: IAdvancedSearchWebPartStrings;
  export = strings;
}
